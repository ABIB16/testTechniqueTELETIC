import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Utilisateurs',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/dashboard/utilisateurs/liste-users']
                    },
                    {
                        label: 'Candidatures',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/dashboard/candidatures/liste-candidatures']
                    }
                ]
            }
        ];
    }
}
