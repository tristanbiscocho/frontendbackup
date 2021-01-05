import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard, NoAuthGuard } from "./main/services/auth.guard";
import { GetAllDetailsResolver } from "./main/pages/Authentication/login/login.service";
import { VerticalLayout1Component } from "./layout/vertical/layout-1/layout-1.component";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full",
    },
    
    // authentication Modules 
    {
        path: "login",
        loadChildren:
            "./main/pages/Authentication/login/login.module#LoginModule",
        resolve: {
            gelAllResourceData: GetAllDetailsResolver,
        },
    },
    {
        path: "staff-login",
        loadChildren:
            "./main/pages/Authentication/system-login/system-login.module#SystemLoginModule",
        // canActivate: [NoAuthGuard],
        resolve: {
            gelAllResourceData: GetAllDetailsResolver,
        },
    },
    {
        path: "master-login",
        loadChildren:
            "./main/pages/Authentication/system-login/system-login.module#SystemLoginModule",
        // canActivate: [NoAuthGuard],
        resolve: {
            gelAllResourceData: GetAllDetailsResolver,
        },
    },
    {
        path: "forgot-password",
        loadChildren:
            "./main/pages/Authentication/forgot-password/forgot-password.module#ForgotPasswordModule",
    },
    {
        path: "reset-password/:ID",
        loadChildren:
            "./main/pages/Authentication/reset-password/reset-password.module#ResetPasswordModule",
    },
    {
        path: "register",
        loadChildren:
            "./main/pages/Authentication/register/register.module#RegisterModule",
    },
    {
        path: "partner-register",
        loadChildren:
            "./main/pages/Authentication/partner-register/partner-register.module#PartnerSignupModule",
    },

    // Authentication Modules
    
    
    {
        path: "dashboard",
        canActivate: [AuthGuard],
        loadChildren: "./main/pages/dashboard/dashboard.module#DashboardModule",
    },
    {
        path: "supervisor-dashboard",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/supervisor-dashboard/supervisor-dashboard.module#SupervisorDashboardModule",
    },
    {
        path: "admin-dashboard",
        loadChildren:
            "./main/pages/admin-dashboard/admin-dashboard.module#AdminDahsboardModule",
        canActivate: [AuthGuard],
    },
    {
        path: "system-user",
        loadChildren:
            "./main/pages/system-user/system-user.module#SystemUserModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts",
        loadChildren:
            "./accounts/accounts-dashboard/accounts-dashboard.module#AccountsDashboardModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/clients",
        loadChildren:
            "./accounts/clients/clients.module#ClientstModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/promotion",
        loadChildren:
            "./accounts/promation/promation.module#PromationtModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/permission",
        loadChildren:
            "./accounts/role/permission.module#PermissionModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/sale-agent",
        loadChildren:
            "./accounts/sale-agent/sale-agent.module#SaleAgentsModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/suppliers",
        loadChildren:
            "./accounts/supplier/supplier.module#SupplierAccountsModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/staff",
        loadChildren:
            "./accounts/staff/staff.module#StaffAccountModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/partner",
        loadChildren:
            "./accounts/partner/partner.module#PartnerAccountsModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/switches",
        loadChildren:
            "./accounts/switches/switches.module#SwitchesAccountsModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/income",
        loadChildren:
            "./accounts/income/income.module#IncomeAccountsModule",
        canActivate: [AuthGuard],
    },
    {
        path: "accounts/expense",
        loadChildren:
            "./accounts/expense/expense.module#ExpenseAccountsModule",
        canActivate: [AuthGuard],
    },
    {
        path: "contractor-dashboard",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/contractor-dashboard/contractor-dashboard.module#ContractorDahsboardModule",
    },

    // meter-reading routes
    {
        path: "meter-reading",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/meter-reading/meter-reading.module#MeterReadingModule",
    },
    {
        path: "meter-reading/:CUSTOMERID/:ENERGYID",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/meter-reading/meter-reading.module#MeterReadingModule",
    },
    {
        path: "meter-reading/:CUSTOMERID/:ENERGYID/:USEROFFSET",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/meter-reading/meter-reading.module#MeterReadingModule",
    },

    // My Profile Routes
    {
        path: "my-profile/:CUSTOMERID",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/my-profile/my-profile.module#MyProfileModule",
    },
    {
        path: "my-profile/:CUSTOMERID/:USEROFFSET",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/my-profile/my-profile.module#MyProfileModule",
    },
    {
        path: "my-profile",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/my-profile/my-profile.module#MyProfileModule",
    },

    // customer-bills
    {
        path: "customer-bills/:OFFSET",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/customer-bills/cusromer-bills.module#CustomerBillModule",
    },

    // Admin customer-bills
    {
        path: "admin-customer-bill/:customerId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/admin-customer-bill/admin-customer-bill.module#AdminCustomerBillModule",
    },
    {
        path: "add-customer-bills/:customerId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/admin-customer-bill/admin-customer-bill.module#AdminCustomerBillModule",
    },
    {
        path: "add-customer-bills/:customerId/:billId",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/admin-customer-bill/admin-customer-bill.module#AdminCustomerBillModule",
    },

    // customer list modules
    {
        path: "customer-list/:OFFSET",
        canActivate: [AuthGuard],
        loadChildren:
            "./main/pages/customer-list/customer-list.module#CustomerListModule",
    },

    // switch history
    {
        path: "admin-switch-history/:userId",
        loadChildren:
            "./main/pages/admin-switch-history/admin-switch-history.module#AdminSwitchModule",
    },
    {
        path:
            "admin-switch-history/:userId/:customerId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        loadChildren:
            "./main/pages/admin-switch-history/admin-switch-history.module#AdminSwitchModule",
    },
    {
        path: "switch-history",
        loadChildren:
            "./main/pages/switch-history/switch-history.module#SwitchModule",
    },
    {
        path: "switch-history/:ID/:userId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        loadChildren:
            "./main/pages/switch-history/switch-history.module#SwitchModule",
    },
    {
        path:
            "create-switch-history/:userId/:customerId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        loadChildren:
            "./main/pages/create-switch-history/create-switch-history.module#CreateSwitchHistoryModule",
    },
    {
        path: "my-referrals",
        loadChildren:
            "./main/pages/my-referrals/my-referrals.module#MyReferralModule",
    },
    {
        path: "reff-Customer/:USERID/:userName/:FLAG",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "partner/:OFFSET",
        loadChildren: "./main/pages/partner/partner.module#PartnerModule",
    },
    {
        path: "partner-refferallist/:userId/:OFFSET",
        loadChildren:
            "./main/pages/partner-refferallist/partner-refferalist.module#PartnerRefferalListModule",
    },
    {
        path: "partner-detail",
        loadChildren:
            "./main/pages/partner-detail/partner-detail.module#PartnerDetailModule",
    },
    {
        path: "partner-detail/:PARTNERID/:PARTNEROFFSET/:OFFSET",
        loadChildren:
            "./main/pages/partner-detail/partner-detail.module#PartnerDetailModule",
    },
    {
        path: "partner-signup",
        loadChildren:
            "./main/pages/partner/partner-signup/partner-signup.module#PartnerRegisterModule",
    },
    {
        path: "supervisor-list/:OFFSET",
        loadChildren:
            "./main/pages/supervisor-list/supervisor-list.module#SupervisorModule",
    },
    {
        path: "supervisor-partners/:USERID/:OFFSET/:PAGEOFFSET",
        loadChildren:
            "./main/pages/supervisor-list/parners/supervisor-partner.module#SupervisorPartnersModule",
    },
    {
        path: "manage-supervisor-profile/:USERID/:OFFSET",
        loadChildren:
            "./main/pages/supervisor-list/manage-supervisor-profile/manage-supervisor.module#ManageSupervisorModule",
    },
    {
        path: "manage-supervisor-profile/:OFFSET",
        loadChildren:
            "./main/pages/supervisor-list/manage-supervisor-profile/manage-supervisor.module#ManageSupervisorModule",
    },
    {
        path: "supervisor-detail/:USERID/:OFFSET",
        loadChildren:
            "./main/pages/supervisor-list/supervisor-detail/supervisor-detail.module#SupervisorDetailModule",
    },
    {
        path: "admin-commission",
        loadChildren:
            "./main/pages/admin-commission/admin-commission.module#AdminCommissionModule",
    },
    {
        path: "admin-commission/:OFFSET",
        loadChildren:
            "./main/pages/admin-commission/admin-commission.module#AdminCommissionModule",
    },
    {
        path: "invoice-list/:OFFSET",
        loadChildren:
            "./main/pages/supervisor-list/invoice-list/invoice-list.module#InvoiceListModule",
    },

    {
        path: "all-customers/:OFFSET/:USERID/:FLAG/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "pending-customers/:OFFSET/:USERID/:FLAG/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "completed-customers/:OFFSET/:USERID/:FLAG/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "failed-customers/:OFFSET/:USERID/:FLAG/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "all-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "pending-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "completed-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path: "failed-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "all-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName/:ISPARTNER",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "pending-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName/:ISPARTNER",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "completed-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName/:ISPARTNER",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "failed-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName/:ISPARTNER",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "failed-customers/:OFFSET/:USERID/:FLAG/:supervisorId/:userName/:ISPARTNER",
        loadChildren:
            "./main/pages/partner/partner-customer/partner-customer.module#PartnerCustomerModule",
    },
    {
        path:
            "admin-added-credits/:CUSTOMERID/:CUSTOMEROFFSET/:PAGEOFFSET/:USERID",
        loadChildren:
            "./main/pages/admin-added-credits/admin-added-credits.module#AdminAddedCreditsModule",
    },
    {
        path: "admin-transactiondetails",
        loadChildren:
            "./main/pages/admin-transactiondetails/admin-transaction-details.module#AdminTransactionDetailsModule",
    },
    {
        path: "admin-refferallist",
        loadChildren:
            "./main/pages/admin-refferallist/admin-refferalist.module#AdminRefferalistModule",
    },
    {
        path: "admin-refferallist/:userId/:OFFSET/:CUSTOMERID",
        loadChildren:
            "./main/pages/admin-refferallist/admin-refferalist.module#AdminRefferalistModule",
    },
    // {
    //     path: "invoices/:INVOICEID/:PARTNERID",
    //     loadChildren:
    //         "./main/pages/invoices/modern/modern.module#InvoiceModernModule",
    // },
    {
        path: "invoices/:INVOICEID/:PARTNERID/:PAGEOFFSET",
        loadChildren:
            "./main/pages/invoices/modern/modern.module#InvoiceModernModule",
    },
    {
        path: "invoices/:BILLID/:CUSTOMERPAGEOFFSET/:PAGEOFFSET/:FLAG",
        loadChildren:
            "./main/pages/invoices/modern/modern.module#InvoiceModernModule",
    },
    {
        path: "invoices/:BILLID/:PAGEOFFSET",
        loadChildren:
            "./main/pages/invoices/modern/modern.module#InvoiceModernModule",
    },
    {
        path: "invoices",
        loadChildren:
            "./main/pages/invoices/modern/modern.module#InvoiceModernModule",
    },

    {
        path: "callback-customerlist",
        loadChildren:
            "./main/pages/callback-customerlist/callback-customerlist.module#CallBackCustomerListModule",
    },

    {
        path: "not-interested-customers",
        loadChildren:
            "./main/pages/not-interested-customers/not-intrested-customers.module#NotIntrestedCustomersModule",
    },
    {
        path: "manage-surcharge",
        loadChildren:
            "./main/pages/settings/manage-surcharge/manage-sucharge.module#ManageSuchargeModule",
    },

    {
        path: "meterreadingforreason",
        loadChildren:
            "./main/pages/meter-reading-for-reason/meter-reading-for-reason-module#MeterReadingForReasonModule",
    },

    {
        path: "settings",
        loadChildren: "./main/pages/settings/settings.module#SettingsModule",
    },
    {
        path: "manage-fixed-cost",
        loadChildren:
            "./main/pages/settings/manage-fixed-cost/managed-fixed-cost.module#ManagedFixedCostModule",
    },

    {
        path: "manage-unit-price",
        loadChildren:
            "./main/pages/settings/manage-unit-price/manage-unit-price.module#ManageUnitPriceModule",
    },

    {
        path: "settings-package",
        loadChildren:
            "./main/pages/settings-package/settings-package.module#SettingsPackageModule",
    },
    {
        path: "type-of-home",
        loadChildren:
            "./main/pages/type-of-home/type-of-home.module#TypeOfHomeModule",
    },

    {
        path: "pages/configurations/systemenumdata",
        loadChildren:
            "./main/pages/systemenumdata/systemenumdata.module#SystemEnumDataModule",
    },

    {
        path: "supplier/:OFFSET",
        loadChildren: "./main/pages/supplier/supplier.module#SupplierModule",
    },
    {
        path: "plan",
        loadChildren: "./main/pages/plan/plan.module#PlanModule",
    },
    {
        path: "template-add",
        loadChildren:
            "./main/pages/template-add/template-add.module#TemplateAddModule",
    },
    {
        path: "template-add/:ID",
        loadChildren:
            "./main/pages/template-add/template-add.module#TemplateAddModule",
    },
    {
        path: "supplier-settings",
        loadChildren:
            "./main/pages/supplier-dashboard/supplier-dashboard.module#SupplierDahsboardModule",
    },
    {
        path: "payment-status/:CUSTOMERID/:OFFSET",
        loadChildren:
            "./main/pages/payment-status/payment-status.module#PaymentStatusModule",
    },
    {
        path: "logger-audit",
        loadChildren:
            "./main/pages/logger-audit/logger-audit.module#LoggerAuditModule",
    },

    {
        path: "partner-add-customer",
        loadChildren:
            "./main/pages/partner-add-customer/partner-add-customer.module#PartnerAddCustomerModule",
    },

    
    {
        path: "customeremail-verification",
        loadChildren:
            "./main/pages/customeremail-verification/customeremail-verification.module#CustomerEmailVerificationModule",
    },
    {
        path: "customer-pendinglist",
        loadChildren:
            "./main/pages/customer-pendinglist/customer-pendinglist.module#CustomerPendingListModule",
    },
    {
        path: "customer-pendingSignup",
        loadChildren:
            "./main/pages/customer-pendingSignup/customer-pendingSignup.module#CustomerPendingSignupModule",
    },
    {
        path: "customer-rejected",
        loadChildren:
            "./main/pages/customer-rejected/customer-rejected.module#CustomerRejectedModule",
    },

    {
        path: "energy-type",
        loadChildren:
            "./main/pages/energy-type/energy-type.module#EnergyTypeModule",
    },
    {
        path: "tariff-type",
        loadChildren:
            "./main/pages/tariff-type/tariff-type.module#TariffTypeModule",
    },
    {
        path: "energy-supplier",
        loadChildren:
            "./main/pages/energy-supplier/energy-supplier.module#EnergySupplierModule",
    },
    {
        path: "supplier-detail",
        loadChildren:
            "./main/pages/supplier-detail/supplier-detail.module#SupplierDetailModule",
    },
    {
        path: "payment-method",
        loadChildren:
            "./main/pages/payment-method/payment-method.module#PaymentMethodModule",
    },
    {
        path: "supplier-detail/:SupplierId/:SUPPLIEROFFSET/:OFFSET",
        loadChildren:
            "./main/pages/supplier-detail/supplier-detail.module#SupplierDetailModule",
    },

    {
        path:
            "customer-payment-request/:BILLID/:customerId/:CUSTOMERPAGEOFFSET/:PAGEOFFSET",
        loadChildren:
            "./main/pages/customer-payment-request/customer-payment-request.module#CustomerPaymentRequestModule",
    },

    {
        path: "direct-debit-redirect/:ID",
        loadChildren:
            "./main/pages/direct-debit-redirect/direct-debit.module#DirectDebitModule",
    },

    {
        path: "pages/workflows",
        loadChildren: "./main/pages/workflows/workflows.module#workflowsModule",
    },
    {
        path: "pages/add-workflow",
        loadChildren:
            "./main/pages/workflows/add-workflow/add-workflow.module#AddWorkflowModule",
    },
    {
        path: "pages/add-workflow/:ID",
        loadChildren:
            "./main/pages/workflows/add-workflow/add-workflow.module#AddWorkflowModule",
    },
    {
        path: "pages/add-workflow/:ID/:For",
        loadChildren:
            "./main/pages/workflows/add-workflow/add-workflow.module#AddWorkflowModule",
    },
    {
        path: "Support",
        loadChildren: "./main/pages/support/support.module#SupportModule",
    },
    // ticketing system
    {
        path:"admin-tickets-dashboard",
        loadChildren: "./main/pages/admin-tickets-dashboard/admin-tickets-dashboard.module#AdminTicketsDashboardModule",
    },
    // Knowledga babse system dashboard
    
    {
        path:"knowledge-base-dashboard",
        loadChildren: "./main/pages/knowledge-base-dashboard/knowledge-base-dashboard.module#KnowledgeBaseDashboardModule",
    },
    // AI BOT DASHBOARD
    {
        path:"ai-bot",
        loadChildren: "./main/pages/ai-bot/ai-bot.module#AiBotModule",
    },
    {
        path: "my-tickets",
        loadChildren: "./main/pages/tickets/tickets.module#TicketsModule",
    },
    // agents routing
    {
        path: "agents",
        loadChildren: "./main/pages/agent/agent.module#AgentModule",
    },

    {
        path: "template",
        loadChildren: "./main/pages/template/template.module#TemplateModule",
    },
    {
        path: "email-options",
        loadChildren: "./main/pages/email-options/email-options.module#EmailOptionsModule",
    },
    // Messages Routes
    {
        path: "label/:labelHandle",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: "label/:labelHandle/:mailId",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: "filter/:filterHandle",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: "filter/:filterHandle/:mailId",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: ":folderHandle",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: ":folderHandle/:mailId",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: "mails/inbox",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
    {
        path: "apps/mail/mails/:ID",
        loadChildren: "./main/pages/mail/mail.module#MailModule",
    },
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
