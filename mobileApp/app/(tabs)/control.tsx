import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function Control() {
  // Separando os cards em dois grupos
  const entradas = [
    { title: "Sensor Capacitivo", value: "Ativo" },
    { title: "Sensor Indutivo", value: "Ativo" },
    { title: "Confirma Peça", value: "Desativado" },
    { title: "Peça Grande", value: "Ativo" },
    { title: "Rampa 1", value: "Ativo" },
    { title: "Rampa 2", value: "Ativo" },
    { title: "Descarte", value: "Desativado" },
  ];

  const saidas = [
    { title: "Atuador 1", value: "Ativo" },
    { title: "Atuador 2", value: "Ativo" },
    { title: "Esteira", value: "Desativado" },
  ];

  const renderCards = (data: typeof entradas | typeof saidas) => (
    <>
      {Array.from({ length: Math.ceil(data.length / 2) }, (_, rowIndex) => {
        const items = data.slice(rowIndex * 2, rowIndex * 2 + 2);
        return (
          <View style={styles.cardsContainer} key={rowIndex}>
            {items.map((item, index) => (
              <View
                style={[
                  styles.card,
                  item.value === "Ativo" ? styles.cardAtivo : styles.cardDesativado,
                ]}
                key={index}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </>
  );

  return (
    <ScrollView style={styles.container}>

      <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>Entradas</Text>
      {renderCards(entradas)}
      </View>


      <View style={styles.groupContainer}>
      <Text style={styles.groupTitle}>Saídas</Text>
      {renderCards(saidas)}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  groupContainer: {
    backgroundColor: "#2c3136",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginLeft: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#3a3f47",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    width: 150,
    height: 80,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardAtivo: {
    backgroundColor: "#008000",
  },
  cardDesativado: {
    backgroundColor: "#800000",
  },
  cardTitle: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});