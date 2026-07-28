// capacitor.config.ts
import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.moshaktomoshak.jangjahani",
  appName: "Jang Jahani",
  webDir: "static",
  server: {
    androidScheme: "https",
  },
};

export default config;
