import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateStoreroomPage } from './update-storeroom.page';

describe('UpdateStoreroomPage', () => {
  let component: UpdateStoreroomPage;
  let fixture: ComponentFixture<UpdateStoreroomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoreroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
