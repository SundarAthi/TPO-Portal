import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { LoanService } from '../../services';

@Component({
    selector: 'my-loan',
    templateUrl: './my-loan.page.html',
    styleUrls: ['./my-loan.page.scss']
})

export class MyLoanPage implements OnInit {
    tpoLoanseSignedFalse = [];          // Load the Loan data based on eSigned false
    tpoLoanseSignedTrue = [];           // Load the Loan data based on eSigned true
    tpoLoanseSignedFalseFilters: any[]; // Filter the loan data based on eSigned false
    tpoLoanseSignedTrueFilters: any[];  // Filter the loan data based on eSigned true
    config: any;                        // Pagination - Get the current page Number while in pagination process     

    serchTexteSignFalse: string;        // Search the loans for eSigned false
    serchTexteSignTrue: string;         // Search the loans for eSigned true
    lockExpiryStr: string;              // Change the caption for Lock Expiry      

    isShowTab: number = 0;              // Loans view

    constructor(private router: Router,
        private loanSvc: LoanService) { }

    ngOnInit() {
        this.getLoans();
    }

    getLoans() {
        this.tpoLoanseSignedFalseFilters = this.tpoLoanseSignedFalse = [];
        this.tpoLoanseSignedTrueFilters = this.tpoLoanseSignedTrue = [];
        this.loanSvc.getLoans().subscribe((res: any) => {
            if (res && res.length > 0) {
                res.forEach(result => {
                    if (result.loanNo != null) {
                        if (result.signers.some(obj => !obj.esigned)) {
                            if (result.lockExpiry.toLowerCase() == 'not locked') {
                                result.lockExpiry = 'Unlocked';
                            }
                            else if (result.lockExpiry.toLowerCase() == 'expired lock') {
                                result.lockExpiry = 'Expired';
                            }
                            this.tpoLoanseSignedFalse.push(result.signers);
                        }
                        else {
                            this.tpoLoanseSignedTrue.push(result.signers);
                        }
                    }
                });
                if (this.isShowTab == 0) {
                    this.tpoLoanseSignedFalseFilters = this.tpoLoanseSignedFalse = res.filter(resultData => resultData && resultData.loanNo);
                }
                else {
                    this.tpoLoanseSignedTrueFilters = this.tpoLoanseSignedTrue = res.filter(resultData => resultData && resultData.loanNo);
                }
                this.paginationConfig();
            }
        })
    }

    goToLoanDetail(Data) {
        //this.router.navigateByUrl('/loan-detail', { state: Data });
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "loanData": JSON.stringify(Data)
            }
        };
        this.router.navigate(['/loan-detail'], navigationExtras);
    }

    searchLoans() {
        if (this.isShowTab == 0) {
            let exp = RegExp(this.serchTexteSignFalse, 'i');
            if (this.serchTexteSignFalse && this.serchTexteSignFalse !== '') {
                try {
                    this.tpoLoanseSignedFalse = this.tpoLoanseSignedFalseFilters.filter((res: any) => res.signers[0].name.match(exp));
                }
                catch (ex) { }
            } else {
                this.tpoLoanseSignedFalse = this.tpoLoanseSignedFalseFilters;
            }
        }
        else {
            let exp = RegExp(this.serchTexteSignTrue, 'i');
            if (this.serchTexteSignTrue && this.serchTexteSignTrue !== '') {
                try {
                    this.tpoLoanseSignedTrue = this.tpoLoanseSignedTrueFilters.filter((res: any) => res.signers[0].name.match(exp));
                }
                catch (ex) { }
            } else {
                this.tpoLoanseSignedTrue = this.tpoLoanseSignedFalseFilters;
            }
        }
        this.paginationConfig();
    }

    showTab(viewTab: number) {
        this.isShowTab = viewTab;
        this.paginationConfig();
    }

    pageChanged(event) {
        if (this.isShowTab == 0) {
            this.config.currentPage = event;
        }
        else {
            this.config.currentPage = event;
        }
    }

    paginationConfig() {
        if (this.isShowTab == 0) {
            this.config = {
                itemsPerPage: 10, // how many records want to display in a page
                currentPage: 1,
                totalItems: this.tpoLoanseSignedFalse.length
            };
        }
        else {
            this.config = {
                itemsPerPage: 1,
                currentPage: 1,
                totalItems: this.tpoLoanseSignedTrue.length
            };
        }

    }
}
