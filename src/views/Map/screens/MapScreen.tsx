import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from "react-native";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewClustering from "react-native-map-clustering";
import Geolocation from "react-native-geolocation-service";
import { User, Crosshair } from "lucide-react-native";
import { leadsData } from "../../../utils/leads";
import NearbyLeadsOverlay from "../components/NearbyLeadsOverlay";

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const [region, setRegion] = useState({
    latitude: 28.4595,
    longitude: 77.0266,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const pulseAnim = useRef(new Animated.Value(1)).current;

  //Pulsing animation
  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.6,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    setHasPermission(true);
    return true;
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        setRegion((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        startPulse();
      },
      (error) => console.log("GPS Error", error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const init = async () => {
      const granted = await requestLocationPermission();
      if (granted) fetchLocation();
    };
    init();
  }, []);

  const recenter = () => {
    if (!userLocation) return;
    mapRef.current?.animateToRegion(
      {
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      800
    );
  };

  const moveToLead = (lead:any) => {
  mapRef.current?.animateToRegion(
    {
      latitude: lead.location.lat,
      longitude: lead.location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    600
  );
};

  if (hasPermission === null) {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.infoText}>Checking location permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.errorText}>Location permission required</Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestLocationPermission}>
          <Text style={styles.permissionBtnText}>Enable Location</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    
    {/* <MapViewClustering
      ref={mapRef}
      style={styles.map}
      region={region}
      provider={PROVIDER_GOOGLE}
    >
      {userLocation && (
        <Circle
          center={{
            latitude: userLocation.lat,
            longitude: userLocation.lng,
          }}
          radius={500}
          strokeWidth={1}
          strokeColor="rgba(0,122,255,0.5)"
          fillColor="rgba(0,122,255,0.15)"
        />
      )}

      {userLocation && (
        <Marker coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }}>
          <Animated.View style={[styles.pulseWrapper, { transform: [{ scale: pulseAnim }] }]} />
          <View style={styles.userMarker}>
            <User size={22} color="#fff" />
          </View>
        </Marker>
      )}

      {leadsData.map((lead) => (
        <Marker
          key={lead.id}
          coordinate={{
            latitude: lead.location.lat,
            longitude: lead.location.lng,
          }}
          title={lead.name}
          description={lead.companyName}
        />
      ))}
    </MapViewClustering> */}
    <NearbyLeadsOverlay
      leads={leadsData}
      onSelect={(lead) => moveToLead(lead)}
      onFocus={(lead) => moveToLead(lead)}
    />
    <TouchableOpacity style={styles.fab} onPress={recenter}>
      <Crosshair size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { 
    width: "100%",
    height: "100%" 
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 40,
    elevation: 5,
  },
  pulseWrapper: {
    position: "absolute",
    backgroundColor: "rgba(0,122,255,0.3)",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userMarker: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  centerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoText: { fontSize: 16, color: "#666" },
  errorText: { fontSize: 16, color: "red", marginBottom: 10 },
  permissionBtn: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  permissionBtnText: { color: "#fff", fontWeight: "600" },
});
