import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { FigmaIcon, FigmaIconName } from './FigmaIcon';

type Step = {
  label: string;
  icon: FigmaIconName;
  iconSize: { width: number; height: number };
};

const STEPS: Step[] = [
  { label: 'กำลังทำ', icon: 'statusCooking', iconSize: { width: 16, height: 12.77 } },
  { label: 'รอรับงาน', icon: 'statusWaitRider', iconSize: { width: 16, height: 16 } },
  { label: 'ส่งอาหาร', icon: 'statusRider', iconSize: { width: 17.5, height: 13.33 } },
  { label: 'สำเร็จ', icon: 'checkCircle', iconSize: { width: 16, height: 16 } },
];

type OrderProgressStepsProps = {
  activeStep?: number;
  stepTimes?: string[];
};

export function OrderProgressSteps({ activeStep = 0, stepTimes = [] }: OrderProgressStepsProps) {
  return (
    <View style={styles.wrap}>
      {/* Step circles + connectors */}
      <View style={styles.circleRow}>
        {STEPS.map((step, index) => {
          const isActive = index === activeStep;
          const isDone = index < activeStep;
          return (
            <Fragment key={index}>
              {index > 0 && (
                <View style={styles.connector} />
              )}
              <View
                style={[styles.circle, isActive && styles.circleActive]}
              >
                <FigmaIcon
                  name={step.icon}
                  width={step.iconSize.width}
                  height={step.iconSize.height}
                  color={isActive ? '#FFFFFF' : isDone ? colors.orange : colors.orangeLight}
                />
              </View>
            </Fragment>
          );
        })}
      </View>

      {/* Labels */}
      <View style={styles.labelRow}>
        {STEPS.map((step, index) => {
          const isActive = index === activeStep;
          const stepTime = stepTimes[index];
          return (
            <View key={`label-${index}`} style={styles.labelCol}>
              <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
                {step.label}
              </Text>
              {isActive && stepTime ? (
                <Text style={styles.time}>{stepTime}</Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: colors.orange,
  },
  connector: {
    flex: 1,
    height: 3,
    borderRadius: 99,
    backgroundColor: colors.white,
  },
  labelRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
  },
  labelCol: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    ...typography.bodyMedium,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.text,
  },
  labelInactive: {
    color: colors.textMuted,
  },
  time: {
    ...typography.small,
    color: colors.textSoft,
    textAlign: 'center',
  },
});
