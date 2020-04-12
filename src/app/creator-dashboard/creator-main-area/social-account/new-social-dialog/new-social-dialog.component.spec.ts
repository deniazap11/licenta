import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSocialDialogComponent } from './new-social-dialog.component';

describe('NewSocialDialogComponent', () => {
  let component: NewSocialDialogComponent;
  let fixture: ComponentFixture<NewSocialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSocialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSocialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
