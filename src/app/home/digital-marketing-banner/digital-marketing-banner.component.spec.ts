import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalMarketingBannerComponent } from './digital-marketing-banner.component';

describe('DigitalMarketingBannerComponent', () => {
  let component: DigitalMarketingBannerComponent;
  let fixture: ComponentFixture<DigitalMarketingBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalMarketingBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalMarketingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
