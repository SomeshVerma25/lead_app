import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { Scan } from "lucide-react-native";
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";

const { width } = Dimensions.get("window");

const CardScanScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices[1];

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    Alert.alert("Capture", "Camera capture will be implemented here.");
    // TODO: Use frame processor or take photo via Camera component
  };

  const handleGalleryPick = () => {
    const options: ImageLibraryOptions = { mediaType: "photo", quality: 0.8 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) console.log("Gallery Error: ", response.errorMessage);
      else if (response.assets && response.assets.length > 0) {
        console.log("Selected Image URI: ", response.assets[0].uri);
        // TODO: pass this URI to OCR
      }
    });
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Waiting for camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Your ID Card</Text>
      <Text style={styles.guideline}>
        Place your card inside the frame and tap "Capture". You can also pick an image from the gallery.
      </Text>
      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <View style={styles.frameOverlay} />
      </View>
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Scan size={28} color="#fff" />
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.galleryButton} onPress={handleGalleryPick}>
        <Text style={styles.galleryButtonText}>Pick from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    textAlign: "center",
  },
  guideline: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginVertical: 15,
  },
  cameraContainer: {
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    marginVertical: 20,
  },
  frameOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 2,
    borderColor: "#00FF00",
    borderRadius: 8,
  },
  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,
  },
  captureButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  galleryButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#6c757d",
    borderRadius: 10,
  },
  galleryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CardScanScreen;
