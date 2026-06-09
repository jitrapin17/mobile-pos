import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { FigmaIcon } from './FigmaIcon';

export function DeliveryHeader() {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} hitSlop={8}>
        <FigmaIcon name="back" size={22} />
      </Pressable>
      <Text style={styles.title}>รายการ Delivery</Text>
      <View style={styles.notification} pointerEvents="none">
        <FigmaIcon name="bellWithDot" size={28} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    paddingTop: 58,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 65,
    width: 38,
    height: 38,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  title: {
    ...typography.h3,
    color: colors.white,
    textAlign: 'center',
  },
  notification: {
    position: 'absolute',
    right: 17,
    top: 70,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
