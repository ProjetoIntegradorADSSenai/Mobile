import React from 'react';
import { View, Dimensions, StyleSheet, Platform, ScrollView, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const RecyclingCharts = () => {
  const screenWidth = Dimensions.get('window').width;

  // Gráfico 1: Eficiência na Separação de Materiais (Antes e Depois da Automação)
  const separationEfficiencyData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [62, 65, 63, 67, 68, 92], // Salto após implementação em Junho
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
        data: [18, 15, 12, 5], // Redução progressiva
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(76, 217, 100, ${opacity})`, // Verde
      },
    ],
  };

  // Gráfico 3: Custo Operacional por Tonelada Processada
  const operationalCostData = {
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        data: [420, 390, 375, 310], // Redução após automação
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
        bezier={true}
        withHorizontalLabels={true}
        withVerticalLabels={true}
        withShadow={false}
        withDots={true}
        transparent={true}
        style={styles.chartStyle}
      />
      <Text style={styles.chartSubtitle}>
        {title.includes('Eficiência') ? 'Implementação do sistema em Junho' : 
         title.includes('Contaminação') ? 'Redução após automação' : 
         'Economia progressiva pós-automação'}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      {renderChart(separationEfficiencyData, '#64D2FF', 'Eficiência na Separação (%)', '%')}
      {renderChart(contaminationData, '#4CD964', 'Contaminação Metálica (kg/ton)', 'kg')}
      {renderChart(operationalCostData, '#FF9500', 'Custo Operacional (R$/ton)', 'R$')}
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
});

export default RecyclingCharts;