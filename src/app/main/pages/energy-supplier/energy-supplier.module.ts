import { EnergySupplierService } from "./energy-supplier.service";
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
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ManageProfileFormDialogComponent } from "./edit-profile/edit-profile.component";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { EnergySupplierComponent } from "./energy-supplier.component";
import { LoaderService } from "app/main/services/loader.service";

const routes = [
    {
        path: "",
        component: EnergySupplierComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [EnergySupplierComponent, ManageProfileFormDialogComponent],
    imports: [
        RouterModule.forChild(routes),
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
        CommonModule,
        TranslateModule.forRoot(),
        RouterModule,
        HttpClientModule,
        InternationalPhoneNumberModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        MatTooltipModule,
    ],
    exports: [EnergySupplierComponent],
    entryComponents: [ManageProfileFormDialogComponent],
    providers: [EnergySupplierService, LoaderService],
})
export class EnergySupplierModule {}
