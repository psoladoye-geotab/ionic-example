import { WebPlugin } from '@capacitor/core';
import { KeylessPluginPlugin } from './definitions';

export class KeylessPluginWeb extends WebPlugin implements KeylessPluginPlugin {
  constructor() {
    super({
      name: 'KeylessPlugin',
      platforms: ['web'],
    });
  }
  async connect(_: { keylessToken: string; }): Promise<void> {
    console.error('connect method not available for web');
  }
  async disconnect(): Promise<void> {
    console.error('disconnect method not available for web');
  }
  async execute(_: { keylessToken: string; deviceOperations: DeviceOperation[]; }): Promise<void> {
    console.error('execute method not available for web');
  }
}

const KeylessPluginForWeb = new KeylessPluginWeb();

export { KeylessPluginForWeb };

import { registerWebPlugin } from '@capacitor/core';
import { DeviceOperation } from './device-operation';
registerWebPlugin(KeylessPluginForWeb);
