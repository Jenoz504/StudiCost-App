import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosControlComponent } from './periodos-control.component';

describe('PeriodosControlComponent', () => {
  let component: PeriodosControlComponent;
  let fixture: ComponentFixture<PeriodosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodosControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
