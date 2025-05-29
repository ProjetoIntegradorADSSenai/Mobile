import { Text, View, StyleSheet, TouchableOpacity, Alert, Linking } from "react-native";
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
      router.push('/(tabs)/control'); 
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

  const handleSignUp = () => {
    Linking.openURL('https://github.com/signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.subtitle}>Acesse com sua conta do GitHub</Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleGithubLogin}>
        <Text style={styles.loginButtonText}>Entrar com GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpButton: {
    marginTop: 10,
  },
  signUpText: {
    color: '#007bff',
    fontSize: 14,
  },
});