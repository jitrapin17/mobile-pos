import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { PaymentType } from '../types';
import { FigmaIcon } from './FigmaIcon';

type PaymentInfoProps = {
  type: PaymentType;
};

export function PaymentInfo({ type }: PaymentInfoProps) {
  const isOnline = type === 'online';

  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{isOnline ? 'โอนเงิน' : 'เก็บปลายทาง'}</Text>
      {isOnline && (
        <View style={styles.slipChip}>
          <FigmaIcon name="visibility" size={13} />
          <Text style={styles.slipText}>สลิป</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    ...typography.small,
    color: colors.text,
  },
  slipChip: {
    minHeight: 20,
    borderRadius: 7,
    paddingLeft: 6,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.brandLight,
  },
  slipText: {
    ...typography.bodyMedium,
    color: colors.brand,
  },
});
