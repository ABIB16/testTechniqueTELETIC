import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {UserService} from 'src/app/service/user.service';
import {User} from "../../../model/user";
import {CandidatureService} from "../../../service/candidature.service";
import {Candidature} from "../../../model/candidature";
import {AuthService} from "../../../service/authService";

@Component({
    templateUrl: './list-candidature.component.html',
})
export class ListCandidatureComponent implements OnInit {

    deleteProductDialog: boolean = false;

    candidatures: Candidature[] = [];
    candidature: Candidature;
    currerntCandidatureId: number;
    user = JSON.parse(localStorage.getItem('user')) as User;
    rowsPerPageOptions = [5, 10, 20];

    constructor(private candidatureService: CandidatureService,
             //   private authService: AuthService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        if (this.user.typeUtilisateur == "Employé") {
            this.loadCandidaturesById();
        } else {
            this.getCandidatures();
        }
    }

    loadCandidaturesById() {
        this.candidatureService.getCandidaturesByUserId(this.user).subscribe(
            (data) => {
                this.candidatures = data;
            },
            (error) => {
                console.error('Erreur lors de la récupération des candidatures :', error);
            }
        );
    }

    getCandidatures() {
        this.candidatureService.getCandidatures().subscribe(data => this.candidatures = data);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.candidatureService.deleteCandidature(this.currerntCandidatureId).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'L utilisateur a été supprimé avec succès',
                    life: 3000
                });
                this.getCandidatures();
            },
            error: console.log,
        });
    }

    delete(id: number, candidature: Candidature) {
        this.deleteProductDialog = true;
        this.currerntCandidatureId = id;
        this.candidature = candidature;
    }
}
