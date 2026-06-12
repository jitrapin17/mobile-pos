import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ProgressSteps } from '../../../components/ui/ProgressSteps';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { OrderAction } from '../types';
import { FigmaIcon } from './FigmaIcon';

type OrderCardActionProps = {
  action: OrderAction;
  progress?: number;
  onViewSlip?: () => void;
};

export function OrderCardAction({ action, progress = 0, onViewSlip }: OrderCardActionProps) {
  if (action === 'none') {
    return null;
  }

  if (action === 'viewSlip') {
    return (
      <Pressable style={styles.outlineButton} onPress={onViewSlip}>
        <Text style={styles.outlineText}>ดูสลิป</Text>
        <FigmaIcon name="chevronOrange" size={20} />
      </Pressable>
    );
  }

  const label = action === 'selectRider' ? 'เลือกคนส่ง' : 'ส่งสำเร็จ';
  const gradient = action === 'selectRider'
    ? [colors.orange, '#FFA622'] as const
    : [colors.brandDark, '#0052FF'] as const;

  return (
    <View style={styles.progressAction}>
      <Pressable style={styles.solidButton}>
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.solidGradient}>
          <Text style={styles.solidText}>{label}</Text>
          <FigmaIcon name="chevronWhite" size={20} />
        </LinearGradient>
      </Pressable>
      <ProgressSteps active={progress} />
    </View>
  );
}

const styles = StyleSheet.create({
  outlineButton: {
    height: 40,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.white,
  },
  outlineText: {
    ...typography.bodySemibold,
    color: colors.orange,
  },
  progressAction: {
    gap: 8,
  },
  solidButton: {
    height: 40,
    borderRadius: 12,
    overflow: 'hidden',
  },
  solidGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingLeft: 24,
    paddingRight: 20,
  },
  solidText: {
    ...typography.bodySemibold,
    color: colors.white,
  },
});
