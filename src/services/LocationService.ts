import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import { AppState } from "react-native";

class LocationService {
  private static instance: LocationService;
  private watchId: number | null = null;
  private listeners: ((pos: GeoPosition) => void)[] = [];
  private isHighAccuracy = false;

  static getInstance() {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  private constructor() {
    AppState.addEventListener("change", (state) => {
      if (state === "active") {
        this.useHighAccuracy();
      } else {
        this.useLowPower();
      }
    });
  }

  addListener(cb: (pos: GeoPosition) => void) {
    if (!this.listeners.includes(cb)) {
      this.listeners.push(cb);
    }
  }

  removeListener(cb: (pos: GeoPosition) => void) {
    this.listeners = this.listeners.filter((l) => l !== cb);
  }

  private emit(pos: GeoPosition) {
    this.listeners.forEach((cb) => cb(pos));
  }

  start() {
    this.useLowPower();
  }

  stop() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private startWatch(enableHighAccuracy: boolean, distanceFilter: number, interval: number) {
    if (this.watchId !== null) Geolocation.clearWatch(this.watchId);

    this.watchId = Geolocation.watchPosition(
      (pos) => this.emit(pos),
      (err) => console.log("Location error:", err),
      {
        enableHighAccuracy,
        distanceFilter,
        interval,
        fastestInterval: interval / 2,
        showsBackgroundLocationIndicator: true,
        useSignificantChanges: false,
      }
    );
  }

  useLowPower() {
    if (!this.isHighAccuracy) return; // Already in low power

    this.isHighAccuracy = false;
    this.startWatch(false, 10, 2000); // 50 meters, 20 sec
    console.log("📍 Using LOW POWER tracking");
  }

  useHighAccuracy() {
    if (this.isHighAccuracy) return; // Already high accuracy

    this.isHighAccuracy = true;
    this.startWatch(true, 5, 2000); // 5 meters, 5 sec
    console.log("📍 Using HIGH ACCURACY tracking");
  }

  async sendToServer(pos: GeoPosition) {
    try {
      await fetch("https://api.example.com/update-location", {
        method: "POST",
        body: JSON.stringify({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          timestamp: pos.timestamp,
        }),
      });
    } catch (err) {
      console.log("Location update failed:", err);
    }
  }
}

export default LocationService.getInstance();
