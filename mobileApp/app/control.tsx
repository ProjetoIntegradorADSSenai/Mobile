import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Control() {
  const [ligaAtivo, setLigaAtivo] = useState(false);
  const [desligaAtivo, setDesligaAtivo] = useState(false);
  const [emergenciaAtivo, setEmergenciaAtivo] = useState(false);
  const [atuador1Ativo, setAtuador1Ativo] = useState(false);
  const [atuador2Ativo, setAtuador2Ativo] = useState(false);


  const toggleButton = (botao: string) => {
    if (botao === "liga") setLigaAtivo(!ligaAtivo);
    if (botao === "desliga") setDesligaAtivo(!desligaAtivo);
    if (botao === "emergencia") setEmergenciaAtivo(!emergenciaAtivo);
    if (botao === "Atuador 1") setAtuador1Ativo(!atuador1Ativo);
    if (botao === "Atuador 2") setAtuador2Ativo(!atuador2Ativo);
  };

  return (
    <View style={styles.container}>

      <View style={styles.linhaBotoes}>
        <TouchableOpacity
          onPress={() => toggleButton("ligaAtuador1")}
          style={[
            styles.botao,
            atuador1Ativo ? styles.ativoAtuador1 : styles.inativo,
          ]}
        >
          <Text style={styles.textoBotao}>Atuador 1</Text>
        </TouchableOpacity>

      </View>
      
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
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  linhaBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
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