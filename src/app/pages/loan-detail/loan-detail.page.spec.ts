import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailPage } from './loan-detail.page';

describe('LoanDetailComponent', () => {
  let component: LoanDetailPage;
  let fixture: ComponentFixture<LoanDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanDetailPage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
