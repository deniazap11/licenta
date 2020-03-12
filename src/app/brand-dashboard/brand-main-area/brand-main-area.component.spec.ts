import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMainAreaComponent } from './brand-main-area.component';

describe('BrandMainAreaComponent', () => {
  let component: BrandMainAreaComponent;
  let fixture: ComponentFixture<BrandMainAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandMainAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
