import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyTicketsComponent } from "./my-tickets/my-tickets.component";
import { AddTicketComponent } from "./add-ticket/add-ticket.component";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TextMaskModule } from "angular2-text-mask";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { ToastModule } from "primeng/toast";
import { QuillEditorModule } from "app/shared/quill-editor/quill-editor.module";
import { QuillModule } from "ngx-quill";
import { TicketingService } from "./ticket.service";

const routes: Routes = [
    {
        path: "",
        component: MyTicketsComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        NgxDatatableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatStepperModule,
        MatOptionModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatCardModule,
        LayoutModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatTabsModule,
        TranslateModule.forRoot(),
        InternationalPhoneNumberModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        MatTooltipModule,
        TextMaskModule,
        QuillEditorModule,
    ],
    declarations: [
        MyTicketsComponent,
        AddTicketComponent,
        TicketDetailComponent,
    ],
    providers: [TicketingService],
    entryComponents: [AddTicketComponent],
})
export class TicketsModule {}
