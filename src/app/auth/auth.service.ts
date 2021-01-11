import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs"; // rxjs uvijek vraca observable :D
import { User } from "./user.model";
import { Router } from "@angular/router";

import { environment } from '../../environments/environment';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(catchError(this.handleError),
        tap(resData => { // tap nam omogucava da izvrsimo akciju bez promjene responsea :D to je sto je :D   
            this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn); // + oznacava da je u pitanju number :D
        }));  
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        )
        .pipe(catchError(this.handleError),
        tap(resData => { // tap nam omogucava da izvrsimo akciju bez promjene responsea :D to je sto je :D   
            this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn); // + oznacava da je u pitanju number :D
        }));  
    }

    autologin() { // ppozivamo u app.component.ts jer treba da se prvo pokrece ;D
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        //console.log("AUTO LOG DATA: "+ JSON.stringify(userData));

        if(!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autologout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autologout(expirationDuration: number){
        console.log("TOKEN TRAJE: "+expirationDuration);
        this.tokenExpirationTimer = setTimeout( () => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autologout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        //console.log("USAO: "+errorMessage);
            if(!errorRes.error || !errorRes.error.error){ // ako eror dobijanmo u drugacijem formatu od : errorRes.error.error ili errorRes.error
              //  console.log("USAO2: "+errorMessage);
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {// u konzoli tako ga dohvatimo , slicno kad sam iz ip-a json podatak dohvatao koji je ugnezdjen 
                case 'EMAIL_EXISTS': errorMessage = 'This email exists already'; // u konzoli pise EMAIL_EXIST pa tako znam :D
                break;
                case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist.';
                break;
                case 'INVALID_PASSWORD': errorMessage = 'This password is not correct';
                break;

            }
           // console.log("USAO3: "+errorMessage);
            return throwError(errorMessage);
    }

}