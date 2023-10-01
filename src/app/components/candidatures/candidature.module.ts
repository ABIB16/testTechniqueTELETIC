import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatureRoutingModule } from './candidature-routing.module';
import { AddCandidatureComponent } from './add-candidature/add-candidature.component';
import {ListCandidatureComponent} from "./liste-candidatures/list-candidature.component";
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {UsersRoutingModule} from "../utilisateurs/users-routing.module";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {EditCandidatureComponent} from "./edit-candidature/edit-candidature.component";
import {FileUploadModule} from "primeng/fileupload";

@NgModule({
    declarations: [ListCandidatureComponent,AddCandidatureComponent,EditCandidatureComponent],
    imports: [
        CommonModule,
        CandidatureRoutingModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule,
        DialogModule,
        TableModule,
        ToolbarModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule
    ]
})
export class CandidatureModule { }
