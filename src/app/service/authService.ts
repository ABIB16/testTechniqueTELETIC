import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserService} from "./user.service";
import {User} from "../model/user";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

 /*   login(username: string, password: string) {
        return this.http.get<any[]>(`http://localhost:3000/userData?nomUtilisateur=${username}&motDePasse=${password}`);
    }*/

    login(login: string, password: string): Observable<boolean> {
        return this.http.get(`http://localhost:3000/userData?nomUtilisateur=${login}&motDePasse=${password}`)
            .pipe(
                map((response: any[]) => {
                    if (response.length > 0) {
                        const user = response[0];
                        localStorage.setItem('user', JSON.stringify(user));
                        return true; // Authentification réussie
                    }
                    return false; // Authentification échouée
                })
            );
    }


}
