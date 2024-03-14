import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosControlComponent } from './gastos-control.component';

describe('GastosControlComponent', () => {
  let component: GastosControlComponent;
  let fixture: ComponentFixture<GastosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
