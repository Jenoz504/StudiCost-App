import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosCreationComponent } from './gastos-creation.component';

describe('GastosCreationComponent', () => {
  let component: GastosCreationComponent;
  let fixture: ComponentFixture<GastosCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
