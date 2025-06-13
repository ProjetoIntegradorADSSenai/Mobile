import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

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

      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: response.data.response,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.log(err);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: 'Erro ao se comunicar com o chatbot.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMsg : styles.botMsg]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

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
});
