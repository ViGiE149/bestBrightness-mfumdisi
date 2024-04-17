import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlipsPage } from './slips.page';

describe('SlipsPage', () => {
  let component: SlipsPage;
  let fixture: ComponentFixture<SlipsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
