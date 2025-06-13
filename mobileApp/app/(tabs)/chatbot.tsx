import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import axios from 'axios';
import TableChart from '@/components/TableChart';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  data?: Partition[] | SimplePiece[];
  dataType?: 'partition' | 'simple';
}

interface Partition {
  peca_tipo: string;
  time: string;
  total_separacoes: string;
}

interface SimplePiece {
  id: string;
  tipo: string;
}

function extractPartitions(text: string): Partition[] {
  const lines = text.split('\n');
  const data: Partition[] = [];

  for (const linha of lines) {
    const parts = linha.split('|').map(p => p.trim());
    if (parts.length > 3 && parts[0] != 'peca_tipo') {
        data.push({
            peca_tipo: parts[0],
            time: parts[3],
            total_separacoes: parts[4],
        });
    }
  }

  return data;
}

const PartitionTable = ({ data }: { data: Partition[] }) => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Peça</Text>
        <Text style={styles.headerCell}>Hora</Text>
        <Text style={styles.headerCell}>Qtd</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>{item.peca_tipo}</Text>
          <Text style={styles.cell}>{item.time}</Text>
          <Text style={styles.cell}>{item.total_separacoes}</Text>
        </View>
      ))}
    </View>
  );
};

function extractSimplePieces(text: string): SimplePiece[] {
  const lines = text.split('\n');
  const data: SimplePiece[] = [];

  for (const line of lines) {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length === 2 && /^\d+$/.test(parts[0])) {
      data.push({
        id: parts[0],
        tipo: parts[1],
      });
    }
  }

  return data;
}

const SimplePieceTable = ({ data }: { data: SimplePiece[] }) => {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Tipo</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.cell}>{item.id}</Text>
          <Text style={styles.cell}>{item.tipo}</Text>
        </View>
      ))}
    </View>
  );
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [table, setTable] = useState<Partition[] | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://r4ft7y62fg.execute-api.us-east-1.amazonaws.com/chatbot', {
          prompt: input,
      });
  
      const text = response.data.response;
      const partitionData = extractPartitions(text);
      const simplePieces = extractSimplePieces(text);

      if (partitionData.length > 0) {
        const tableMessage: Message = {
            id: Date.now().toString() + '-partition',
            text: '[table]',
            sender: 'bot',
            data: partitionData,
            dataType: 'partition',
        };
        setMessages((prev) => [...prev, tableMessage]);
      } else if (simplePieces.length > 0) {
        const tableMessage: Message = {
            id: Date.now().toString() + '-simple',
            text: '[table]',
            sender: 'bot',
            data: simplePieces,
            dataType: 'simple',
        };
        setMessages((prev) => [...prev, tableMessage]);
      } else {
        const botMessage: Message = {
            id: Date.now().toString() + '-bot',
            text: text,
            sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }
    } catch (err) {
        console.log(err);
        const errorMessage: Message = {
          id: Date.now().toString() + '-error',
          text: 'Erro ao se comunicar com o chatbot.',
          sender: 'bot',
        };
      setMessages((prev) => [...prev, errorMessage]);
      setTable(null);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.text === '[table]' && item.dataType === 'partition' && Array.isArray(item.data)) {
        return (
        <View style={[styles.messageContainer, styles.botMsg]}>
            <PartitionTable data={item.data as Partition[]} />
        </View>
        );
    }

    if (item.text === '[table]' && item.dataType === 'simple' && Array.isArray(item.data)) {
        return (
        <View style={[styles.messageContainer, styles.botMsg]}>
            <SimplePieceTable data={item.data as SimplePiece[]} />
        </View>
        );
    }

    return (
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMsg : styles.botMsg]}>
        <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: 'white' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D21',
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    alignContent: 'center',
    alignItems: 'center'
  },
  userMsg: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botMsg: {
    backgroundColor: '#E2E2E2',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#DDD',
    borderTopWidth: 1,
    backgroundColor: '#2c2f38',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  tableContainer: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    minWidth: 250,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    alignItems: 'center',
    textAlign: 'center'
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
  },
});
