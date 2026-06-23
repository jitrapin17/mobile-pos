import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Button } from '../components/ui/Button';
import { CustomerInfoCard } from '../features/delivery/components/CustomerInfoCard';
import { DetailDropdown } from '../features/delivery/components/DetailDropdown';
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
  onViewSlip?: () => void;
};

export function OrderDetailPrepareScreen({ onBack, showApproveSnackbar = false, onViewSlip }: OrderDetailPrepareScreenProps) {
  const [snackbarVisible, setSnackbarVisible] = useState(showApproveSnackbar);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [printDialogVisible, setPrintDialogVisible] = useState(false);

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

        {/* Progress steps + action buttons */}
        <View style={styles.topSection}>
          <OrderProgressSteps activeStep={0} stepTimes={['12:30:00']} />

          <View style={styles.actionRow}>
            <Button variant="outline"   label="ออเดอร์สำเร็จ" />
            <Button variant="gradient"  label="เลือกคนส่ง" flex />
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
              onViewSlip={onViewSlip}
            />

            {/* Order list */}
            <View style={styles.orderSection}>
              <View style={styles.orderSectionHeader}>
                <View style={styles.orderTitleBlock}>
                  <Text style={styles.orderTitle}>รายการออเดอร์</Text>
                  <Text style={styles.orderCount}>5 รายการ</Text>
                </View>
                <Pressable style={styles.receiptBtn} hitSlop={8} onPress={() => setPrintDialogVisible(true)}>
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

        {dropdownVisible && (
          <DetailDropdown
            onClose={() => setDropdownVisible(false)}
            onCancelOrder={() => setDropdownVisible(false)}
          />
        )}

        <Snackbar
          visible={snackbarVisible}
          message="ออเดอร์ส่งสำเร็จแล้ว"
          onHide={() => setSnackbarVisible(false)}
        />

        {/* Print confirm dialog */}
        <Modal
          visible={printDialogVisible}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setPrintDialogVisible(false)}
        >
          <Pressable style={styles.dialogOverlay} onPress={() => setPrintDialogVisible(false)}>
            <Pressable style={styles.dialogCard} onPress={() => {}}>
              <View style={styles.dialogContent}>
                <View style={styles.dialogIconWrap}>
                  <FigmaIcon name="receiptLong" width={24} height={27} color={colors.brand} />
                </View>
                <Text style={styles.dialogTitle}>ยืนยันพิมพ์ใบออเดอร์</Text>
                <Text style={styles.dialogSubtitle}>ต้องการพิมพ์ใบออเดอร์อีกครั้ง</Text>
              </View>
              <View style={styles.dialogActions}>
                <Pressable style={styles.dialogCancelBtn} onPress={() => setPrintDialogVisible(false)}>
                  <Text style={styles.dialogCancelText}>ยกเลิก</Text>
                </Pressable>
                <LinearGradient
                  colors={['#003EC7', '#0052FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.dialogConfirmBtn}
                >
                  <Pressable style={styles.dialogConfirmPressable} onPress={() => setPrintDialogVisible(false)}>
                    <Text style={styles.dialogConfirmText}>ยืนยัน</Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
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
    color: colors.text,
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
    ...typography.bodyBold,
    color: colors.brand,
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
    ...typography.body1,
    flex: 1,
    color: colors.text,
  },
  orderItemPrice: {
    ...typography.bodyLargeBold,
    color: colors.text,
  },
  orderItemOption: {
    ...typography.body,
    color: colors.textMuted,
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
    ...typography.body1,
    color: colors.text,
  },
  deliveryAmount: {
    ...typography.h4,
    color: colors.text,
  },
  grandTotalLabel: {
    ...typography.bodyLargeBold,
    color: colors.text,
  },
  grandTotalAmount: {
    ...typography.h2,
    color: colors.brand,
  },
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogCard: {
    width: 320,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    gap: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  dialogContent: {
    alignItems: 'center',
    gap: 8,
  },
  dialogIconWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogTitle: {
    ...typography.h3,
    color: '#141825',
    textAlign: 'center',
  },
  dialogSubtitle: {
    ...typography.body,
    color: '#B0B5BD',
    textAlign: 'center',
  },
  dialogActions: {
    flexDirection: 'row',
    gap: 12,
  },
  dialogCancelBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#EBEDF1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogCancelText: {
    ...typography.bodySemibold,
    color: '#141825',
  },
  dialogConfirmBtn: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    shadowColor: 'rgba(0,62,199,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  dialogConfirmPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogConfirmText: {
    ...typography.bodySemibold,
    color: colors.white,
  },
});
