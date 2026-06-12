import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { PaymentType } from '../types';
import { FigmaIcon } from './FigmaIcon';

type CustomerInfoCardProps = {
  name: string;
  phone: string;
  address: string;
  datetime: string;
  paymentType: PaymentType;
  paymentStatus: 'pending' | 'paid' | 'waitNewSlip';
  onCall?: () => void;
  onViewSlip?: () => void;
};

export function CustomerInfoCard({
  name,
  phone,
  address,
  datetime,
  paymentType,
  paymentStatus,
  onCall,
  onViewSlip,
}: CustomerInfoCardProps) {
  const paymentLabel = paymentType === 'online' ? 'โอนเงิน' : 'เก็บปลายทาง';

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
        <Pressable style={styles.callBtn} hitSlop={8} onPress={onCall}>
          <FigmaIcon name="call" size={15} />
        </Pressable>
      </View>
      <View style={styles.infoRow}>
        <FigmaIcon name="locationOn" width={9.33} height={13.33} />
        <Text style={styles.infoText}>{address}</Text>
      </View>
      <View style={styles.infoRow}>
        <FigmaIcon name="schedule" width={13.33} height={13.33} />
        <Text style={styles.infoText}>{datetime}</Text>
      </View>
      <View style={styles.infoRow}>
        <FigmaIcon name="payments" width={14.67} height={10.67} />
        <Text style={styles.infoText}>{paymentLabel}</Text>
        {paymentStatus === 'paid' ? (
          <>
            <Pressable style={styles.slipBadge} onPress={onViewSlip}>
              <FigmaIcon name="visibility" size={12} />
              <Text style={styles.slipText}>ดูสลิป</Text>
            </Pressable>
            <View style={styles.paidBadge}>
              <FigmaIcon name="checkCircle" size={12} />
              <Text style={styles.paidText}>ชำระเงินแล้ว</Text>
            </View>
          </>
        ) : paymentStatus === 'waitNewSlip' ? (
          <View style={styles.waitNewSlipBadge}>
            <FigmaIcon name="paymentArrowDown" size={10} />
            <Text style={styles.pendingText}>รอสลิปใหม่</Text>
          </View>
        ) : (
          <View style={styles.pendingBadge}>
            <FigmaIcon name="pending" size={10} />
            <Text style={styles.pendingText}>รออนุมัติ</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFCF5',
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  nameBlock: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...typography.title,
    color: '#1A1B2D',
  },
  phone: {
    ...typography.body,
    color: '#1A1B2D',
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    ...typography.body,
    color: '#1A1B2D',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.warningSoft,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  pendingText: {
    ...typography.smallSemibold,
    color: colors.yellow,
  },
  waitNewSlipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FFF7D4',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  slipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.brandLight,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  slipText: {
    ...typography.smallSemibold,
    color: colors.brand,
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#E8FFEF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  paidText: {
    ...typography.smallSemibold,
    color: '#04B400',
  },
});
