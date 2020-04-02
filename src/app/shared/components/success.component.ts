import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'success-component',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
})

export class SuccessComponent implements OnInit {
    @Input('message') message: string;

    constructor() { }

    ngOnInit() { }
}
