import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StreaksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Streaks e Pontos</Text>
      <Text style={styles.subtitle}>Em breve — Passo 7</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
  },
});
