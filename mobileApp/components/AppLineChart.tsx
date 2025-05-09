import { Text, View, StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const AppLineChart = () => {
  const { width } = useWindowDimensions();
  const chartWidth = width * 0.80;

  const data = [
    { name: '20:20', uv: 400 },
    { name: '20:21', uv: 300 },
    { name: '20:22', uv: 500 },
    { name: '20:23', uv: 370 },
    { name: '20:24', uv: 309 },
    { name: '20:25', uv: 1000 },
    { name: '20:26', uv: 900 },
    // Add more data points as needed
  ];

  return (
    <LineChart width={chartWidth} height={150} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid strokeDasharray="3 3" vertical={false} /> fariaaaaaaaaaaaaa
      <XAxis dataKey="name" fontFamily='verdana' fontSize={10} />
      <YAxis fontFamily='verdana' fontSize={12} />
      <Tooltip />
    </LineChart>
  );
};

export default AppLineChart;