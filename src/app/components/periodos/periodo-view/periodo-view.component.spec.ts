import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoViewComponent } from './periodo-view.component';

describe('PeriodoViewComponent', () => {
  let component: PeriodoViewComponent;
  let fixture: ComponentFixture<PeriodoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
