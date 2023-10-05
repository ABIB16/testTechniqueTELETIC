import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/service/user.service';
import {User} from "../../../model/user";

@Component({
    templateUrl: './list-users.component.html',
})
export class ListUsersComponent implements OnInit {

    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    users: User[] = [];
    user = JSON.parse(localStorage.getItem('user')) as User;

    currerntUserId : number;
    rowsPerPageOptions = [5, 10, 20];

    constructor(private userService: UserService, private messageService: MessageService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(){
        this.userService.getUsers().subscribe(data => this.users = data);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.userService.deleteUser(this.currerntUserId).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'L utilisateur a été supprimé avec succès', life: 3000 });
                this.getUsers();
            },
            error: console.log,
        });
    }

    delete(id: number,user: User) {
        this.deleteProductDialog = true;
        this.currerntUserId = id;
        this.user = user;
    }
}
