import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticShopPage } from './analytic-shop.page';

describe('AnalyticShopPage', () => {
  let component: AnalyticShopPage;
  let fixture: ComponentFixture<AnalyticShopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
