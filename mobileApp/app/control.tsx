import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Control() {
  const [ligaAtivo, setLigaAtivo] = useState(false);
  const [desligaAtivo, setDesligaAtivo] = useState(false);
  const [emergenciaAtivo, setEmergenciaAtivo] = useState(false);
  const [atuador1Ativo, setAtuador1Ativo] = useState(false);
  const [atuador2Ativo, setAtuador2Ativo] = useState(false);
  const [esteiraAtiva, setEsteiraAtiva] = useState(false);

  const toggleButton = (botao: string) => {
    if (botao === "liga") setLigaAtivo(!ligaAtivo);
    if (botao === "desliga") setDesligaAtivo(!desligaAtivo);
    if (botao === "emergencia") setEmergenciaAtivo(!emergenciaAtivo);
    if (botao === "atuador 1") setAtuador1Ativo(!atuador1Ativo);
    if (botao === "atuador 2") setAtuador2Ativo(!atuador2Ativo);
    if (botao === "esteira") setEsteiraAtiva(!esteiraAtiva);
  };

  const cardData = [
    { title: "Sensor 1", value: "Ativo" },
    { title: "Sensor 2", value: "Ativo" },
    { title: "Sensor 3", value: "Desativo" },
    { title: "Sensor 4", value: "Ativo" },
    { title: "Sensor 5", value: "Ativo" },
    { title: "Sensor 6", value: "Ativo" },
    { title: "Sensor 7", value: "Desativo" },
  ];

  return (
    <View style={styles.container}>
      {Array.from({ length: Math.ceil(cardData.length / 2) }, (_, rowIndex) => {
        const items = cardData.slice(rowIndex * 2, rowIndex * 2 + 2);
        return (
          <View style={styles.cardsContainer} key={rowIndex}>
            {items.map((item, index) => (
              <View style={styles.card} key={index}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        );
      })}

      <View style={styles.linhaBotaoAtuador}>
        <TouchableOpacity
          onPress={() => toggleButton("atuador 1")}
          style={[
            styles.botao,
            atuador1Ativo ? styles.ativoAtuador1 : styles.inativoAtuador1,
          ]}
        >
          <Text style={styles.textoBotao}>Atuador 1</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linhaBotaoAtuador}>
        <TouchableOpacity
          onPress={() => toggleButton("atuador 2")}
          style={[
            styles.botao,
            atuador2Ativo ? styles.ativoAtuador2 : styles.inativoAtuador2,
          ]}
        >
          <Text style={styles.textoBotao}>Atuador 2</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linhaBotaoAtuador}>
        <TouchableOpacity
          onPress={() => toggleButton("esteira")}
          style={[
            styles.botao,
            esteiraAtiva ? styles.ativaEsteira : styles.inativaEsteira,
          ]}
        >
          <Text style={styles.textoBotao}>Esteira</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linhaBotoes}>
        <TouchableOpacity
          onPress={() => toggleButton("liga")}
          style={[styles.botao, ligaAtivo ? styles.ativoLiga : styles.inativo]}
        >
          <Text style={styles.textoBotao}>Liga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleButton("desliga")}
          style={[
            styles.botao,
            desligaAtivo ? styles.ativoDesliga : styles.inativo,
          ]}
        >
          <Text style={styles.textoBotao}>Desliga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleButton("emergencia")}
          style={[
            styles.botao,
            emergenciaAtivo ? styles.ativoEmergencia : styles.inativo,
          ]}
        >
          <Text style={styles.textoBotao}>Emergência</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  linhaBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linhaBotaoAtuador: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  botao: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  ativoLiga: {
    backgroundColor: "green",
  },
  ativoAtuador1: {
    backgroundColor: "green",
  },
  ativoAtuador2: {
    backgroundColor: "green",
  },
  ativaEsteira: {
    backgroundColor: "green",
  },
  ativoDesliga: {
    backgroundColor: "red",
  },
  ativoEmergencia: {
    backgroundColor: "red",
  },
  inativo: {
    backgroundColor: "gray",
  },
  inativoAtuador1: {
    backgroundColor: "red",
  },
  inativoAtuador2: {
    backgroundColor: "red",
  },
  inativaEsteira: {
    backgroundColor: "red",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#3a3f47",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    width: 150,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
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