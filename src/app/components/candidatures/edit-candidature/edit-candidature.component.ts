import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {CandidatureService} from "../../../service/candidature.service";
import {DatePipe} from "@angular/common";
import {User} from "../../../model/user";
import {AuthService} from "../../../service/authService";

@Component({
    selector: 'app-add-users',
    templateUrl: './edit-candidature.component.html',
})
export class EditCandidatureComponent implements OnInit {

    candidatureForm!: FormGroup;
    isSubmitted = false;
    addEditMode = false;
    currentCandidatureId!: number;
    user = JSON.parse(localStorage.getItem('user')) as User;

    constructor(private fb: FormBuilder,
                private candidatureService: CandidatureService,
                private messageService: MessageService,
                private datePipe: DatePipe,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.initForm();
        this.checkEditMode();
    }

    private initForm() {
        this.candidatureForm = this.fb.group({
            poste: ['', Validators.required],
            dateSoumission: [],
            etat: ['', Validators.required],
            cv: [''],
            userId: [null, Validators.required]
        });
    }


    private checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.addEditMode = true;
                this.currentCandidatureId = params['id'];
                this.loadCandidature();
            }
        });
    }

    loadCandidature() {
        this.candidatureService.getCandidatureById(this.currentCandidatureId).subscribe((user) => {
            this.candidatureForm.patchValue(user);
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

            this.candidatureService.updateCandidature(this.currentCandidatureId, this.candidatureForm.value).subscribe({
                next: (val: any) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Information',
                        detail: 'La candidature  ' + this.candidatureForm.value.userId.nom+" "+this.candidatureForm.value.userId.prenom + ' à été modifiée avec succès',
                        life: 3000
                    });
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
    }


}
