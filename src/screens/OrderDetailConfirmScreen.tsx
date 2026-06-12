import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { CustomerInfoCard } from '../features/delivery/components/CustomerInfoCard';
import { DetailDropdown } from '../features/delivery/components/DetailDropdown';
import { FigmaIcon } from '../features/delivery/components/FigmaIcon';
import { OrderDetailHeader } from '../features/delivery/components/OrderDetailHeader';

type OrderDetailConfirmScreenProps = {
  onBack: () => void;
  onApprove?: () => void;
  onReject?: (reason: string) => void;
  onViewSlip?: () => void;
};

export function OrderDetailConfirmScreen({ onBack, onApprove, onReject, onViewSlip }: OrderDetailConfirmScreenProps) {
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState(false);
  const [rejectInputFocused, setRejectInputFocused] = useState(false);

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
        <OrderDetailHeader title="ออเดอร์ #1001" onBack={onBack} onMore={() => setDropdownVisible(true)} />

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
              <Pressable style={styles.expandBtn} hitSlop={8} onPress={onViewSlip}>
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
            <Pressable style={styles.rejectBtn} onPress={() => setRejectModalVisible(true)}>
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


        {/* Dropdown */}
        {dropdownVisible && (
          <DetailDropdown
            onClose={() => setDropdownVisible(false)}
            onOrderSuccess={onApprove}
            onCancelOrder={() => setDropdownVisible(false)}
            disableOrderSuccess
          />
        )}

        {/* Reject modal */}
        <Modal
          visible={rejectModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setRejectModalVisible(false)}
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
          <View style={styles.modalOverlay}>
            <View style={styles.modalSheet}>
              {/* Close button */}
              <Pressable
                style={styles.closeBtn}
                onPress={() => {
                  setRejectModalVisible(false);
                  setRejectReason('');
                  setRejectError(false);
                  setRejectInputFocused(false);
                }}
                hitSlop={8}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>

              {/* Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>ไม่อนุมัติ</Text>
                <Text style={styles.modalSubtitle}>เลขออเดอร์ #1001</Text>
              </View>

              {/* Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>เหตุผลในการไม่อนุมัติ</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    rejectInputFocused && styles.textInputFocus,
                    rejectError && styles.textInputError,
                  ]}
                  value={rejectReason}
                  onChangeText={(val) => {
                    setRejectReason(val);
                    if (val.trim()) setRejectError(false);
                  }}
                  onFocus={() => setRejectInputFocused(true)}
                  onBlur={() => setRejectInputFocused(false)}
                  placeholder="รายละเอียด"
                  placeholderTextColor="#E2E5EA"
                  multiline
                  scrollEnabled
                />
                {rejectError && (
                  <Text style={styles.inputErrorText}>กรุณากรอกข้อมูล</Text>
                )}
              </View>

              {/* Confirm button */}
              <LinearGradient
                colors={['#003EC7', '#0052FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.modalConfirmBtn}
              >
                <Pressable
                  style={styles.modalConfirmPressable}
                  onPress={() => {
                    if (!rejectReason.trim()) {
                      setRejectError(true);
                      return;
                    }
                    setRejectModalVisible(false);
                    onReject?.(rejectReason);
                  }}
                >
                  <Text style={styles.modalConfirmText}>ตกลง</Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
          </KeyboardAvoidingView>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 23,
  },
  modalSheet: {
    width: 361,
    backgroundColor: colors.white,
    borderRadius: 18,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#CCD5E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 12,
    color: colors.text,
    lineHeight: 14,
  },
  modalHeader: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
  },
  modalSubtitle: {
    ...typography.body,
    color: '#B0B5BD',
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    ...typography.body,
    color: colors.brand,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#DCE5F5',
    borderRadius: 16,
    paddingHorizontal: 17,
    paddingVertical: 13,
    ...typography.body1,
    color: colors.text,
    height: 80,
    textAlignVertical: 'top',
    outlineStyle: 'none',
  } as any,
  textInputFocus: {
    backgroundColor: 'rgba(255,255,255,0.17)',
    borderColor: colors.brand,
  },
  textInputError: {
    borderColor: '#EF4444',
  },
  inputErrorText: {
    ...typography.small,
    color: '#FB3D13',
  },
  modalConfirmBtn: {
    height: 48,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalConfirmPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmText: {
    ...typography.title,
    color: colors.white,
  },
});
