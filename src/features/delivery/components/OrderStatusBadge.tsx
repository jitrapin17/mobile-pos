import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { DeliveryStatus } from '../types';
import { FigmaIcon, FigmaIconName } from './FigmaIcon';

const statusMap = {
  pending: {
    label: 'รอยืนยัน',
    icon: 'statusPending',
    color: colors.text,
    backgroundColor: colors.warningSoft,
  },
  cooking: {
    label: 'กำลังทำ',
    icon: 'statusCooking',
    color: colors.text,
    backgroundColor: colors.warningSoft,
  },
  waitRider: {
    label: 'รอรับงาน',
    icon: 'statusWaitRider',
    color: colors.text,
    backgroundColor: colors.orangeSoft,
  },
  rider: {
    label: 'กำลังส่ง',
    icon: 'statusRider',
    color: colors.text,
    backgroundColor: colors.orangeSoft,
  },
  success: {
    label: 'สำเร็จ',
    icon: null,
    color: colors.successDark,
  backgroundColor: colors.successSoft,
  },
} satisfies Record<DeliveryStatus, {
  label: string;
  icon: FigmaIconName | null;
  color: string;
  backgroundColor: string;
}>;

type OrderStatusBadgeProps = {
  status: DeliveryStatus;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const item = statusMap[status];

  return (
    <View style={[styles.badge, { backgroundColor: item.backgroundColor }]}>
      {item.icon && <FigmaIcon name={item.icon} size={20} />}
      <Text style={[styles.text, { color: item.color }]}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 60,
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  text: {
    ...typography.body,
  },
});
