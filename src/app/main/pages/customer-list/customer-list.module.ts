import { SupplierService } from "./../supplier/supplier.service";
import { MessageService } from "primeng/components/common/messageservice";
import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { LayoutModule } from "app/layout/layout.module";
import {
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
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CustomerListComponent } from "./customer-list.component";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputMaskModule } from "primeng/inputmask";
import { CustomerService } from "./customer-list.service";
import { ToastModule } from "primeng/toast";
import { CustomerInformationComponent } from "./customer-information/customer-information.component";
import {
    MessageViewerComponent,
    SafeHtmlPipe,
} from "./customer-information/message-viewer/message-viewer.component";

const routes: Routes = [
    {
        path: "",
        component: CustomerListComponent,
    },
    {
        path:
            "customer-information/:userId/:customerId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        component: CustomerInformationComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        CustomerListComponent,
        ManageProfileFormDialogComponent,
        CustomerInformationComponent,
        MessageViewerComponent,
        SafeHtmlPipe,
    ],
    imports: [
        NgxDatatableModule,
        RouterModule.forChild(routes),
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
        CommonModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        InternationalPhoneNumberModule,
        FormsModule,
        MatTooltipModule,
        InputMaskModule,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
    ],
    exports: [CustomerListComponent],
    entryComponents: [ManageProfileFormDialogComponent, MessageViewerComponent],
    providers: [CustomerService, MessageService, SupplierService],
})
export class CustomerListModule {}
