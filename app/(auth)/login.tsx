import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email || !password) { setError('Tüm alanları doldurun'); return; }
    setError('');
    try { await login(email, password); }
    catch { setError('Giriş başarısız'); }
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Top gradient area */}
      <View style={styles.top}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>💳</Text>
        </View>
        <Text style={styles.appName}>Finova</Text>
        <Text style={styles.tagline}>Akıllı Para Takibi</Text>
      </View>

      {/* Bottom card */}
      <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Giriş Yap</Text>

        {error ? <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View> : null}

        <View style={styles.field}>
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@finova.app"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Şifreniz"
            placeholderTextColor="#94a3b8"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>Giriş Yap</Text>
          }
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerGray}>Hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#6366f1' },
  top:         { alignItems: 'center', paddingTop: 80, paddingBottom: 40 },
  logoBox:     { width: 72, height: 72, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoIcon:    { fontSize: 32 },
  appName:     { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  tagline:     { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  card:        { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 28, paddingBottom: 48, flexGrow: 1 },
  title:       { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 24 },
  errorBox:    { backgroundColor: '#fee2e2', borderRadius: 12, padding: 12, marginBottom: 16 },
  errorText:   { color: '#dc2626', fontSize: 13 },
  field:       { marginBottom: 16 },
  label:       { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input:       { backgroundColor: '#f1f5f9', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#0f172a' },
  btn:         { backgroundColor: '#6366f1', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  btnText:     { color: '#fff', fontSize: 16, fontWeight: '700' },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  registerGray:{ color: '#64748b', fontSize: 14 },
  registerLink:{ color: '#6366f1', fontSize: 14, fontWeight: '700' },
});
