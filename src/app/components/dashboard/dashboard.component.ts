import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {UserService} from '../../service/user.service';
import {catchError, map, Observable, of, Subscription} from 'rxjs';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {CandidatureService} from "../../service/candidature.service";
import {Candidature} from "../../model/candidature";
import {AuthService} from "../../service/authService";
import {User} from "../../model/user";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    candidaturesEnAttente: Candidature[] = [];
    nbrEnAttente: number;
    nbrEnCours: number;
    nbrAccepte: number;
    nbrRejete: number;
    user = JSON.parse(localStorage.getItem('user')) as User;
    subscription!: Subscription;

    constructor(private candidatureService: CandidatureService,
                private authService: AuthService,
                public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
        });
    }

    ngOnInit() {
        if(this.user.typeUtilisateur=="Recruteur"){
            this.allCandidature();
        }else{
            this.candidaturesByUser(this.user);
        }
    }

    allCandidature(){
        this.loadCandidaturesByEtat('En attente').subscribe(
            (nombreCandidatures) => {
                this.nbrEnAttente= nombreCandidatures;
            }
        );
        this.loadCandidaturesByEtat('En cours').subscribe(
            (nombreCandidatures) => {
                this.nbrEnCours= nombreCandidatures;
            }
        );
        this.loadCandidaturesByEtat('Acceptée').subscribe(
            (nombreCandidatures) => {
                this.nbrAccepte= nombreCandidatures;
            }
        );
        this.loadCandidaturesByEtat('Rejetée').subscribe(
            (nombreCandidatures) => {
                this.nbrRejete= nombreCandidatures;
            }
        );
    }

    loadCandidaturesByEtat(etat: string): Observable<number> {
        return this.candidatureService.getCandidaturesByEtat(etat).pipe(
            map(data => data.length),
            catchError((error) => {
                console.error('Erreur', error);
                return of(0); // En cas d'erreur, retourne 0 candidature
            })
        );
    }

    candidaturesByUser(idUser:User){
        this.loadCandidaturesByEtatAndUser('En attente',idUser).subscribe(
            (nombreCandidatures) => {
                this.nbrEnAttente= nombreCandidatures;
            }
        );
        this.loadCandidaturesByEtatAndUser('En cours',idUser).subscribe(
            (nombreCandidatures) => {
                this.nbrEnCours= nombreCandidatures;
            }
        );
        this.loadCandidaturesByEtatAndUser('Acceptée',idUser).subscribe(
            (nombreCandidatures) => {
                this.nbrAccepte= nombreCandidatures;
            }
        );
        this.loadCandidaturesByEtatAndUser('Rejetée',idUser).subscribe(
            (nombreCandidatures) => {
                this.nbrRejete= nombreCandidatures;
            }
        );
    }

    loadCandidaturesByEtatAndUser(etat: string, idUser:User): Observable<number> {
        return this.candidatureService.getCandidaturesByEtatAndUser(etat,idUser).pipe(
            map(data => data.length),
            catchError((error) => {
                console.error('Erreur', error);
                return of(0); // En cas d'erreur, retourne 0 candidature
            })
        );
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
