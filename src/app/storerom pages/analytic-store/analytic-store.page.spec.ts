import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticStorePage } from './analytic-store.page';

describe('AnalyticStorePage', () => {
  let component: AnalyticStorePage;
  let fixture: ComponentFixture<AnalyticStorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
