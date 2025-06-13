import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';

const members = [
  {
    image: require('../../assets/images/members/felipe.jpeg'),
    name: 'Felipe Marques',
    role: 'Desenvolvedor CLP e Front-end',
    contribution: 'Programação do sistema de automação do CLP e integração do Next Auth.',
  },
  {
    image: require('../../assets/images/members/gabriel.jpeg'),
    name: 'Gabriel Ribeiro',
    role: 'Desenvolvedor front e back-end',
    contribution: 'Desenvolvimento da interface do usuário e integração com a API.',
  },
  {
    image: require('../../assets/images/members/luciano.jpeg'),
    name: 'Luciano',
    role: 'Arquiteto de Banco de Dados',
    contribution: 'Estrutura do banco de dados e relacionamento entre tabelas.',
  },
  {
    image: require('../../assets/images/members/giovani.jpeg'),
    name: 'Giovani',
    role: 'Metodologia Científica',
    contribution: 'Desenvolvimento do artigo e metodologia científica do projeto.',
  },
  {
    image: require('../../assets/images/members/faria.png'),
    name: 'Gabriel Faria',
    role: 'Arquiteto Cloud e Back-end',
    contribution: 'API em Flask, refatoração para AWS Lambda (get e post). Desenvolvimento da arquitetura AWS.',
  },
  {
    image: require('../../assets/images/members/camargo.png'),
    name: 'Guilherme Camargo',
    role: 'Desenvolvedor Cloud e Banco de Dados',
    contribution: 'API Gateway para integração com Lambda e MySQL no AWS RDS',
  },
  {
    image: require('../../assets/images/members/kaneda.png'),
    name: 'Guilherme Kaneda',
    role: 'Desenvolvedor CLP e Back-end',
    contribution: 'Conexão do CLP com o node red via OPC UA, o qual converte os dados para um POST na API hospedada na AWS Lambda.',
  },
  {
    image: require('../../assets/images/members/tomas.jpeg'),
    name: 'Thomas',
    role: 'Desenvolvedor Mobile',
    contribution: 'Desenvolvimento mobile em Expo.',
  },
  {
    image: require('../../assets/images/members/joao.jpeg'),
    name: 'João',
    role: 'Desenvolvedor Mobile e integração',
    contribution: 'Desenvolvimento mobile em Expo.',
  },
];

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nossa equipe</Text>
      <Text style={styles.subtitle}>Os talentos por trás da inovação tecnológica</Text>
      <View style={styles.grid}>
        {members.map((member, index) => (
          <View key={index} style={styles.card}>
            <Image source={member.image} style={styles.image} />
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.role}>{member.role}</Text>
            <Text style={styles.contribution}>{member.contribution}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  card: {
    width: 110,
    margin: 10,
    backgroundColor: '#2f3136',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 2,
  },
  role: {
    color: '#ccc',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 2,
  },
  contribution: {
    color: '#aaa',
    fontSize: 10,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});