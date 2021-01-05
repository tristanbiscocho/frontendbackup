import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FuseSharedModule } from "@fuse/shared.module";

import { InvoiceService } from "app/main/pages/invoices/invoice.service";
import { InvoiceModernComponent } from "app/main/pages/invoices/modern/modern.component";
import { MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { CommonModule } from "@angular/common";

const routes = [
    {
        path: "",
        component: InvoiceModernComponent,
        resolve: {
            search: InvoiceService,
        },
    },
    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [InvoiceModernComponent],
    imports: [
        RouterModule.forChild(routes),
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
    providers: [InvoiceService],
})
export class InvoiceModernModule {}
