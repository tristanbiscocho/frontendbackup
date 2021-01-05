import { NgModule } from "@angular/core";
// import { MeterReadingComponent } from "./meter-reading.component";
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
import { TypeOfHomeComponent } from "./type-of-home.component";
import { TypeOfHomeProfileFormDialogComponent } from "./type-of-home-profile/type-of-home-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { systemenumService } from "../systemenumdata/systemenum.service";
import { SettingsService } from "../settings/settings.service";

const routes: Routes = [
    {
        path: "",
        component: TypeOfHomeComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [TypeOfHomeComponent, TypeOfHomeProfileFormDialogComponent],
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
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        MatTooltipModule,
    ],
    exports: [TypeOfHomeComponent],
    entryComponents: [TypeOfHomeProfileFormDialogComponent],
    providers: [systemenumService,SettingsService],
})
export class TypeOfHomeModule {}
