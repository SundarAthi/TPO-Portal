import { HttpParams } from '@angular/common/http';

export function toHttpParams(params) {
    return Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, params[key]), new HttpParams());
}

export function getBaseUrl() {
    let baseUrl = location.origin;
    return baseUrl;
}
