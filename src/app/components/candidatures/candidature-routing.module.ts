import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ListCandidatureComponent} from "./liste-candidatures/list-candidature.component";
import {AddEditUsersComponent} from "../utilisateurs/add-edit-users/add-edit-users.component";
import {AddCandidatureComponent} from "./add-candidature/add-candidature.component";
import {EditCandidatureComponent} from "./edit-candidature/edit-candidature.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'liste-candidatures',component: ListCandidatureComponent },
        { path: 'liste-candidatures/add',component: AddCandidatureComponent },
        { path: 'liste-candidatures/edit/:id', component: EditCandidatureComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CandidatureRoutingModule { }
