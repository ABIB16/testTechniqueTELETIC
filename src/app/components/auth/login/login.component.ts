import {Component, OnInit} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/authService";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    password!: string;
    loginForm: FormGroup;

    constructor(public layoutService: LayoutService,
                private fb: FormBuilder, private authService: AuthService,
                private router: Router) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm() {
        this.loginForm = this.fb.group({
            nomUtilisateur: ['', Validators.required],
            motDePasse: ['', Validators.required],
        });
    }
    onLogin() {
        if (this.loginForm.valid) {
            const username = this.loginForm.value.nomUtilisateur;
            const password = this.loginForm.value.motDePasse;
            this.authService.login(username, password).subscribe(
                success => {
                    if (success) {
                        this.router.navigate(['/dashboard']);
                    } else {
                        alert('Authentification échouée. Veuillez vérifier vos informations.');
                    }
                },
                error => {
                    console.error('Erreur lors de l\'authentification :', error);
                    alert('Erreur lors de l\'authentification. Veuillez réessayer.');
                }
            );
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    }


}
