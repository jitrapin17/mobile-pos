import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors } from '../theme/colors';
import { DeliveryFilterPanel } from '../features/delivery/components/DeliveryFilterPanel';
import { DeliveryHeader } from '../features/delivery/components/DeliveryHeader';
import { DeliveryOrderCard } from '../features/delivery/components/DeliveryOrderCard';
import { deliveryOrders, deliveryTabs } from '../features/delivery/data/orders';
import { DeliveryStatus } from '../features/delivery/types';
import { typography } from '../theme/typography';

const statusByTab: Partial<Record<string, DeliveryStatus>> = {
  รอยืนยัน: 'pending',
  กำลังทำ: 'cooking',
  รอรับงาน: 'waitRider',
  กำลังส่ง: 'rider',
  สำเร็จ: 'success',
};

type DeliveryListScreenProps = {
  onOrderPress: () => void;
  onViewSlip?: () => void;
};

export function DeliveryListScreen({ onOrderPress, onViewSlip }: DeliveryListScreenProps) {
  const pagerRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const pageWidth = Math.min(width, 393);
  const [activeTab, setActiveTab] = useState(deliveryTabs[0]);
  const skipScrollRef = useRef(false);
  const skipTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const ordersByTab = useMemo(() => {
    return deliveryTabs.map((tab) => {
      const status = statusByTab[tab];
      const orders = tab === 'ทั้งหมด'
        ? deliveryOrders
        : status
          ? deliveryOrders.filter((order) => order.status === status)
          : [];

      return {
        tab,
        orders,
      };
    });
  }, []);

  const handleTabPress = (tab: string) => {
    const nextIndex = deliveryTabs.indexOf(tab);
    skipScrollRef.current = true;
    clearTimeout(skipTimerRef.current);
    skipTimerRef.current = setTimeout(() => { skipScrollRef.current = false; }, 600);
    setActiveTab(tab);
    pagerRef.current?.scrollTo({ x: nextIndex * pageWidth, animated: true });
  };

  const handlePagerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (skipScrollRef.current) return;
    const index = Math.round(event.nativeEvent.contentOffset.x / pageWidth);
    if (deliveryTabs[index]) {
      setActiveTab(deliveryTabs[index]);
    }
  };

  const handleScrollEnd = () => {
    clearTimeout(skipTimerRef.current);
    skipScrollRef.current = false;
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.phoneFrame}>
        <Image
          source={require('../../assets/delivery-list-background.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <View style={styles.headerBackground}>
          <DeliveryHeader />
          <DeliveryFilterPanel tabs={deliveryTabs} activeTab={activeTab} onTabPress={handleTabPress} />
        </View>

        <ScrollView
          ref={pagerRef}
          horizontal
          pagingEnabled
          nestedScrollEnabled
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.pager}
          onScroll={handlePagerScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEnd}
        >
          {ordersByTab.map(({ tab, orders }) => (
            <ScrollView
              key={tab}
              style={[styles.listPage, { width: pageWidth }]}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
              nestedScrollEnabled
            >
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <DeliveryOrderCard
                    key={`${tab}-${order.customerName}-${index}`}
                    order={order}
                    onPress={order.status === 'pending' ? onOrderPress : undefined}
                    onViewSlip={order.action === 'viewSlip' ? onViewSlip : undefined}
                  />
                ))
              ) : (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>ไม่มีรายการ</Text>
                </View>
              )}
            </ScrollView>
          ))}
        </ScrollView>
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
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 393,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  headerBackground: {
    height: 252,
    overflow: 'hidden',
  },
  pager: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
  listPage: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 24,
  },
  emptyCard: {
    minHeight: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyText: {
    ...typography.bodyMedium,
    color: colors.textMuted,
  },
});
