import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

// Figma: Button component — variants from [ReDesign]POS-BlueStat
// - primary:  solid brand fill (#005EEC) + white label
// - outline:  1.5px border brand, white bg + brand label
// - gradient: orange gradient (#FFA622→#FF7B00) + white label

export type ButtonVariant = 'primary' | 'outline' | 'gradient';

type ButtonProps = {
  variant?: ButtonVariant;
  label: string;
  onPress?: () => void;
  flex?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({
  variant = 'primary',
  label,
  onPress,
  flex,
  disabled,
  style,
}: ButtonProps) {
  const containerStyle = [styles.base, flex && styles.flex, style];

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={['#FFA622', '#FF7B00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={containerStyle}
      >
        <Pressable
          style={styles.pressable}
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={[styles.label, styles.labelLight]}>{label}</Text>
        </Pressable>
      </LinearGradient>
    );
  }

  return (
    <Pressable
      style={[containerStyle, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, variant === 'primary' ? styles.labelLight : styles.labelBrand]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  pressable: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.brand,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.brand,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    ...typography.title,
  },
  labelLight: {
    color: colors.white,
  },
  labelBrand: {
    color: colors.brand,
  },
});
