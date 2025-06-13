import { View, Dimensions, StyleSheet, Platform, ScrollView, Text, ActivityIndicator } from 'react-native';
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

const Charts = () => {
  const screenWidth = Dimensions.get('window').width;
  const [plasticData, setPlasticData] = useState<Data[] | null>(null);
  const [metalData, setMetalData] = useState<Data[] | null>(null);
  const [scrapData, setScrapData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [piecesDataWithTime, setPiecesDataWithTime] = useState<[string, number, number, number][]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://r4ft7y62fg.execute-api.us-east-1.amazonaws.com/');
      console.log(response.data);
      
      const tempMetal: Data[] = [];
      const tempPlastic: Data[] = [];
      const tempScrap: Data[] = [];
      const timeMap = new Map<string, { metal?: number; plastico?: number; lixo?:number }>();

      response.data.forEach((group: Data[]) => {
        group.forEach((d: Data) => {
          const key = d.time_interval; // Ex: "2025-06-10 15:45:00"
          if (!timeMap.has(key)) {
            timeMap.set(key, {});
          }

          const entry = timeMap.get(key)!;
          if (d.peca_tipo === 'metal') {
            entry.metal = d.total_separacoes;
            tempMetal.push(d);
          } else if (d.peca_tipo === 'plastico') {
            entry.plastico = d.total_separacoes;
            tempPlastic.push(d);
          } else if (d.peca_tipo === 'lixo') {
            entry.lixo = d.total_separacoes;
            tempScrap.push(d);
          }
        });
      });

      // Ordena por horário
      const sortedData = Array.from(timeMap.entries())
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([time, { metal = 0, plastico = 0, lixo = 0 }]) => {
          const formattedTime = new Date(time).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          });
          return [formattedTime, metal, plastico, lixo] as [string, number, number, number];
        });

      setMetalData(tempMetal);
      setPlasticData(tempPlastic);
      setScrapData(tempScrap);
      setPiecesDataWithTime(sortedData);

    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setLoading(false);
    }
  };


  // Gráfico 1: Separação de peças metálicas
  const metalSeparationChart = {
    labels: piecesDataWithTime.map(([time]) => time),
    datasets: [
      {
        data: piecesDataWithTime.map(([, metal]) => metal),
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(100, 210, 255, ${opacity})`,
      },
    ],
  };

  // Gráfico 2: Separação de peças plásticas
  const plasticSeparationChart = {
    labels: piecesDataWithTime.map(([time]) => time),
    datasets: [
      {
        data: piecesDataWithTime.map(([, , plastico]) => plastico),
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(76, 217, 100, ${opacity})`,
      },
    ],
  };

  // Gráfico 3: Separação de peças de descarte
  const scrapSeparationChart = {
    labels: piecesDataWithTime.map(([time]) => time),
    datasets: [
      {
        data: piecesDataWithTime.map(([, , , lixo]) => lixo), 
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`, 
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

  const renderChart = (data: any, dotColor: string, title: string, unit = '') => (
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

  if (loading || !piecesDataWithTime) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#61DBFB" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      {renderChart(metalSeparationChart, '#64D2FF', 'Peças Metálicas / Hora', 'un')}
      {renderChart(plasticSeparationChart, '#4CD964', 'Peças Plásticas / Hora', 'un')}
      {renderChart(scrapSeparationChart, '#FF9500', 'Peças para Descarte / Hora', 'un')}
      <View style={styles.tableContainer}>
        <TableChart title={'Quantidade de peças'} headers={["Horário","Metal","Plástico", "Descarte"]} data={piecesDataWithTime}/>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c2f38',
  },
});

export default Charts;