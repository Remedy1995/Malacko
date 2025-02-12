import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateTrackingComponent } from './admin-update-tracking.component';

describe('AdminUpdateTrackingComponent', () => {
  let component: AdminUpdateTrackingComponent;
  let fixture: ComponentFixture<AdminUpdateTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
