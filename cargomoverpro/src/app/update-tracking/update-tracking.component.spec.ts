import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrackingComponent } from './update-tracking.component';

describe('UpdateTrackingComponent', () => {
  let component: UpdateTrackingComponent;
  let fixture: ComponentFixture<UpdateTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
