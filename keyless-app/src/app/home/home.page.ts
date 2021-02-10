import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceOperation } from '../services/device-operation';
import { DelegateInfo, KeylessService } from '../services/keyless.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private keylessToken = 'CiQ3NDNDODRCMS00ODM5LTY3MkUtNjFDNy05N0E0M0FCQzQ4RDMSuAxNSUlFcEFJQkFBS0NBUUVBa3FybjljNjVtdC84ZGJKRmpFbDdSV2VRTlBLN2h0d2U1UXJBMjBVRmRnZG0xTWlrakhtay82dlVmeWdtRXZXZGw5WjQrVTg0dHF5VGFKRWlzcFFGZm1HOEVQblFtKzk1ZXdCM1BDeTRzbXJ0VnlCRHNQRE5NK3hTQ013Z2RtUWliSXIwT0JsU0dGbXdKSloycUNJWHo0WHpPbExwSGFUY3BOeHVReTM2N3NPN0NDZU5lZ25KVFBOYTlVUmg3dzhXRlFkaEJXQ1NsQXNYOHFlYU1tTEI5RGV2UlA2YjdxZlNrTGRuQVJBbW1nMTdvdkM1VHNQQjYrQktwOHpiTHZxQmRsYjdsR3JMc0ZRWkl3NFpYSndPRTRScFIwYWF1cEZiS3lEYlpvNVptM2dBSFhLRkpza0ZBTVdCZ1dDYU1yWDd2QnllZ2I5TjRkYTZ1LzB1SlZodzh3SURBUUFCQW9JQkFBdDlVL3FQblQ2aXVWWkhCdWU4Z2VtbitVWU1sZUEwc2o3akhzU09uYVRuWTRqYnh2Z3lOMWpJRHpkKzM2eXdqUTN1QVVBV2txek16Q2R1NXpieUhaUU85L3FrZDFFZjYzWlZUUUhyeHZSREtDQ2hLR3hlRU5VMmVCNjBUdjYzVFhNUFY1NWxiV2IyNzdPT0RmR1I2aWVacUxveThJd2Y5Q0QrRzYwcmx2TEpTQ1BRYUkyd2Q1MDcxRmdEVDk4a3NZbFArOGVrVnFoWVRpY3RQS2lFWm9XUlE0NFc4NURHQjVHYWc4SktEcmVQbmQ5OER5WUNGcEZuOHh0cWE3dmErSGJyQlBzMk42bmViam1tQ0hvRUJUV0FVOTYxSE9JWVQvT29vZ2NzckpXSXJLYW83NTMyajdmd1lNcklHd0p2NnZaeDhnclRrcVpkMVU4c2picHBQbkVDZ1lFQXlxRGttWDQ3SW12b2xmUlhIYUlTOXBwblU5elRCdW1ZK3dNM0JMSXg5elY3bUZRTzhRakhDU0pCdGJyczlXMldNd2ptbnJiUnJlb1ZxZ1dFd05LODdZQXQwVytvVnp2ZDg3ZjhqbXQ4RFBvSnUzY2xaTWJkek9iYW83d1hRZnpuL09OeHFKVUJGN2NEaHVHakhMWTk5VURndW44VzV3RnJ1dGJpNDI2WUtWMENnWUVBdVV5YlpKSWxKbkg1UFJWSjBjcURhMFYrbHBudjNKdzhpTjIzL3psVTEybDZnMGI1d2RsVkpzdG13K0lGT1VWSUNvUXoyNm1KSXVRL0ZWaTAyUi80V2UwQytWMkxYSjJrNmVDSXozTytOZUVPZ1pVS3l1SmprblRwZkpaSkI4Q2JSY2NqV25ydlBEOUlFMlgwRFNxTDVxWjRacDFhcEFNeTNva3BOTG5MVG84Q2dZRUFoRnJEOTE3MDBXOGE1WmhNcnhhR3ZIM3VzR0MxbHZaTzd1Y1NzUWFVakoxcXRmMXlKUTlPc3pDbEswZUdNR244aWlsdU9vM0FPSkdHeFNBRnJzMzRpa29IbzU0RG43ZURLd2NxK1B4TWMwMS92ZXY5aU80OVF2SW9MbnRWMWN5VTNDTFV3d0ZSVFdSRjhYekJScWZqb0tkWUkzbVFSQ1F4Y2tHYXdtUWpFQ0VDZ1lFQXFCMUR3b3dCWG83N0pKc2kzVTZSeXdwQzNsb05UNmNFR055bjZjdlhHSlRmRFNtZ3dXbnZvb0haMjVBOVV3ZHpZKzhycVhoNExnck0zUTRkRGZ5K2NyL2crZU1QNUZnMlhlWlQyWHRXTUVYZXhsdzFiWHJXQWZOR1ByMk94cFROaXhJd0ZoQUE2elV5ckQ3TW5BRms2ajlRYnpFR0lsV3dta3Z3OGFBN1B5c0NnWUF4UUdHNzhrV3hXckNvalgzWTdsUzdOdXhuWTAyMEk3U2JUNWVONmlMV1gvWnJtVEN1V1JhYXBXOTJSSjFqdDZaVkwybVU2dlhycFk5alhNZzhvS3BjOXVpcnFFeURiN2x3OVlRb3R4SlZiQTRRZmplTnY5NzJUbFJmSkV0SDlJa0EzOWx6eFZEZEJBSzVnMjRvc3VDTG1ZSXBtVWhRZ1dTMWVHQ2VNU3dSQVE9PRog591O+JWUAPIRpUH7SDRvbTkNZVLfsRIdIFrCfVyl66QiIDv+5jVQsqo7maLSWjCAj8HzZg3MLd8lvf9D8ZA1qmd0KvICCoACkqrn9c65mt/8dbJFjEl7RWeQNPK7htwe5QrA20UFdgdm1MikjHmk/6vUfygmEvWdl9Z4+U84tqyTaJEispQFfmG8EPnQm+95ewB3PCy4smrtVyBDsPDNM+xSCMwgdmQibIr0OBlSGFmwJJZ2qCIXz4XzOlLpHaTcpNxuQy367sO7CCeNegnJTPNa9URh7w8WFQdhBWCSlAsX8qeaMmLB9DevRP6b7qfSkLdnARAmmg17ovC5TsPB6+BKp8zbLvqBdlb7lGrLsFQZIw4ZXJwOE4RpR0aaupFbKyDbZo5Zm3gAHXKFJskFAMWBgWCaMrX7vByegb9N4da6u/0uJVhw8xCwnJSBBhoQxAoLEy1CRH+QChpRW+hMfCoHEgUN/w8AADDwiI6BBjiwnJSBBlIHCgUNEAAAAGIFDQcAAABqDEc5RDUyMTA1RjgwRnIQAvZ7jsljSuu4U6anfra6hXoQyyemGILWbeDhVZxWaXx+PDKAAgLo8Zwpn/0FiSxULpRCt1HGkuj4fXApI1d65JDTsWmbmQvnc9l/swc9M4rK/le9FrXuF13VExdwXTQU20Jt2tHjr07gKOfa4Rl84Csh6/Q7quSV/GOqJYQlvCJ09Sx10rwq656Phr62mxzfO4Sd6oA4FqGSveZVib1EF3eCbaKrscOmLFZUTe5dCR1l/HgGqW5167MQ+ugq/pgA5B73F/vZPfd/H9yxgWwUSmfwqwQONBRKEi/Xiqv47OHK4OqnvvbAHwL61wSSwH+8gKS6wFKRXeOczgCSpJELkZM/YoQub5IxS3Tc/chZ1E/ZoF8SCslk1gPv3kHfdClZJodja6U=';
  private subs: Subscription[] = [];

  constructor(private keylessService: KeylessService) {
    this.keylessService.init();
    this.subs.push(this.keylessService.delegate().subscribe(
      (delegateInfo: DelegateInfo) => {
        console.log(delegateInfo);
      },
      (err) => {
        console.log(err);
      }
    ));
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    this.keylessService.deinit();
    this.subs.forEach(sub => sub.unsubscribe());
  }

  connect(): void {
    console.log('Connecting...');
    this.keylessService.connect(this.keylessToken)
      .then(() => console.log('done'));
  }

  disconnect(): void {
    console.log('Disconnecting...');
    this.keylessService.disconnect()
      .then(console.log);
  }

  locate(): void {
    this.keylessService.execute(this.keylessToken, [DeviceOperation.Locate])
      .then(console.log);
  }

  checkIn(): void {
    this.keylessService.execute(this.keylessToken, [
      DeviceOperation.CheckIn,
      DeviceOperation.Unlock,
      DeviceOperation.IgnitionEnable
    ]).then(console.log);
  }

  checkOut(): void {
    this.keylessService.execute(this.keylessToken, [
      DeviceOperation.CheckOut,
      DeviceOperation.IgnitionInhibit,
      DeviceOperation.Lock
    ]).then(console.log);
  }

  lock(): void {
    this.keylessService.execute(this.keylessToken, [
      DeviceOperation.IgnitionInhibit,
      DeviceOperation.Lock
    ]).then(console.log);
  }

  unlock(): void {
    this.keylessService.execute(this.keylessToken, [
      DeviceOperation.IgnitionEnable,
      DeviceOperation.Unlock
    ]).then(console.log);
  }
}
