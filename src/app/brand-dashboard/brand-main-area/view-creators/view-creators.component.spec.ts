import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreatorsComponent } from './view-creators.component';

describe('ViewCreatorsComponent', () => {
  let component: ViewCreatorsComponent;
  let fixture: ComponentFixture<ViewCreatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
