import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSidenavComponent } from './brand-sidenav.component';

describe('BrandSidenavComponent', () => {
  let component: BrandSidenavComponent;
  let fixture: ComponentFixture<BrandSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
