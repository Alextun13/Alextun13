import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroQrPage } from './registro-qr.page';

describe('RegistroQrPage', () => {
  let component: RegistroQrPage;
  let fixture: ComponentFixture<RegistroQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
