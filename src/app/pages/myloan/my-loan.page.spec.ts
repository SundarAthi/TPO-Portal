import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoanPage } from './my-loan.page';

describe('PatientInfoPage', () => {
  let component: MyLoanPage;
  let fixture: ComponentFixture<MyLoanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyLoanPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MyLoanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
