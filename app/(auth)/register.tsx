import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!name || !email || !password) return;
    await register(name, email, password);
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.top}>
        <View style={styles.logoBox}><Text style={styles.logoIcon}>💳</Text></View>
        <Text style={styles.appName}>Finova</Text>
      </View>

      <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Hesap Oluştur</Text>

        {[
          { label: 'Ad Soyad', value: name,     set: setName,     placeholder: 'Ahmet Yılmaz',      type: undefined },
          { label: 'E-posta',  value: email,    set: setEmail,    placeholder: 'ornek@finova.app',   type: 'email-address' as const },
          { label: 'Şifre',    value: password, set: setPassword, placeholder: 'En az 6 karakter',   secure: true },
        ].map(f => (
          <View key={f.label} style={styles.field}>
            <Text style={styles.label}>{f.label}</Text>
            <TextInput
              style={styles.input}
              value={f.value}
              onChangeText={f.set}
              placeholder={f.placeholder}
              placeholderTextColor="#94a3b8"
              keyboardType={f.type}
              secureTextEntry={f.secure}
              autoCapitalize={f.type === 'email-address' ? 'none' : 'words'}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleRegister} disabled={loading} activeOpacity={0.85}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>Kayıt Ol</Text>
          }
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.gray}>Hesabın var mı? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:  { flex: 1, backgroundColor: '#6366f1' },
  top:   { alignItems: 'center', paddingTop: 70, paddingBottom: 32 },
  logoBox: { width: 64, height: 64, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoIcon:{ fontSize: 28 },
  appName: { fontSize: 24, fontWeight: '800', color: '#fff' },
  card:  { backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 28, paddingBottom: 48, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: '800', color: '#0f172a', marginBottom: 24 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: { backgroundColor: '#f1f5f9', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#0f172a' },
  btn:   { backgroundColor: '#6366f1', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  btnText:{ color: '#fff', fontSize: 16, fontWeight: '700' },
  row:   { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  gray:  { color: '#64748b', fontSize: 14 },
  link:  { color: '#6366f1', fontSize: 14, fontWeight: '700' },
});
