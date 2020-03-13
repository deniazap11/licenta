import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorMainAreaComponent } from './creator-main-area.component';

describe('CreatorMainAreaComponent', () => {
  let component: CreatorMainAreaComponent;
  let fixture: ComponentFixture<CreatorMainAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorMainAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorMainAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
