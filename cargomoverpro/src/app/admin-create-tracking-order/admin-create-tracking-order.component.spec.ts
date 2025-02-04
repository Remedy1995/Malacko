import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTrackingOrderComponent } from './admin-create-tracking-order.component';

describe('AdminCreateTrackingOrderComponent', () => {
  let component: AdminCreateTrackingOrderComponent;
  let fixture: ComponentFixture<AdminCreateTrackingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateTrackingOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateTrackingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
