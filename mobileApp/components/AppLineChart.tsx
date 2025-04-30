import { Text, View, StyleSheet } from 'react-native';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const AppLineChart = () => {
  const data = [
    { name: 'Page A', uv: 400 },
    { name: 'Page B', uv: 300 },
    { name: 'Page B', uv: 500 },
    { name: 'Page B', uv: 370 },
    { name: 'Page B', uv: 309 },
    { name: 'Page B', uv: 1000 },
    { name: 'Page B', uv: 900 },
    // Add more data points as needed
  ];

  return (
    <LineChart width={300} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};

export default AppLineChart;