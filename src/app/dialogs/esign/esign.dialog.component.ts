import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'esign',
    templateUrl: './esign.dialog.component.html',
    styleUrls: ['./esign.dialog.component.scss']
})

export class EsignDialogComponent implements OnInit {
    url: string;
    urlEsign: SafeResourceUrl;

    constructor(public modal: NgbActiveModal,
        public sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.urlEsign = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

}
