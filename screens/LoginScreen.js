import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('blad', 'Wprowadź nazwę Użytkownika i Hasło');
      return;
    }
    navigation.navigate('Home', { username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zaloguj się</Text>
      <TextInput
        style={styles.input}
        placeholder='Nazwa użytkownika'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Hasło'
        value={password}
        onChangeText={setPassword}
      />
      <Button title='Zaloguj' onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({});
