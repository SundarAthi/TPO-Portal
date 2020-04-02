import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EsignDialogComponent } from 'src/app/dialogs';
import { Location, DatePipe } from '@angular/common';
import { LoanService } from '../../services';

@Component({
    selector: 'loan-detail',
    templateUrl: './loan-detail.page.html',
    styleUrls: ['./loan-detail.page.scss']
})

export class LoanDetailPage implements OnInit {
    LoanInfoLabel: any[];
    loanDocuments: any[];
    loaneSigners: any[];
    loanDats: any = <any>{};
    rateExpiryDate: any;

    loanEsignUrl: string;
    loanNo: string;
    borrowerName: string;
    loanguid: string;
    isSigned: boolean;
    isLtvCltvHcltv: string;

    constructor(private router: Router,
        private modal: NgbModal,
        private location: Location,
        private activateRouter: ActivatedRoute,
        private loanSvc: LoanService,
        private datePipe: DatePipe) {

    }

    ngOnInit() {
        //this.getLoanData(this.location.getState()); 
        this.activateRouter.queryParams.subscribe(params => {
            this.loanguid = JSON.parse(params["loanData"]).loanId;
            this.loanNo = JSON.parse(params["loanData"]).loanNo;
            this.loaneSigners = JSON.parse(params["loanData"]).signers;
            this.rateExpiryDate = new Date(JSON.parse(params["loanData"]).rateExpirtation);
            this.rateExpiryDate = this.datePipe.transform(this.rateExpiryDate, 'MM-dd-yyyy');
            this.isSigned = JSON.parse(params["loanData"]).signed;

            if (JSON.parse(params["loanData"]).ltvCltvHcltv ? JSON.parse(params["loanData"]).ltvCltvHcltv?.toLowerCase() == 'null/null/null' : ' ') {
                this.isLtvCltvHcltv = '-';
            }
            else {
                this.isLtvCltvHcltv = JSON.parse(params["loanData"]).ltvCltvHcltv;
            }

            let borrower = this.loaneSigners.find(obj => obj.type.toLowerCase() == 'borrower');
            if (borrower) {
                this.borrowerName = borrower.name;
            }

            this.LoanInfoLabel = [
                { label: "Loan Number", key: JSON.parse(params["loanData"]).loanNo }, { label: "Primary Borrower", key: this.borrowerName }, { label: "Address", key: JSON.parse(params["loanData"]).address || '-' }, { label: "Total Loan Amount", key: JSON.parse(params["loanData"]).loanAmount }, { label: "Interest Rate", key: JSON.parse(params["loanData"]).rate || '-' }, { label: "Status:", key: JSON.parse(params["loanData"]).status || '-' },
                { label: "LTV / CLTV / HCLTV", key: this.isLtvCltvHcltv }, { label: "Property Type", key: JSON.parse(params["loanData"]).propertyType || '-' }, { label: "Lock Status", key: JSON.parse(params["loanData"]).lockStatus || '-' }, { label: "Product", key: JSON.parse(params["loanData"]).product || '-' }, { label: "Program:", key: JSON.parse(params["loanData"]).program || '-' }, { label: "Occupancy:", key: JSON.parse(params["loanData"]).occupancy || '-' },
                { label: "Loan Purpose:", key: JSON.parse(params["loanData"]).loanPurpose || '-' }, { label: "Lock Expiration:", key: this.rateExpiryDate || '-' }
            ]
        });
        this.getDocuments();
    }

    getDocuments() {
        this.loanSvc.getDocuments(this.loanguid).subscribe((res: any) => {
            this.loanDats = res;
            this.loanDocuments = res.docsSets[0].documents;
            let docPackageBorrower = this.loanDats.docPackageBorrowers.find(obj => obj.type.toLowerCase() == "originator");
            if (docPackageBorrower) {
                this.loanEsignUrl = docPackageBorrower.url;
            }
        })
    }

    goToMyLoan() {
        this.router.navigate(['/my-loan']);
    }

    openModal() {
        const ref = this.modal.open(EsignDialogComponent, {
            backdrop: 'static',
            keyboard: true,
            size: 'xl'
        })
        let dialog = ref.componentInstance as EsignDialogComponent;
        dialog.url = this.loanEsignUrl;
        ref.result

    }

}

