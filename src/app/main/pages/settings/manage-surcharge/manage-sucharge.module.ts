import { MatTableModule } from '@angular/material/table';
import { ToastModule } from 'primeng/toast';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ManageSurchargeComponent } from "./manage-surcharge.component";
import { MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTabsModule } from "@angular/material";
import { CommonModule } from "@angular/common";
import { SettingsService } from '../settings.service';

const routes = [
    {
        path: "",
        component: ManageSurchargeComponent,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [ManageSurchargeComponent],
    imports: [
        RouterModule.forChild(routes),
        NgxDatatableModule,
        MatTableModule,
        MatTabsModule,
        FuseSharedModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule,
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        MatCardModule,
        ToastModule
    ],
    providers: [SettingsService],
})
export class ManageSuchargeModule {}
