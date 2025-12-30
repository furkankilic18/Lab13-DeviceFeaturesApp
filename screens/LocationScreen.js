import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';

export default function LocationScreen() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Konum izni gerekli');
      return;
    }
    
    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);

    await Notifications.requestPermissionsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Konum Alındı',
        body: 'GPS konumunuz başarıyla alındı.',
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Mevcut Konumu Al" onPress={getLocation} />
      {coords && (
        <View style={styles.resultContainer}>
          <Text>Enlem: {coords.latitude}</Text>
          <Text>Boylam: {coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});