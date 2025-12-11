
import Geolocation, {
  GeoPosition,
} from "react-native-geolocation-service";
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
    // Auto adjust accuracy based on app state
    AppState.addEventListener("change", (state) => {
      if (state === "active") {
        this.useHighAccuracy();
      } else {
        this.useLowPower();
      }
    });
  }

  // 🔄 Add listener to get location updates anywhere
  addListener(cb: (pos: GeoPosition) => void) {
    this.listeners.push(cb);
  }

  removeListener(cb: (pos: GeoPosition) => void) {
    this.listeners = this.listeners.filter((l) => l !== cb);
  }

  private emit(pos: GeoPosition) {
    this.listeners.forEach((cb) => cb(pos));
  }

  // 🟢 Start low power tracking (default)
  start() {
    this.useLowPower();
  }

  // 🟡 Low power mode (balanced + cell tower + wifi)
  useLowPower() {
    if (this.isHighAccuracy) {
      this.stop();
    }

    this.isHighAccuracy = false;

    this.watchId = Geolocation.watchPosition(
      (pos) => this.emit(pos),
      (err) => console.log("Low power error:", err),
      {
        enableHighAccuracy: false,
        distanceFilter: 50,     // update only after 50 meters
        interval: 20000,        // 20 sec
        fastestInterval: 10000, // 10 sec
      }
    );

    console.log("📍 Using LOW POWER tracking");
  }

  // 🔴 High accuracy mode (GPS)
  useHighAccuracy() {
    if (!this.isHighAccuracy) {
      this.stop();
    }

    this.isHighAccuracy = true;

    this.watchId = Geolocation.watchPosition(
      (pos) => this.emit(pos),
      (err) => console.log("High accuracy error:", err),
      {
        enableHighAccuracy: true,
        distanceFilter: 5,      // small movement
        interval: 5000,
        fastestInterval: 3000,
      }
    );

    console.log("📍 Using HIGH ACCURACY tracking");
  }

  // ⛔ Stop tracking completely
  stop() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // 🔐 Send location to backend (optional)
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
