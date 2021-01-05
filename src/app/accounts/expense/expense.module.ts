import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

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
import { ClientsComponent } from "./clients/clients.component";
import { AddClientsComponent } from "./add-clients/add-clients.component";
import { ClientsService } from "./clients.service";
import { CreateComponent } from "./create/create.component";
import { CommissionComponent } from "./commission/commission.component";
import { ClientsDataService } from "./services/client.service";
import { DetailsComponent } from "./details/details.component";
import { InvoiceComponent } from "./invoice/invoice.component";


const routes: Routes = [
    {
        path: "",
        component: ClientsComponent,
    },
    {
        path: "create",
        component: CreateComponent,
    },
    {
        path: "details",
        component: DetailsComponent,
    },
    {
        path: "invoice",
        component: InvoiceComponent,
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
    ],
    declarations: [ClientsComponent, AddClientsComponent,CreateComponent,CommissionComponent,DetailsComponent,InvoiceComponent],
    providers: [ClientsService,ClientsDataService],
    entryComponents: [AddClientsComponent],
})
export class ExpenseAccountsModule {}
