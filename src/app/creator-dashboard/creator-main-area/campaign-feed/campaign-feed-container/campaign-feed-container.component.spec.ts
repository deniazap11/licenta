import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFeedContainerComponent } from './campaign-feed-container.component';

describe('CampaignFeedContainerComponent', () => {
  let component: CampaignFeedContainerComponent;
  let fixture: ComponentFixture<CampaignFeedContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignFeedContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignFeedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
