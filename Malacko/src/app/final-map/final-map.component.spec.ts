import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMapComponent } from './final-map.component';

describe('FinalMapComponent', () => {
  let component: FinalMapComponent;
  let fixture: ComponentFixture<FinalMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
