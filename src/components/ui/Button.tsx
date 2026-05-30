import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

type Variant = 'primary' | 'secondary' | 'danger' | 'income' | 'expense';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const BG: Record<Variant, string> = {
  primary:   '#6366f1',
  secondary: '#f1f5f9',
  danger:    '#ef4444',
  income:    '#10b981',
  expense:   '#ef4444',
};

const TEXT_COLOR: Record<Variant, string> = {
  primary:   '#fff',
  secondary: '#475569',
  danger:    '#fff',
  income:    '#fff',
  expense:   '#fff',
};

const PADDING: Record<Size, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { paddingVertical: 8,  paddingHorizontal: 16, fontSize: 13 },
  md: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 14 },
  lg: { paddingVertical: 16, paddingHorizontal: 24, fontSize: 16 },
};

export function Button({ onPress, variant = 'primary', size = 'md', full, loading, disabled, children }: Props) {
  const p = PADDING[size];
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        { backgroundColor: BG[variant], paddingVertical: p.paddingVertical, paddingHorizontal: p.paddingHorizontal },
        full && styles.full,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {loading
        ? <ActivityIndicator color={TEXT_COLOR[variant]} size="small" />
        : <Text style={[styles.text, { color: TEXT_COLOR[variant], fontSize: p.fontSize }]}>{children as string}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base:     { borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  full:     { width: '100%' },
  disabled: { opacity: 0.5 },
  text:     { fontWeight: '600' },
});
