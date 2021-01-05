import { PartnerService } from './../partner/partner.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { NotInterestedCustomers } from "./not-interested-customers.component";
import { MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { CommonModule } from "@angular/common";

const routes = [
    {
        path: "",
        component: NotInterestedCustomers,
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [NotInterestedCustomers],
    imports: [
        RouterModule.forChild(routes),
        NgxDatatableModule,
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
    ],
    providers: [PartnerService],
})
export class NotIntrestedCustomersModule {}
