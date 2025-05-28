import { Text, View, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useGithubAuth } from "@/auth/githubLogin";
import { useEffect } from "react";
import { useRouter } from 'expo-router';

type LoginPageProps = {
  onLogin: (accessToken: string) => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { promptAsync, response } = useGithubAuth();
  const router = useRouter();

  useEffect(() => {
    if (response?.type === 'success') {
      const code = response.params.code;
      onLogin(code);
      router.push('/(tabs)/control');  // ou '/(tabs)/control' conforme sua config
    } else if (response?.type === 'error') {
      Alert.alert('Erro ao fazer login');
    }
  }, [response]);

  const handleGithubLogin = async () => {
    const result = await promptAsync();
    if (result.type === 'dismiss') {
      Alert.alert('Login cancelado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Button
        title="Entrar com GitHub"
        color="#333"
        onPress={handleGithubLogin}
      />

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#25292e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#ffffff',
  },
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#007bff',
    fontSize: 16,
  },
});