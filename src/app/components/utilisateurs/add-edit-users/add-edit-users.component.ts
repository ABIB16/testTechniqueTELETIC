import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../model/user";

@Component({
    selector: 'app-add-users',
    templateUrl: './add-edit-users.component.html',
    styleUrls: ['./add-edit-users.component.scss'],
})
export class AddEditUsersComponent implements OnInit {

    inscriptionForm!: FormGroup;
    isSubmitted = false;
    addEditMode = false;
    currentUserId!: number;

    constructor(private fb: FormBuilder,
                private userService: UserService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private router : Router) {

    }

    ngOnInit(): void {
        this.initForm();
        this.checkEditMode();
    }

    private initForm() {
        this.inscriptionForm = this.fb.group({
            nomUtilisateur: ['', Validators.required],
            motDePasse: ['', Validators.required],
            confirmMdp: ['', Validators.required],
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            numeroTelephone: ['', Validators.required],
            typeUtilisateur: ['', Validators.required]
        });
    }

    private checkEditMode() {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.addEditMode = true;
                console.log("" + this.addEditMode)
                this.currentUserId = params['id'];
                this.loadUser();
            }
        });
    }

    loadUser() {
        this.userService.getUserById(this.currentUserId).subscribe((user) => {
            this.inscriptionForm.patchValue(user);
        });
    }

    get validationForm() {
        return this.inscriptionForm.controls;
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.inscriptionForm.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez saisir les champs obligatoires',
                life: 3000
            });
            return;
        }

        if (this.inscriptionForm.valid) {
            const password = this.inscriptionForm.get('motDePasse').value;
            const confirmPassword = this.inscriptionForm.get('confirmMdp').value;

            if (!this.addEditMode) {
                this.userService.loginExist(this.inscriptionForm.value.nomUtilisateur).subscribe(
                    (exists) => {
                        if (exists) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Avertissement',
                                detail: 'Login  ' + this.inscriptionForm.value.nomUtilisateur + ' existe deja',
                                life: 3000
                            });
                        } else {
                            if (password != confirmPassword) {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Avertissement',
                                    detail: 'Les mots de passe ne correspondent pas.',
                                    life: 3000
                                });
                            } else {
                                this.userService.createUser(this.inscriptionForm.value).subscribe({
                                    next: (val: any) => {
                                        this.messageService.add({
                                            severity: 'success',
                                            summary: 'Information',
                                            detail: 'L utilisateur  ' + this.inscriptionForm.value.nom + '  ' + this.inscriptionForm.value.prenom + ' à été créé avec succès',
                                            life: 3000
                                        });
                                        this.inscriptionForm.reset();
                                        this.isSubmitted = false;


                                    },
                                    error: (err: any) => {
                                        console.error(err);
                                    },
                                });
                                this.router.navigate(['/dashboard/utilisateurs/liste-users']);
                            }
                        }
                    },
                    (error) => {
                        console.error('Erreur lors de la vérification du nom d\'utilisateur :', error);
                    }
                );


            } else {
                if (password != confirmPassword) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Avertissement',
                        detail: 'Les mots de passe ne correspondent pas.',
                        life: 3000
                    });
                } else {
                    this.userService.updateUser(this.currentUserId, this.inscriptionForm.value).subscribe({
                        next: (val: any) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Information',
                                detail: 'L utilisateur  ' + this.inscriptionForm.value.nom + '  ' + this.inscriptionForm.value.prenom + ' à été modifié avec succès',
                                life: 3000
                            });
                        },
                        error: (err: any) => {
                            console.error(err);
                        },
                    });
                    this.router.navigate(['/dashboard/utilisateurs/liste-users']);
                }
            }
        }
    }

}
