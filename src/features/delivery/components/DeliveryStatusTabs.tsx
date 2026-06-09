import { useEffect, useRef } from 'react';
import { LayoutRectangle, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

type DeliveryStatusTabsProps = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export function DeliveryStatusTabs({ tabs, activeTab, onTabPress }: DeliveryStatusTabsProps) {
  const scrollerRef = useRef<ScrollView>(null);
  const tabLayouts = useRef<Record<string, LayoutRectangle>>({});
  const activeIndex = tabs.indexOf(activeTab);

  useEffect(() => {
    if (activeIndex < 0) return;
    const layout = tabLayouts.current[activeTab];
    if (layout) {
      scrollerRef.current?.scrollTo({ x: Math.max(0, layout.x - 16), animated: true });
    }
  }, [activeIndex, activeTab]);

  return (
    <ScrollView
      ref={scrollerRef}
      horizontal
      bounces
      nestedScrollEnabled
      scrollEnabled
      directionalLockEnabled
      alwaysBounceHorizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.scrollContent}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;

        return isActive ? (
          <Pressable
            key={tab}
            style={styles.activeTab}
            onPress={() => onTabPress(tab)}
            onLayout={(e) => { tabLayouts.current[tab] = e.nativeEvent.layout; }}
          >
            <Text style={styles.activeText}>{tab}</Text>
          </Pressable>
        ) : (
          <Pressable
            key={tab}
            onPress={() => onTabPress(tab)}
            onLayout={(e) => { tabLayouts.current[tab] = e.nativeEvent.layout; }}
          >
            <LinearGradient
              colors={['rgba(252,252,252,0.7)', 'rgba(254,255,234,0.7)']}
              style={styles.tab}
            >
              <Text style={styles.idleText}>{tab}</Text>
            </LinearGradient>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: {
    width: '100%',
    height: 40,
    flexGrow: 0,
  },
  scrollContent: {
    height: 40,
    gap: 12,
    paddingRight: 12,
  },
  tab: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 3.5,
    elevation: 4,
  },
  activeText: {
    ...typography.bodyMedium,
    color: colors.brand,
  },
  idleText: {
    ...typography.body,
    color: '#808080',
  },
});
