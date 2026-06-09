import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { CustomerInfoCard } from '../features/delivery/components/CustomerInfoCard';
import { FigmaIcon } from '../features/delivery/components/FigmaIcon';
import { OrderDetailHeader } from '../features/delivery/components/OrderDetailHeader';

type OrderDetailConfirmScreenProps = {
  onBack: () => void;
  onApprove?: () => void;
};

export function OrderDetailConfirmScreen({ onBack, onApprove }: OrderDetailConfirmScreenProps) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.frame}>
        <LinearGradient
          colors={['#FFE4AD', '#FFFFFF']}
          locations={[0, 0.276]}
          style={StyleSheet.absoluteFill}
        />

        {/* Status bar space */}
        <View style={styles.statusBarSpace} />

        {/* Header */}
        <OrderDetailHeader title="ออเดอร์ #1001" onBack={onBack} />

        <View style={styles.headerGap} />

        {/* White card */}
        <View style={styles.card}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardContent}
          >
            <CustomerInfoCard
              name="มาร์ค"
              phone="0971999127"
              address="12/7 สุขุมวิท ซอย 27, กรุงเทพฯ 10400"
              datetime="01-01-2026 12:30:00"
              paymentType="online"
              paymentStatus="pending"
            />

            {/* Total */}
            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>ยอดรวม</Text>
                <Text style={styles.totalSub}>5 รายการ</Text>
              </View>
              <Text style={styles.totalAmount}>฿745.00</Text>
            </View>

            {/* Slip placeholder */}
            <View style={styles.slipContainer}>
              <View style={styles.slipPlaceholder}>
                <Text style={styles.slipPlaceholderText}>สลิปการโอนเงิน</Text>
              </View>
              <Pressable style={styles.expandBtn} hitSlop={8}>
                <FigmaIcon name="expandContent" width={14} height={14} />
              </Pressable>
            </View>
          </ScrollView>
        </View>

        {/* Bottom bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomWarning}>
            กรุณาตรวจสอบยอดเงินชำระที่ได้รับ ก่อนกดการยืนยัน
          </Text>
          <View style={styles.bottomActions}>
            <Pressable style={styles.rejectBtn}>
              <Text style={styles.rejectText}>ไม่อนุมัติ</Text>
            </Pressable>
            <LinearGradient
              colors={[colors.brandDark, '#0052FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.approveBtn}
            >
              <Pressable style={styles.approvePressable} onPress={onApprove}>
                <Text style={styles.approveText}>อนุมัติ</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: 393,
    overflow: 'hidden',
  },
  statusBarSpace: {
    height: 59,
  },
  headerGap: {
    height: 14,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 150,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    ...typography.h4,
    color: '#000000',
  },
  totalSub: {
    ...typography.body,
    color: colors.textSoft,
  },
  totalAmount: {
    ...typography.h2,
    color: colors.brand,
  },
  slipContainer: {
    height: 444,
    borderRadius: 6,
    backgroundColor: '#E9EEF5',
    overflow: 'hidden',
  },
  slipPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slipPlaceholderText: {
    ...typography.body,
    color: colors.textSoft,
  },
  expandBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.49)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 8,
  },
  bottomWarning: {
    ...typography.body,
    color: colors.textSoft,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border,
  },
  rejectText: {
    ...typography.title,
    color: colors.text,
  },
  approveBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  approvePressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: {
    ...typography.title,
    color: colors.white,
  },
});
