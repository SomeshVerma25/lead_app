import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
// import MlkitOcr from "react-native-mlkit-ocr";
import { Scan } from "lucide-react-native";

const { width } = Dimensions.get("window");

const CardScanScreen: React.FC = () => {
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const devices = useCameraDevices();
  const device = devices[1];

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);

  // 📸 Capture Image
  const handleCapture = async () => {
    try {
      if (!cameraRef.current) return;
      const photo = await cameraRef.current.takePhoto({
        flash: "off",
      });

      // analyzeImage(photo.path);
    } catch (err) {
      console.log("Capture Error:", err);
    }
  };

  // 🖼 Pick image from gallery
  const handleGalleryPick = () => {
    const options: ImageLibraryOptions = { mediaType: "photo", quality: 0.8 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage || "Gallery error");
        return;
      }

      const uri = response.assets?.[0]?.uri;
      // if (uri) analyzeImage(uri.replace("file://", ""));
    });
  };

  // 🔍 OCR Processing
  // const analyzeImage = async (path: string) => {
  //   try {
  //     setIsAnalyzing(true);
  //     const result = await MlkitOcr.detectFromFile(path);

  //     setIsAnalyzing(false);

  //     let extracted = result.map((b) => b.text).join("\n");

  //     Alert.alert("OCR Result", extracted || "No text detected.");
  //     console.log("Recognized Text:", extracted);
  //   } catch (err) {
  //     console.log("OCR Error:", err);
  //     setIsAnalyzing(false);
  //     Alert.alert("Error", "Failed to analyze image.");
  //   }
  // };

  if (!device || !hasPermission) {
    return (
      <View style={styles.centered}>
        <Text>Waiting for camera permission...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Scan Your ID Card</Text>
      <Text style={styles.guideline}>
        Place your card inside the frame and tap Capture.
      </Text>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <View style={styles.frameOverlay} />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Scan size={28} color="#fff" />
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.galleryButton} onPress={handleGalleryPick}>
        <Text style={styles.galleryButtonText}>Pick from Gallery</Text>
      </TouchableOpacity>

      {/* Loader Modal */}
      <Modal transparent visible={isAnalyzing}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={{ marginTop: 12, fontSize: 16 }}>Analyzing...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "600", textAlign: "center", marginTop: 20 },
  guideline: { fontSize: 16, color: "#555", textAlign: "center", marginVertical: 10 },
  cameraContainer: {
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    alignSelf: "center",
    marginVertical: 25,
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
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  captureButtonText: { color: "#fff", fontSize: 18, marginLeft: 10 },
  galleryButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: "center",
  },
  galleryButtonText: { color: "#fff", fontSize: 16 },
  
  // Loader Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    width: 160,
    alignItems: "center",
  },
});
