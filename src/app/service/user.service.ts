import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {User} from "../model/user";

@Injectable()
export class UserService {

    private apiUrl = 'http://localhost:3000/userData';

    constructor(private http: HttpClient) { }

    // Vérifier si le nom d'utilisateur existe déjà
    loginExist(login: string): Observable<boolean> {
        return this.http.get<any[]>(`${this.apiUrl}?nomUtilisateur=${login}`)
            .pipe(
                map(users => users.length > 0)
            );    }


    getUsers(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getUserById(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${userId}`);
    }

    createUser(user: any): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }

    updateUser(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }


}
