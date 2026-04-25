import { useState, useRef } from 'react';
import { Button, TouchableOpacity, View, Pressable, StyleSheet, Text, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState(null);


  const ref = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos tu permiso para acceder a la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function tomarFoto() {
    const photo = await ref.current?.takePictureAsync();

    if (photo?.uri) {
      setUri(photo.uri);
      console.log(photo.uri);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView ref={ref} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Voltear cámara</Text>
          </TouchableOpacity>

          <Pressable style={styles.button} onPress={tomarFoto}>
            <Text style={styles.text}>Tomar foto</Text>
          </Pressable>

        </View>
      </CameraView>

      {uri && (
        <Image source={{ uri }} style={styles.preview} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    position: 'absolute',
    width: 120,
    height: 160,
    borderRadius: 20,
    top: 50,
    right: 50,

  },
});