import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { layout, radius, sizes, spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { DeliveryOrder } from '../types';
import { FigmaIcon } from './FigmaIcon';
import { OrderCardAction } from './OrderCardAction';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentInfo } from './PaymentInfo';

type DeliveryOrderCardProps = {
  order: DeliveryOrder;
  onPress?: () => void;
  onViewSlip?: () => void;
};

export function DeliveryOrderCard({ order, onPress, onViewSlip }: DeliveryOrderCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.idBlock}>
          <Text style={styles.orderId}>{order.id}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{order.date}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{order.time}</Text>
          </View>
        </View>
        <OrderStatusBadge status={order.status} />
        <Pressable style={styles.settingBadge} onPress={() => {}}>
          <FigmaIcon name="settingOrder" width={20} height={18} />
        </Pressable>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.customerRow}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.itemCount}>{order.itemCount}</Text>
        </View>
        <View style={styles.paymentRow}>
          <PaymentInfo type={order.paymentType} />
          <Text style={styles.amount}>{order.amount}</Text>
        </View>
      </View>

      <OrderCardAction action={order.action} progress={order.progress} onViewSlip={onViewSlip} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: layout.cardPadding,
    gap: spacing.lg2,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    minHeight: 50,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  idBlock: {
    flex: 1,
    gap: spacing.xxs,
  },
  orderId: {
    ...typography.bodyLargeBold,
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    ...typography.tiny,
    color: colors.textMuted,
  },
  metaDot: {
    ...typography.small,
    color: colors.textMuted,
  },
  settingBadge: {
    width: sizes.actionButton,
    height: sizes.actionButton,
    marginTop: -5,
    marginRight: -5,
    borderRadius: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
    elevation: 4,
  },
  cardBody: {
    gap: spacing.sm,
  },
  customerRow: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  customerName: {
    ...typography.bodyMedium,
    flex: 1,
    color: colors.brand,
  },
  itemCount: {
    ...typography.small,
    color: colors.textSoft,
  },
  paymentRow: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg2,
  },
  amount: {
    ...typography.body1,
    marginLeft: 'auto',
    color: colors.text,
    textAlign: 'right',
  },
});
