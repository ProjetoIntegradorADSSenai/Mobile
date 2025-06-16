import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";

export default function Control() {
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [atuador1On, setAtuador1On] = useState(false);
  const [atuador2On, setAtuador2On] = useState(false);
  const [esteiraOn, setEsteiraOn] = useState(false);

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

        const atuador1 = saidas.find(s => s.rawName === "atuador_1");
        const atuador2 = saidas.find(s => s.rawName === "atuador_2");
        const esteira = saidas.find(s => s.rawName === "esteira");

        if (atuador1) setAtuador1On(atuador1.value === "Ativo");
        if (atuador2) setAtuador2On(atuador2.value === "Ativo");
        if (esteira) setEsteiraOn(esteira.value === "Ativo");

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

  const handleToggle = async (
    nome: "Atuador_plastico" | "Atuador_metalico" | "Motor",
    atual: boolean,
    setFunc: (v: boolean) => void
  ) => {
    try {
      const novoEstado = !atual;
      await axios.post("https://r4ft7y62fg.execute-api.us-east-1.amazonaws.com/dispositivos", {
        dispositivos: {
          [nome]: novoEstado
        }
      });
      setFunc(novoEstado);
    } catch (err) {
      console.error(`Erro ao alternar ${nome}:`, err);
    }
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

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.toggleButton, atuador1On ? styles.on : styles.off]}
          onPress={() => handleToggle("Atuador_plastico", atuador1On, setAtuador1On)}
        >
          <Text style={styles.buttonText}>Atuador 1: {atuador1On ? "Ligado" : "Desligado"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, atuador2On ? styles.on : styles.off]}
          onPress={() => handleToggle("Atuador_metalico", atuador2On, setAtuador2On)}
        >
          <Text style={styles.buttonText}>Atuador 2: {atuador2On ? "Ligado" : "Desligado"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, esteiraOn ? styles.on : styles.off]}
          onPress={() => handleToggle("Motor", esteiraOn, setEsteiraOn)}
        >
          <Text style={styles.buttonText}>Esteira: {esteiraOn ? "Ligada" : "Desligada"}</Text>
        </TouchableOpacity>
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
  buttonGroup: {
    marginBottom: 40,
    paddingHorizontal: 10,
    gap: 12,
  },
  toggleButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  on: {
    backgroundColor: "#228B22",
  },
  off: {
    backgroundColor: "#8B0000",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});