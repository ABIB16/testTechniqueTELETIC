import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CandidatureService} from "../../../service/candidature.service";
import {DatePipe} from "@angular/common";
import {AuthService} from "../../../service/authService";
import {User} from "../../../model/user";
import {UploadEvent} from "primeng/fileupload";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-candidature.component.html',
})
export class AddCandidatureComponent implements OnInit {

    candidatureForm!: FormGroup;
    isSubmitted = false;
    addEditMode = false;
    currentCandidatureId!: number;
    user = JSON.parse(localStorage.getItem('user')) as User;

    constructor(private fb: FormBuilder,
                private candidatureService: CandidatureService,
                private messageService: MessageService,
                private datePipe: DatePipe,
                private route: ActivatedRoute,
                private router: Router
    ) {

    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        const today = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.candidatureForm = this.fb.group({
            userId: [this.user, Validators.required],
            poste: ['', Validators.required],
            dateSoumission: [today],
            etat: ['En attente'],
            cv: [''],
        });
    }

    get validationForm() {
        return this.candidatureForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.candidatureForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez saisir les champs obligatoires',
                life: 3000
            });
            return;
        }

            this.candidatureService.createCandidature(this.candidatureForm.value).subscribe({
                next: (val: any) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Information',
                        detail: 'Votre candidature à été créé avec succès',
                        life: 3000
                    });
                    this.viderChamps();
                    this.isSubmitted = false;
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
        this.router.navigate(['/dashboard/candidatures/liste-candidatures']);

    }

    viderChamps() {
        this.candidatureForm.get('poste')?.reset('');
    }

    onFileSelect(event: any) {
        if (event.files.length > 0) {
            this.candidatureForm.value.cv = event.files[0].name;
        }
    }

}
