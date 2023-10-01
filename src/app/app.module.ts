import { NgModule } from '@angular/core';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { UserService } from './service/user.service';
import {MessageService} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./service/authService";
import {CandidatureService} from "./service/candidature.service";
import {NotfoundComponent} from "./components/notfound/notfound.component";


@NgModule({
    declarations: [
        AppComponent,NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule


    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        UserService,
        AuthService,
        CandidatureService,
        MessageService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
