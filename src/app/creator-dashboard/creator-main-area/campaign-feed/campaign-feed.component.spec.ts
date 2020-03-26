import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFeedComponent } from './campaign-feed.component';

describe('CampaignFeedComponent', () => {
  let component: CampaignFeedComponent;
  let fixture: ComponentFixture<CampaignFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
