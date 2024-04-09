import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register.interface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from '../models/auth-data.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiURL = environment.apiURL;
    jwtHelper = new JwtHelperService();

    // elementi per gestire la procedura di login
    private authSub = new BehaviorSubject<AuthData | null>(null);
    user$ = this.authSub.asObservable();
    timeOut: any;

    constructor(private http: HttpClient, private router: Router) { }

    login(data: { email: string; password: string }) {
        return this.http.post<AuthData>(`${this.apiURL}login`, data).pipe(
            tap((data) => {
                console.log('Auth data: ', data);
            }),
            tap((data) => {
                this.authSub.next(data);
                localStorage.setItem('user', JSON.stringify(data));
            }),
            catchError((error) => this.handleAuthErrors(error, 'login'))
        );
    }

    signup(data: Register) {
        return this.http.post(`${this.apiURL}register`, data).pipe(
            catchError((error) => this.handleAuthErrors(error, 'signup'))
        );
    }

    private handleAuthErrors(err: any, action: string) {
        console.log(err.error);
        switch (err.error) {
            case 'Incorrect password':
                return throwError('Password errata');
            case 'Cannot find user':
                return throwError('Utente non trovato');
            case 'Password is too short':
                return throwError('La password è troppo breve');
            case 'Email format is invalid':
                return throwError('Inserire una email valida');
            default:
                if (action === 'signup' && err.error === 'Email already exists') {
                    return throwError('Utente già presente');
                }
                return throwError('Errore nella chiamata');
        }
    }

    logout() {
        this.authSub.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    restore() {
        const userJson = localStorage.getItem('user');
        if (!userJson) {
            return;
        }
        const user: AuthData = JSON.parse(userJson);
        this.authSub.next(user);
    }

   /*  errors(err: any) {
        console.log(err.error);
        switch (err.error) {
            case 'Email already exists':
                return throwError('utente già presente');
                break;

            case 'Incorrect password':
                return throwError('Password errata');
                break;

            case 'Cannot find user':
                return throwError('Utente non trovato');
                break;
            case 'Password is too short':
                return throwError('La password è troppo breve');
                break;
                case 'Email format is invalid':
                    return throwError('Inserire una email valida');
                    break;

            default:
                return throwError('Errore nella chiamata');
                break;
        }
    } */
}