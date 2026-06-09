import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { FigmaIcon } from './FigmaIcon';

type OrderDetailHeaderProps = {
  title: string;
  onBack: () => void;
  onMore?: () => void;
};

export function OrderDetailHeader({ title, onBack, onMore }: OrderDetailHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.iconBtn} onPress={onBack} hitSlop={8}>
        <FigmaIcon name="back" size={22} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.moreBtn} hitSlop={8} onPress={onMore}>
        <FigmaIcon name="moreHoriz" width={16} height={4} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    flex: 1,
    textAlign: 'center',
    color: '#000000',
  },
  moreBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
