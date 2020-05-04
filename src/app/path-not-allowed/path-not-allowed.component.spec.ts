import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathNotAllowedComponent } from './path-not-allowed.component';

describe('PathNotAllowedComponent', () => {
  let component: PathNotAllowedComponent;
  let fixture: ComponentFixture<PathNotAllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathNotAllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathNotAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
