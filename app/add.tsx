import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useData } from '../src/contexts/DataContext';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, CATEGORY_META, formatCurrency } from '../src/lib/utils';
import type { TransactionType, Category } from '../src/lib/types';

export default function AddTransaction() {
  const { addTransaction, accounts } = useData();
  const router = useRouter();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? '');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const cats = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const headerBg = type === 'income' ? '#10b981' : '#ef4444';

  function handleSave() {
    if (!amount || !category || !accountId) {
      Alert.alert('Hata', 'Tutar, kategori ve hesap zorunludur.');
      return;
    }
    addTransaction({
      type, amount: parseFloat(amount),
      category: category as Category,
      accountId,
      title: title || (category as string),
      note, date,
    });
    Alert.alert('Başarılı', type === 'income' ? 'Gelir eklendi! 🎉' : 'Gider eklendi', [
      { text: 'Tamam', onPress: () => router.back() },
    ]);
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: headerBg }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerBg }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerBtn}>İptal</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yeni İşlem</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerBtn}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      {/* Type Toggle */}
      <View style={[styles.typeWrap, { backgroundColor: headerBg }]}>
        <View style={styles.typeBg}>
          {(['expense', 'income'] as TransactionType[]).map(t => (
            <TouchableOpacity key={t} onPress={() => { setType(t); setCategory(''); }} activeOpacity={0.8}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}>
              <Text style={[styles.typeBtnText, type === t && styles.typeBtnTextActive]}>
                {t === 'income' ? '💰 Gelir' : '💸 Gider'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount */}
        <View style={styles.amountWrap}>
          <Text style={styles.amountCurrency}>₺</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.35)"
            keyboardType="numeric"
          />
        </View>
        {amount ? <Text style={styles.amountFormatted}>{formatCurrency(parseFloat(amount) || 0)}</Text> : null}
      </View>

      <ScrollView style={styles.form} contentContainerStyle={styles.formContent} keyboardShouldPersistTaps="handled">
        {/* Category */}
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.catGrid}>
          {(cats as Category[]).map(cat => {
            const meta = CATEGORY_META[cat];
            const active = category === cat;
            return (
              <TouchableOpacity key={cat} onPress={() => setCategory(cat)} activeOpacity={0.8}
                style={[styles.catBtn, active && styles.catBtnActive]}>
                <Text style={styles.catIcon}>{meta.icon}</Text>
                <Text style={[styles.catLabel, active && styles.catLabelActive]} numberOfLines={2}>{cat}</Text>
                {active && <Check size={10} color="#6366f1" />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Title */}
        <Text style={styles.label}>Başlık (opsiyonel)</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder={category || 'İşlem başlığı'}
          placeholderTextColor="#94a3b8"
        />

        {/* Account */}
        <Text style={styles.label}>Hesap</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accountScroll}>
          {accounts.map(a => (
            <TouchableOpacity key={a.id} onPress={() => setAccountId(a.id)} activeOpacity={0.8}
              style={[styles.accountBtn, accountId === a.id && styles.accountBtnActive]}>
              <Text style={[styles.accountBtnText, accountId === a.id && styles.accountBtnTextActive]}>{a.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Date */}
        <Text style={styles.label}>Tarih</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-AA-GG"
          placeholderTextColor="#94a3b8"
        />

        {/* Note */}
        <Text style={styles.label}>Not (opsiyonel)</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={note}
          onChangeText={setNote}
          placeholder="Açıklama ekle..."
          placeholderTextColor="#94a3b8"
          multiline
          numberOfLines={3}
        />

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: headerBg }]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>
            {type === 'income' ? '💰 Gelir Ekle' : '💸 Gider Ekle'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:            { flex: 1 },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  headerBtn:       { color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: '600' },
  headerTitle:     { color: '#fff', fontSize: 16, fontWeight: '700' },
  typeWrap:        { paddingHorizontal: 20, paddingBottom: 28 },
  typeBg:          { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.12)', borderRadius: 16, padding: 4, marginBottom: 20 },
  typeBtn:         { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 12 },
  typeBtnActive:   { backgroundColor: '#fff' },
  typeBtnText:     { color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: '600' },
  typeBtnTextActive:{ color: '#1e293b' },
  amountWrap:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  amountCurrency:  { color: '#fff', fontSize: 28, fontWeight: '700' },
  amountInput:     { color: '#fff', fontSize: 52, fontWeight: '800', minWidth: 80, textAlign: 'center' },
  amountFormatted: { color: 'rgba(255,255,255,0.65)', fontSize: 14, textAlign: 'center', marginTop: 4 },
  form:            { flex: 1, backgroundColor: '#f8fafc' },
  formContent:     { padding: 20, gap: 12, paddingBottom: 40 },
  label:           { fontSize: 13, fontWeight: '600', color: '#475569', marginTop: 4 },
  catGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn:          { width: '23%', alignItems: 'center', padding: 10, borderRadius: 16, borderWidth: 2, borderColor: '#e2e8f0', backgroundColor: '#fff', gap: 4 },
  catBtnActive:    { borderColor: '#6366f1', backgroundColor: '#eef2ff' },
  catIcon:         { fontSize: 22 },
  catLabel:        { fontSize: 9, color: '#64748b', textAlign: 'center', lineHeight: 12 },
  catLabelActive:  { color: '#4338ca', fontWeight: '600' },
  input:           { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e2e8f0', paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#0f172a' },
  textarea:        { minHeight: 72, textAlignVertical: 'top' },
  accountScroll:   { marginBottom: 4 },
  accountBtn:      { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 2, borderColor: '#e2e8f0', backgroundColor: '#fff', marginRight: 8 },
  accountBtnActive:{ borderColor: '#6366f1', backgroundColor: '#eef2ff' },
  accountBtnText:  { fontSize: 13, fontWeight: '600', color: '#64748b' },
  accountBtnTextActive:{ color: '#4338ca' },
  saveBtn:         { borderRadius: 18, paddingVertical: 18, alignItems: 'center', marginTop: 8 },
  saveBtnText:     { color: '#fff', fontSize: 16, fontWeight: '700' },
});
