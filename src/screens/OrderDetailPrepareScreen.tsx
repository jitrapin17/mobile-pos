import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { CustomerInfoCard } from '../features/delivery/components/CustomerInfoCard';
import { FigmaIcon } from '../features/delivery/components/FigmaIcon';
import { OrderDetailHeader } from '../features/delivery/components/OrderDetailHeader';
import { OrderProgressSteps } from '../features/delivery/components/OrderProgressSteps';
import { Snackbar } from '../components/ui/Snackbar';

type OrderItem = {
  qty: number;
  name: string;
  price: string;
  options?: string[];
};

const ORDER_ITEMS: OrderItem[] = [
  {
    qty: 1,
    name: 'พุงออปัง 2 Style',
    price: '฿340.00',
    options: ['แป้งชาร์โคล , แป้งออริจินอล', 'ไส้มัทฉะ (+฿30.00)', '* (ไม่โรยน้ำตาล)'],
  },
  {
    qty: 1,
    name: 'พุงออปัง 1 Style',
    price: '฿170.00',
    options: ['แป้งออริจินอล', 'ซอสมัทฉะ (+฿30.00), ไส้ถั่วแดง (+฿20.00)'],
  },
  { qty: 1, name: 'พุงออปังไส้ถั่วแดง', price: '฿95.00' },
  { qty: 1, name: 'พุงออปังไส้คัสตาร์ต', price: '฿95.00' },
];

type OrderDetailPrepareScreenProps = {
  onBack: () => void;
  showApproveSnackbar?: boolean;
};

export function OrderDetailPrepareScreen({ onBack, showApproveSnackbar = false }: OrderDetailPrepareScreenProps) {
  const [snackbarVisible, setSnackbarVisible] = useState(showApproveSnackbar);

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

        <OrderDetailHeader title="ออเดอร์ #1001" onBack={onBack} />

        <View style={styles.headerGap} />

        {/* Progress steps + action buttons */}
        <View style={styles.topSection}>
          <OrderProgressSteps activeStep={0} stepTimes={['12:30:00']} />

          <View style={styles.actionRow}>
            <Pressable style={styles.successBtn}>
              <Text style={styles.successBtnText}>ออเดอร์สำเร็จ</Text>
            </Pressable>
            <LinearGradient
              colors={['#FFA622', '#FF7B00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.riderBtnGradient}
            >
              <Pressable style={styles.riderBtnPressable}>
                <Text style={styles.riderBtnText}>เลือกคนส่ง</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>

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
              paymentStatus="paid"
            />

            {/* Order list */}
            <View style={styles.orderSection}>
              <View style={styles.orderSectionHeader}>
                <View style={styles.orderTitleBlock}>
                  <Text style={styles.orderTitle}>รายการออเดอร์</Text>
                  <Text style={styles.orderCount}>5 รายการ</Text>
                </View>
                <Pressable style={styles.receiptBtn} hitSlop={8}>
                  <FigmaIcon name="receiptLong" size={20} />
                </Pressable>
              </View>

              <View style={styles.orderItems}>
                {ORDER_ITEMS.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <Text style={styles.orderQty}>X{item.qty}</Text>
                    <View style={styles.orderItemDetail}>
                      <View style={styles.orderItemRow}>
                        <Text style={styles.orderItemName}>{item.name}</Text>
                        <Text style={styles.orderItemPrice}>{item.price}</Text>
                      </View>
                      {item.options?.map((opt, i) => (
                        <Text key={i} style={styles.orderItemOption}>{opt}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                  <Text style={styles.deliveryLabel}>ค่าจัดส่ง</Text>
                  <Text style={styles.deliveryAmount}>฿5.00</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.grandTotalLabel}>ยอดรวมทั้งหมด</Text>
                  <Text style={styles.grandTotalAmount}>฿745.00</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

      </View>

      <Snackbar
        visible={snackbarVisible}
        message="ออเดอร์ส่งสำเร็จแล้ว"
        onHide={() => setSnackbarVisible(false)}
      />
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
    height: 8,
  },
  topSection: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  successBtn: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  successBtnText: {
    ...typography.title,
    color: colors.brand,
  },
  riderBtnGradient: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  riderBtnPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderBtnText: {
    ...typography.title,
    color: colors.white,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    shadowColor: colors.orange,
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.21,
    shadowRadius: 11,
    elevation: 8,
  },
  cardContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },
  orderSection: {
    gap: 10,
  },
  orderSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderTitleBlock: {
    gap: 0,
  },
  orderTitle: {
    ...typography.h4,
    color: '#000000',
  },
  orderCount: {
    ...typography.body,
    color: colors.textSoft,
  },
  receiptBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandLight,
  },
  orderItems: {
    gap: 12,
  },
  orderItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  orderQty: {
    ...typography.bodyMedium,
    fontFamily: 'NotoSansThai_700Bold',
    fontWeight: '700',
    color: colors.brand,
    lineHeight: 20,
  },
  orderItemDetail: {
    flex: 1,
    gap: 2,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderItemName: {
    ...typography.title,
    flex: 1,
    color: '#1A1B2D',
    fontSize: 16,
    lineHeight: 24,
  },
  orderItemPrice: {
    ...typography.title,
    color: '#111111',
    fontSize: 16,
    lineHeight: 24,
  },
  orderItemOption: {
    ...typography.body,
    color: '#9A9FA5',
  },
  totalSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    gap: 2,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryLabel: {
    ...typography.title,
    fontWeight: '400',
    fontFamily: 'NotoSansThai_400Regular',
    color: '#1A1B2D',
    fontSize: 16,
  },
  deliveryAmount: {
    ...typography.h4,
    color: '#111111',
  },
  grandTotalLabel: {
    ...typography.title,
    color: '#1A1B2D',
    fontSize: 16,
  },
  grandTotalAmount: {
    ...typography.h2,
    color: colors.brand,
  },
});
