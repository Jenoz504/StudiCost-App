import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasControlComponent } from './categorias-control.component';

describe('CategoriasControlComponent', () => {
  let component: CategoriasControlComponent;
  let fixture: ComponentFixture<CategoriasControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
