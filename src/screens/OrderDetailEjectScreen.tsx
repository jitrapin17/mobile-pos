import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { CustomerInfoCard } from '../features/delivery/components/CustomerInfoCard';
import { DetailDropdown } from '../features/delivery/components/DetailDropdown';
import { OrderDetailHeader } from '../features/delivery/components/OrderDetailHeader';
import { Snackbar } from '../components/ui/Snackbar';

type OrderDetailEjectScreenProps = {
  onBack: () => void;
  rejectReason: string;
};

export function OrderDetailEjectScreen({ onBack, rejectReason }: OrderDetailEjectScreenProps) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setShowSnackbar(true);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.frame}>
        <LinearGradient
          colors={['#FFE4AD', '#FFFFFF']}
          locations={[0, 0.276]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.statusBarSpace} />
        <OrderDetailHeader title="ออเดอร์ #1001" onBack={onBack} onMore={() => setDropdownVisible(true)} />
        <View style={styles.headerGap} />

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
              paymentStatus="waitNewSlip"
            />

            <View style={styles.rejectReasonCard}>
              <Text style={styles.rejectReasonTitle}>ไม่อนุมัติ</Text>
              <Text style={styles.rejectReasonText}>{rejectReason}</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomBar}>
          <Pressable style={styles.waitSlipBtn} onPress={onBack}>
            <Text style={styles.waitSlipText}>รอสลิปใหม่</Text>
          </Pressable>
        </View>

        {dropdownVisible && (
          <DetailDropdown
            onClose={() => setDropdownVisible(false)}
            onCancelOrder={() => setDropdownVisible(false)}
            disableOrderSuccess
          />
        )}

        <Snackbar
          visible={showSnackbar}
          message="ทำรายการสำเร็จ"
          onHide={() => setShowSnackbar(false)}
        />
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
    paddingBottom: 100,
  },
  rejectReasonCard: {
    backgroundColor: '#F9FAFD',
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  rejectReasonTitle: {
    ...typography.h4,
    color: colors.text,
  },
  rejectReasonText: {
    ...typography.body,
    color: colors.text,
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
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 8,
  },
  waitSlipBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7D4',
  },
  waitSlipText: {
    ...typography.title,
    color: '#FFA622',
  },
});
