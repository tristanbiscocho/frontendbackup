import { MatSelectModule } from "@angular/material/select";
import { QuillEditorModule } from "./../../../shared/quill-editor/quill-editor.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TicketingService } from "./../tickets/ticket.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuseSharedModule } from "@fuse/shared.module";
import { ChartsModule } from "ng2-charts";

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
} from "@angular/material";
import { AdminTicketsDashboardComponent } from "./admin-tickets-dashboard/admin-tickets-dashboard.component";
import { TicketsAdminListComponent } from "./tickets-admin-list/tickets-admin-list.component";
import { TicketAssignAgentComponent } from "./ticket-assign-agent/ticket-assign-agent.component";
import { AddTicketAdminComponent } from "./add-ticket-admin/add-ticket-admin.component";
import { ToastModule } from "primeng/toast";
import { LayoutModule } from "@angular/cdk/layout";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { TextMaskModule } from "angular2-text-mask";
import { InternationalPhoneNumberModule } from "ngx-international-phone-number";
import { InputMaskModule } from "primeng/inputmask";
import { AgentService } from "../agent/agent.service";
import { CustomerService } from "../customer-list/customer-list.service";
import { AdminTicketDetailComponent } from "./admin-ticket-detail/admin-ticket-detail.component";
import { TicketsHistoryComponent } from "./tickets-history/tickets-history.component";
import { AddKnowledgeBaseComponent } from "./add-knowledge-base/add-knowledge-base.component";
import { AddReportsComponent } from "./add-reports/add-reports.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                path: "",
                component: AdminTicketsDashboardComponent,
            },
            {
                path: "add-ticket",
                component: AddTicketAdminComponent,
            },
            {
                path: "add-ticket/:id",
                component: AddTicketAdminComponent,
            },
            {
                path: "all-tickets",
                component: TicketsAdminListComponent,
            },
            {
                path: "all-tickets/:status",
                component: TicketsAdminListComponent,
            },
            {
                path: "view-ticket-detail/:id",
                component: AdminTicketDetailComponent,
            },
            {
                path: "add-knowledgebase",
                component: AddKnowledgeBaseComponent,
            },
            {
                path: "add-knowledgebase/:id",
                component: AddKnowledgeBaseComponent,
            },
            {
                path: "add-report",
                component: AddReportsComponent,
            },
            {
                path: "add-report/:id",
                component: AddReportsComponent,
            },
        ],
    },

    {
        path: "**",
        redirectTo: "login",
    },
];

@NgModule({
    declarations: [
        AdminTicketsDashboardComponent,
        AddTicketAdminComponent,
        TicketAssignAgentComponent,
        TicketsAdminListComponent,
        AdminTicketDetailComponent,
        TicketsHistoryComponent,
        AddKnowledgeBaseComponent,
        AddReportsComponent,
    ],
    imports: [
        FuseSharedModule,
        ChartsModule,
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
    providers: [TicketingService, AgentService, CustomerService],
    exports: [AdminTicketsDashboardComponent],
    entryComponents: [TicketAssignAgentComponent, TicketsHistoryComponent],
})
export class AdminTicketsDashboardModule {}
