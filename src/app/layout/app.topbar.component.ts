import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {AuthService} from "../service/authService";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    fullname: string | null = null;
    user = JSON.parse(localStorage.getItem('user')) as User;


    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
                private authService: AuthService,
                private router :Router) { }

    ngOnInit() {
        this.fullname = this.user.nom+ " "+this.user.prenom;
    }

    disconnect() {
        this.router.navigate(['/']);
    }
}
