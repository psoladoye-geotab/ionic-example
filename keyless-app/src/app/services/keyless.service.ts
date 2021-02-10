import { Injectable, NgZone } from '@angular/core';
import { DeviceOperation } from './device-operation';
import { Plugins } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';

const { KeylessPlugin } = Plugins;

export interface DelegateInfo {
  readonly type: 'oncClientConnect' | 'onClientDisconnectedUnexpectedly' |
  'onClientOperationsFailed' | 'onClientOperationsSucceed';
}

@Injectable({
  providedIn: 'root'
})
export class KeylessService {

  private subject = new Subject<DelegateInfo>();

  constructor(
    private ngZone: NgZone
  ) {
  }

  init() {
    KeylessPlugin.addListener('onClientConnect', () => this.oncClientConnect());
    KeylessPlugin.addListener('onClientDisconnectedUnexpectedly', () => this.onClientDisconnectedUnexpectedly());
    KeylessPlugin.addListener('onClientOperationsFailed', () => this.onClientOperationsFailed());
    KeylessPlugin.addListener('onClientOperationsSucceed', () => this.onClientOperationsSucceed());
  }

  deinit() {
    KeylessPlugin.removeAllListeners();
  }

  delegate(): Observable<DelegateInfo> {
    return this.subject;
  }

  async connect(keylessToken: string): Promise<void> {
    return KeylessPlugin.connect({ keylessToken });
  }

  async execute(keylessToken: string, deviceOperations: DeviceOperation[]): Promise<void> {
    return KeylessPlugin.execute({ keylessToken, deviceOperations });
  }

  async disconnect(): Promise<void> {
    return KeylessPlugin.disconnect();
  }

  private oncClientConnect() {
    this.ngZone.run(() => {
      console.log('oncClientConnect');
      this.subject.next({ type: 'oncClientConnect'});
    });
  }

  private onClientDisconnectedUnexpectedly() {
    this.ngZone.run(() => {
      console.log('onClientDisconnectedUnexpectedly');
      this.subject.next({ type: 'onClientDisconnectedUnexpectedly'});
    });
  }

  private onClientOperationsFailed() {
    this.ngZone.run(() => {
      console.log('onClientOperationsFailed');
      this.subject.next({ type: 'onClientOperationsFailed'});
    });
  }

  private onClientOperationsSucceed() {
    this.ngZone.run(() => {
      console.log('onClientOperationsSucceed');
      this.subject.next({ type: 'onClientOperationsSucceed'});
    });
  }
}
