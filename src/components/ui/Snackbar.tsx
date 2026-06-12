import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../../theme/typography';

type SnackbarProps = {
  visible: boolean;
  message: string;
  duration?: number;
  onHide?: () => void;
};

export function Snackbar({ visible, message, duration = 2500, onHide }: SnackbarProps) {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
          bounciness: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start(() => onHide?.());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.wrap, { opacity, transform: [{ translateY }] }]}>
      <LinearGradient
        colors={['#FFFEE8', '#34B73A']}
        locations={[0.06, 0.97]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.pill}
      >
        <View style={styles.content}>
          <Image
            source={require('../../../assets/snackbar-checkmark.png')}
            style={styles.sticker}
            resizeMode="contain"
          />
          <Text style={styles.text}>{message}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 24,
    left: 18,
    right: 18,
    zIndex: 999,
    shadowColor: '#002B8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    borderRadius: 18,
  },
  pill: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 17,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.title,
    color: '#141825',
    textAlign: 'center',
    flex: 1,
  },
  sticker: {
    width: 35,
    height: 35,
    position: 'absolute',
    left: 0,
    top: -7,
    zIndex: 1,
  },
});
