import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { radius, sizes, spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { DeliveryStatusTabs } from './DeliveryStatusTabs';
import { FigmaIcon } from './FigmaIcon';

type DeliveryFilterPanelProps = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export function DeliveryFilterPanel({ tabs, activeTab, onTabPress }: DeliveryFilterPanelProps) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.72)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.02)']}
      locations={[0, 0.72, 1]}
      style={styles.panel}
    >
      <View style={styles.searchRow}>
        <View style={styles.searchInput}>
          <FigmaIcon name="search" size={24} />
          <Text style={styles.searchPlaceholder}>ค้นหา</Text>
        </View>
        <Pressable style={styles.iconButton} hitSlop={8}>
          <FigmaIcon name="calendar" width={18} height={20} />
        </Pressable>
        <Pressable style={styles.iconButton} hitSlop={8}>
          <FigmaIcon name="refresh" size={18} />
        </Pressable>
      </View>
      <DeliveryStatusTabs tabs={tabs} activeTab={activeTab} onTabPress={onTabPress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginHorizontal: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg2,
    paddingBottom: spacing.xl2,
    borderRadius: radius.card,
    shadowColor: '#FFF5CE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md2,
    marginBottom: spacing.md2,
  },
  searchInput: {
    flex: 1,
    height: sizes.actionButton,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md2,
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4.5,
    elevation: 4,
  },
  searchPlaceholder: {
    ...typography.body,
    color: '#B8C9EF',
  },
  iconButton: {
    width: sizes.actionButton,
    height: sizes.actionButton,
    borderRadius: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
