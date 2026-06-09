import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';

type ProgressStepsProps = {
  active: number;
  total?: number;
};

export function ProgressSteps({ active, total = 2 }: ProgressStepsProps) {
  return (
    <View style={styles.wrap}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[styles.segment, index < active ? styles.segmentActive : styles.segmentIdle]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 6,
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    flex: 1,
    height: 6,
    borderRadius: 6,
  },
  segmentActive: {
    backgroundColor: colors.orange,
  },
  segmentIdle: {
    backgroundColor: '#E9E9E9',
  },
});
