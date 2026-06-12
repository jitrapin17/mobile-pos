import { Pressable, StyleSheet, Text, View } from 'react-native';
import { typography } from '../../../theme/typography';
import { FigmaIcon } from './FigmaIcon';

type DetailDropdownProps = {
  onOrderSuccess?: () => void;
  onCancelOrder?: () => void;
  onClose: () => void;
  disableOrderSuccess?: boolean;
};

export function DetailDropdown({ onOrderSuccess, onCancelOrder, onClose, disableOrderSuccess = false }: DetailDropdownProps) {
  return (
    <>
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />
      {/* Panel */}
      <View style={styles.panel}>
        <Pressable
          style={[styles.item, disableOrderSuccess && styles.itemDisabled]}
          onPress={disableOrderSuccess ? undefined : () => { onClose(); onOrderSuccess?.(); }}
        >
          <FigmaIcon name="checkCircleGreen" size={24} />
          <Text style={styles.itemText}>ออเดอร์สำเร็จ</Text>
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => { onClose(); onCancelOrder?.(); }}
        >
          <FigmaIcon name="cancelRed" size={24} />
          <Text style={styles.itemText}>ยกเลิกออเดอร์</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  panel: {
    position: 'absolute',
    top: 95,
    right: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    zIndex: 100,
    shadowColor: 'rgba(0,90,199,1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemDisabled: {
    opacity: 0.4,
  },
  itemText: {
    ...typography.body1,
    color: '#000000',
  },
});
