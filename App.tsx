import {
  NotoSansThai_400Regular,
  NotoSansThai_500Medium,
  NotoSansThai_600SemiBold,
  NotoSansThai_700Bold,
  useFonts,
} from '@expo-google-fonts/noto-sans-thai';
import { View } from 'react-native';
import { useState } from 'react';
import { DeliveryListScreen } from './src/screens/DeliveryListScreen';
import { OrderDetailConfirmScreen } from './src/screens/OrderDetailConfirmScreen';
import { OrderDetailEjectScreen } from './src/screens/OrderDetailEjectScreen';
import { OrderDetailPrepareScreen } from './src/screens/OrderDetailPrepareScreen';
import { SlipViewerScreen } from './src/screens/SlipViewerScreen';

type Screen = 'list' | 'detail' | 'prepare' | 'eject' | 'slipViewer';

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansThai_400Regular,
    NotoSansThai_500Medium,
    NotoSansThai_600SemiBold,
    NotoSansThai_700Bold,
  });
  const [screen, setScreen] = useState<Screen>('list');
  const [slipViewerFrom, setSlipViewerFrom] = useState<Screen>('detail');
  const [showApproveSnackbar, setShowApproveSnackbar] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const goToSlipViewer = (from: Screen) => {
    setSlipViewerFrom(from);
    setScreen('slipViewer');
  };

  if (!fontsLoaded) {
    return <View />;
  }

  if (screen === 'eject') {
    return (
      <OrderDetailEjectScreen
        onBack={() => setScreen('list')}
        rejectReason={rejectReason}
      />
    );
  }

  if (screen === 'prepare') {
    return (
      <OrderDetailPrepareScreen
        onBack={() => setScreen('list')}
        showApproveSnackbar={showApproveSnackbar}
        onViewSlip={() => goToSlipViewer('prepare')}
      />
    );
  }

  if (screen === 'slipViewer') {
    return <SlipViewerScreen onBack={() => setScreen(slipViewerFrom)} />;
  }

  if (screen === 'detail') {
    return (
      <OrderDetailConfirmScreen
        onBack={() => setScreen('list')}
        onApprove={() => {
          setShowApproveSnackbar(true);
          setScreen('prepare');
        }}
        onReject={(reason) => {
          setRejectReason(reason);
          setScreen('eject');
        }}
        onViewSlip={() => goToSlipViewer('detail')}
      />
    );
  }

  return <DeliveryListScreen onOrderPress={() => setScreen('detail')} onViewSlip={() => goToSlipViewer('list')} />;
}
