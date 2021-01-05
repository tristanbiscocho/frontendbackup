import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
} from "@angular/material";
import { TranslateModule } from "@ngx-translate/core";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseSidebarModule } from "@fuse/components";
import { MailComponent } from "./mail.component";
import { MailListComponent } from "./mail-list/mail-list.component";
import { MailListItemComponent } from "./mail-list/mail-list-item/mail-list-item.component";
import {
    MailDetailsComponent,
    SafeHtmlPipe,
} from "./mail-details/mail-details.component";
import { MailMainSidebarComponent } from "./sidebars/main/main-sidebar.component";
import { MailComposeDialogComponent } from "./dialogs/compose/compose.component";
import { MailService } from "./mail.service";
import { LanguageChangeModule } from "app/shared/language-change/language-change.module";

const routes: Routes = [
    {
        path: "",
        component: MailComponent,
        resolve: {
            mail: MailService,
        },
    },
];
@NgModule({
    declarations: [
        MailComponent,
        MailListComponent,
        MailListItemComponent,
        MailDetailsComponent,
        MailMainSidebarComponent,
        MailComposeDialogComponent,
        SafeHtmlPipe,
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        RouterModule,
        TranslateModule,
        FuseSharedModule,
        LanguageChangeModule,
        FuseSidebarModule,
    ],
    providers: [MailService],
    entryComponents: [MailComposeDialogComponent],
})
export class MailModule {}
