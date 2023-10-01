import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AddEditUsersComponent} from "./add-edit-users/add-edit-users.component";
import {ListUsersComponent} from "./liste-users/list-users.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'liste-users', component: ListUsersComponent },
        { path: 'liste-users/add', component: AddEditUsersComponent },
        { path: 'liste-users/edit/:id', component: AddEditUsersComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
