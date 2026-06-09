import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { DeliveryOrder } from '../types';
import { FigmaIcon } from './FigmaIcon';
import { OrderCardAction } from './OrderCardAction';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentInfo } from './PaymentInfo';

type DeliveryOrderCardProps = {
  order: DeliveryOrder;
  onPress?: () => void;
};

export function DeliveryOrderCard({ order, onPress }: DeliveryOrderCardProps) {
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

      <OrderCardAction action={order.action} progress={order.progress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 14,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    minHeight: 50,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  idBlock: {
    flex: 1,
    gap: 2,
  },
  orderId: {
    ...typography.title,
    color: '#000000',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    width: 40,
    height: 40,
    marginTop: -5,
    marginRight: -5,
    borderRadius: 20,
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
    gap: 6,
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
    gap: 14,
  },
  amount: {
    ...typography.title,
    marginLeft: 'auto',
    color: '#111111',
    textAlign: 'right',
  },
});
