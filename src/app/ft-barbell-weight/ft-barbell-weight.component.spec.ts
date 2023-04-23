import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtBarbellWeightComponent } from './ft-barbell-weight.component';

describe('FtBarbellWeightComponent', () => {
  let component: FtBarbellWeightComponent;
  let fixture: ComponentFixture<FtBarbellWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtBarbellWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtBarbellWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
