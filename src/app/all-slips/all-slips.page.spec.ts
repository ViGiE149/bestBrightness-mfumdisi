import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllSlipsPage } from './all-slips.page';

describe('AllSlipsPage', () => {
  let component: AllSlipsPage;
  let fixture: ComponentFixture<AllSlipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSlipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
