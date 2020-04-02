import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getBaseUrl, toHttpParams } from '../shared';


@Injectable()
export class LoanService {
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = 'https://encompass-integration-esign-handler.b9ad.pro-us-east-1.openshiftapps.com';
    }

    getLoans() {
        //return this.http.get<string[]>(this.apiUrl + 'borrower/loan/listLoans', {
        return this.http.get<any[]>(this.apiUrl + '/borrower/loan/listLoans', {
            // params: toHttpParams({
            //     page: page
            // })
        });
    }

    getDocuments(loanguid) {
        return this.http.get<any[]>(this.apiUrl + '/borrower/loan/' + loanguid + '/documents', {

        });
    }




}