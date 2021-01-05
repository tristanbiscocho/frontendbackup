import { AppComponent } from "app/app.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// fuse theme Modules Imports
import {
    FuseConfirmDialogModule,
    FuseProgressBarModule,
} from "@fuse/components";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";
import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import { fuseConfig } from "app/fuse-config";
// Layout Module Import For UI
import { GetAllDetailsResolver } from "./main/pages/Authentication/login/login.service";
import { VerticalLayout1Module } from "./layout/vertical/layout-1/layout-1.module";
import { AppRoutingModule } from "./app.routing.module";
import { ServicesModule } from "./main/services/services.module";
import { SystemEnumDataModule } from "./main/pages/systemenumdata/systemenumdata.module";
import { AuthGuard } from "./main/services/auth.guard";
import { AuthIntersaptors } from "./main/services/auth.interceptor";
import { ToastModule } from 'primeng/toast';
import { MatChipsModule, MatNativeDateModule } from "@angular/material";
import { MessageService } from "primeng/components/common/messageservice";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { VerticalLayout3Module } from "./layout/vertical/layout-3/layout-3.module";
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        FuseProgressBarModule,
        FuseConfirmDialogModule,
        VerticalLayout1Module,
        VerticalLayout3Module,
        FuseModule.forRoot(fuseConfig),
        TranslateModule.forRoot(),
        SystemEnumDataModule,
        MatChipsModule,
        InternationalPhoneNumberModule,
        ServicesModule,
        FuseSharedModule,
        MatNativeDateModule,
        ToastModule
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthGuard,
        MessageService,
        GetAllDetailsResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthIntersaptors,
            multi: true,
        },
    ],
})
export class AppModule {}
