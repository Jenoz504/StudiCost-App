import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodosCreationComponent } from './periodos-creation.component';

describe('PeriodosCreationComponent', () => {
  let component: PeriodosCreationComponent;
  let fixture: ComponentFixture<PeriodosCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodosCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodosCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
