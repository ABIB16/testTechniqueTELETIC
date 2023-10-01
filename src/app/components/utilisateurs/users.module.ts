import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';
import {ToastModule} from "primeng/toast";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListUsersComponent} from "./liste-users/list-users.component";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";

@NgModule({
    declarations: [AddEditUsersComponent,ListUsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
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
        InputNumberModule,
        InputMaskModule
    ]
})
export class UsersModule { }
