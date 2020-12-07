import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { tap, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

import { User } from './user';
import { News } from './news';
import { Config } from '../config';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    public login(user: User) {
        return this.http.post(
            Config.apiUrl + "user/" + Config.appKey + "/login",
            JSON.stringify({
                username: user.username,
                password: user.password
            }),
            { headers: this.getCommonHeaders() }
        )
            .pipe(
                tap((data: any) => {
                    Config.token = data._kmd.authtoken;
                }),
                catchError(this.handleErrors)
            );
    }

    public getContentNews() {
        let headers = this.getHeaders()
        return this.http.get(Config.apiUrl + "appdata/" + Config.appKey + "/News", { headers: headers });
    }

    private getHeaders() {
        return new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": Config.appUserHeader,
            "AuthToken":  Config.token,
            "X-Kinvey-API-Version": "5"
        });
    }

    private getCommonHeaders() {
        return new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": Config.appUserHeader,
            "X-Kinvey-API-Version": "5"
        });
    }

    private handleErrors(error: HttpErrorResponse) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
