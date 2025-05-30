import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type TableChartProps = {
  title: string;
  headers: string[];
  data: (string | number)[][];
  subtitle?: string;
};

const TableChart: React.FC<TableChartProps> = ({ title, headers, data, subtitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal>
        <View>
          <View style={styles.row}>
            {headers.map((header, index) => (
              <Text key={index} style={[styles.cell, styles.headerCell]}>
                {header}
              </Text>
            ))}
          </View>
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.cell}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1D21',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    color: '#FFFFFF',
    padding: 8,
    minWidth: 100,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#2D3238',
    fontSize: 10,
    justifyContent: 'center'
  },
  headerCell: {
    fontWeight: '700',
    backgroundColor: '#2D3238',
  },
  subtitle: {
    color: '#AAAAAA',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
});

export default TableChart;