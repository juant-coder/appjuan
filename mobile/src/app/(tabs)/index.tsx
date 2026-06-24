import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

export default function HomeScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase
      .from('_supabase_migrations')
      .select('version')
      .limit(1)
      .then(({ error }) => {
        setConnected(!error || error.code === '42P01');
      });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>AXIS</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.statusCard}>
          <Text style={styles.statusIcon}>{connected === null ? '⏳' : connected ? '✅' : '❌'}</Text>
          <Text style={styles.statusTitle}>Supabase</Text>
          <Text style={styles.statusText}>
            {connected === null
              ? 'Verificando conexão...'
              : connected
                ? 'Conectado com sucesso'
                : 'Erro de conexão'}
          </Text>
          {session?.user?.email ? (
            <Text style={styles.email}>{session.user.email}</Text>
          ) : null}
        </View>

        <View style={styles.nextCard}>
          <Text style={styles.nextTitle}>Próximos passos</Text>
          <Text style={styles.nextItem}>Passo 2 — Migrations SQL (tabelas do banco)</Text>
          <Text style={styles.nextItem}>Passo 3 — CRUD de blocos de agenda</Text>
          <Text style={styles.nextItem}>Passo 4 — Lista de blocos do dia aqui</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  appName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 4,
  },
  logout: {
    color: '#555',
    fontSize: 14,
  },
  body: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  statusCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  statusIcon: {
    fontSize: 40,
  },
  statusTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statusText: {
    color: '#888',
    fontSize: 14,
  },
  email: {
    color: '#007AFF',
    fontSize: 13,
    marginTop: 4,
  },
  nextCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  nextTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  nextItem: {
    color: '#555',
    fontSize: 13,
    lineHeight: 20,
  },
});
