import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreroomDeshboardPage } from './storeroom-deshboard.page';

describe('StoreroomDeshboardPage', () => {
  let component: StoreroomDeshboardPage;
  let fixture: ComponentFixture<StoreroomDeshboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreroomDeshboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
