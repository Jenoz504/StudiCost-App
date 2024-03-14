import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosViewComponent } from './gastos-view.component';

describe('GastosViewComponent', () => {
  let component: GastosViewComponent;
  let fixture: ComponentFixture<GastosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GastosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
