import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Control() {
  const [ligaAtivo, setLigaAtivo] = useState(false);
  const [desligaAtivo, setDesligaAtivo] = useState(false);
  const [emergenciaAtivo, setEmergenciaAtivo] = useState(false);

  const toggleButton = (botao) => {
    if (botao === "liga") setLigaAtivo(!ligaAtivo);
    if (botao === "desliga") setDesligaAtivo(!desligaAtivo);
    if (botao === "emergencia") setEmergenciaAtivo(!emergenciaAtivo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.linhaBotoes}>
        <TouchableOpacity
          onPress={() => toggleButton("liga")}
          style={[
            styles.botao,
            ligaAtivo ? styles.ativoLiga : styles.inativo,
          ]}
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
    alignItems: "center",
    padding: 10
  },
  linhaBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 80,
  },
  botao: {
    padding: 10,
    width: 100,
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
  ativoDesliga: {
    backgroundColor: "red",
  },
  ativoEmergencia: {
    backgroundColor: "red",
  },
  inativo: {
    backgroundColor: "gray",
  },
});