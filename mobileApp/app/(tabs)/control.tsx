import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";

export default function Control() {
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const res = await axios.get("https://r4ft7y62fg.execute-api.us-east-1.amazonaws.com/dispositivos");
        const data = res.data;

        const dispositivos = data.map(([id, nome, estado]) => ({
          title: formatarNome(nome),
          value: estado === 1 ? "Ativo" : "Desativado",
          rawName: nome.toLowerCase(),
        }));

        const entradas = dispositivos.filter((d) =>
          d.rawName.startsWith("sensor")
        );

        const saidas = dispositivos.filter((d) =>
          d.rawName.startsWith("atuador") || d.rawName === "motor"
        );

        setEntradas(entradas);
        setSaidas(saidas);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dispositivos:", err);
        setLoading(false);
      }
    };

    // Executa ao carregar
    fetchDispositivos();

    // Atualiza a cada 3 segundos
    const interval = setInterval(fetchDispositivos, 3000);

    // Limpa quando desmontar
    return () => clearInterval(interval);
  }, []);

  const formatarNome = (nome: string) => {
    return nome
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const renderCards = (data: { title: string; value: string }[]) => (
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

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
    height: 100,
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