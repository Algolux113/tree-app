import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    connect() {
        return this.http
        .get('http://uae.fort-monitor.ru/api/integration/v1/connect?login=ApiTest&password=ApiTest&lang=ru-ru&timezone=5', 
        { withCredentials: true });
    }

    getCompaniesList() {
        return this.http.get('http://uae.fort-monitor.ru/api/integration/v1/getcompanieslist');
    }

    getObjectGroupsList() {
        return this.http.get('http://uae.fort-monitor.ru/api/integration/v1/getobjectgroupslist');
    }

    getObjectsList() {
        return this.http.get('http://uae.fort-monitor.ru/api/integration/v1/getobjectslist');
    }

    disconnect() {
        return this.http
        .get('http://uae.fort-monitor.ru/api/integration/v1/disconnect');
    }
}