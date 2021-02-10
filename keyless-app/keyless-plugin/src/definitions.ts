import { PluginListenerHandle } from '@capacitor/core';
import { DeviceOperation } from './device-operation';

declare module '@capacitor/core' {
  interface PluginRegistry {
    KeylessPlugin: KeylessPluginPlugin;
  }
}

export interface KeylessPluginPlugin {
  connect(options: { keylessToken: string }): Promise<void>;
  disconnect(): Promise<void>;
  execute(options: { keylessToken: string, deviceOperations: DeviceOperation[] }): Promise<void>;
  addListener(eventName: string, listenerFunc: (event: {}) => void): PluginListenerHandle;
  removeAllListeners(): void;
}
