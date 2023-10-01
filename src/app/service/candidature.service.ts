import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable()
export class CandidatureService {

    private apiUrl = 'http://localhost:3000/candidatureData';

    constructor(private http: HttpClient) { }


    getCandidatures(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getCandidatureById(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${userId}`);
    }

    createCandidature(candidature: any): Observable<any> {
        return this.http.post(this.apiUrl, candidature);
    }

    updateCandidature(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    deleteCandidature(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getCandidaturesByUserId(userId: User): Observable<any> {
        return this.http.get(`${this.apiUrl}?userId.id=${userId.id}`);
    }


    // Récupérer toutes les candidatures par état
    getCandidaturesByEtat(etat: string): Observable<any> {
        return this.http.get(`${this.apiUrl}?etat=${etat}`);
    }

    // Récupérer toutes les candidatures par utilisateur /état
    getCandidaturesByEtatAndUser(etat: string,userId: User): Observable<any> {
        return this.http.get(`${this.apiUrl}?etat=${etat}&userId.id=${userId.id}`);
    }


}
