import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.stkngesk.slime',
  appName: 'Slime Merging Game',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
