import { View, Dimensions, StyleSheet, Platform, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import TableChart from './TableChart';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
  peca_tipo: string;
  time_interval: string;
  date: string,
  time: string,
  total_separacoes: number
}

interface ChartData {
  labels: string[],
  datasets: [
    {
      data: number[],
      strokeWidth: 3,
      color: `rgba(100, 210, 255, 1)`,
    },
  ],
}

const Charts = () => {
  const screenWidth = Dimensions.get('window').width;
  const [plasticData, setPlasticData] = useState<Data[] | null>(null);
  const [metalData, setMetalData] = useState<Data[] | null>(null);
  const [scrapData, setScrapData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get('https://r4ft7y62fg.execute-api.us-east-1.amazonaws.com/');
      var tempMetal = [];
      var tempPlastic = [];
      var tempScrap = [];
      response.data.map((x:Data[]) => {
        x.map((d:Data) => {
          if(d.peca_tipo == 'metal') {
            tempMetal.push(d);
          } else if(d.peca_tipo == 'plastico') {
            tempPlastic.push(d);
          } else if(d.peca_tipo == 'lixo') {
            tempScrap.push(d);
          }
        });
      });
      setPlasticData(tempPlastic);
      setMetalData(tempMetal);
      setScrapData(tempScrap);

    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gráfico 1: Eficiência na Separação de Materiais (Antes e Depois da Automação)
  const separationEfficiencyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [0, 15, 40, 65, 70, 90], // Salto após implementação em Junho
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(100, 210, 255, ${opacity})`,
      },
    ],
  };

  // Gráfico 2: Contaminação de Materiais (Metálicos em Plásticos)
  const contaminationData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        data: [30, 12, 8, 2.5], // Redução progressiva
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(76, 217, 100, ${opacity})`, // Verde
      },
    ],
  };

  // Gráfico 3: Custo Operacional por Tonelada Processada
  const operationalCostData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        data: [420, 390, 275, 180, 125], // Redução após automação
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`, // Laranja
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#1A1D21',
    backgroundGradientTo: '#1A1D21',
    fillShadowGradient: '#1A1D21',
    fillShadowGradientOpacity: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    segments: 4,
    propsForLabels: {
      fontSize: 10,
      fontWeight: '500',
      dx: Platform.select({ ios: -8, android: -10 }),
      dy: Platform.select({ ios: 0, android: 3 }),
    },
  };

  const renderChart = (data, dotColor, title, unit = '') => (
    <View style={styles.container}>
      <View style={styles.chartTitleContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
      </View>
      <LineChart
        data={data}
        width={screenWidth * 0.85}
        height={220}
        chartConfig={{
          ...chartConfig,
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: dotColor,
            fill: '#1A1D21',
          },
          propsForBackgroundLines: {
            stroke: '#2D3238',
            strokeDasharray: Platform.select({ ios: '0', android: '4' }),
            strokeWidth: 1,
          },
          formatYLabel: (value) => `${value}${unit}`,
        }}
        withInnerLines={true}
        withOuterLines={false}
        fromZero={true}
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withShadow={false}
        withDots={true}
        transparent={true}
        style={styles.chartStyle}
      />
      <Text style={styles.chartSubtitle}>
        {title.includes('Eficiência') ? 'Implementação do sistema em Janeiro' : 
         title.includes('Contaminação') ? 'Redução após automação' : 
         'Economia progressiva pós-automação'}
      </Text>
    </View>
  );

  const piecesDataWithTime = [
  ['2025-05-30 08:00', 10, 12],
  ['2025-05-30 09:00', 11, 13],
  ['2025-05-30 10:00', 12, 11],
  ['2025-05-30 11:00', 13, 15],
  ['2025-05-30 12:00', 14, 10],
  ['2025-05-30 13:00', 15, 14],
  ['2025-05-30 14:00', 10, 13],
  ['2025-05-30 15:00', 12, 15],
  ['2025-05-30 16:00', 13, 12],
  ['2025-05-30 17:00', 14, 11],
];


  return (
    <ScrollView style={styles.scrollContainer}>
      {renderChart(separationEfficiencyData, '#64D2FF', 'Eficiência na Separação (%)', '%')}
      {renderChart(contaminationData, '#4CD964', 'Contaminação Metálica (kg/ton)', 'kg')}
      {renderChart(operationalCostData, '#FF9500', 'Custo Operacional (R$/ton)', 'R$')}
      <View style={styles.tableContainer}>
        <TableChart title={'Quantidade de peças'} headers={["Horário","Metal","Plástico"]} data={piecesDataWithTime}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
  },
  container: {
    backgroundColor: '#1A1D21',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  chartTitleContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  chartTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  chartSubtitle: {
    color: '#AAAAAA',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
  },
  chartStyle: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  tableContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Charts;