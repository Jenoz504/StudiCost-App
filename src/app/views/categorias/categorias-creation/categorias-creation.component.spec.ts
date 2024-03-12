import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasCreationComponent } from './categorias-creation.component';

describe('CategoriasCreationComponent', () => {
  let component: CategoriasCreationComponent;
  let fixture: ComponentFixture<CategoriasCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
