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
import { OrderDetailPrepareScreen } from './src/screens/OrderDetailPrepareScreen';

type Screen = 'list' | 'detail' | 'prepare';

export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSansThai_400Regular,
    NotoSansThai_500Medium,
    NotoSansThai_600SemiBold,
    NotoSansThai_700Bold,
  });
  const [screen, setScreen] = useState<Screen>('list');
  const [showApproveSnackbar, setShowApproveSnackbar] = useState(false);

  if (!fontsLoaded) {
    return <View />;
  }

  if (screen === 'prepare') {
    return (
      <OrderDetailPrepareScreen
        onBack={() => setScreen('list')}
        showApproveSnackbar={showApproveSnackbar}
      />
    );
  }

  if (screen === 'detail') {
    return (
      <OrderDetailConfirmScreen
        onBack={() => setScreen('list')}
        onApprove={() => {
          setShowApproveSnackbar(true);
          setScreen('prepare');
        }}
      />
    );
  }

  return <DeliveryListScreen onOrderPress={() => setScreen('detail')} />;
}
