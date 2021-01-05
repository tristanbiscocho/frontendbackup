import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseNavigationService } from "./../../../../../@fuse/components/navigation/navigation.service";
import { Component, OnInit } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color } from "ng2-charts";
import { FuseNavigation } from "@fuse/types";
import { FuseConfigService } from "@fuse/services/config.service";

@Component({
    selector: "app-admin-tickets-dashboard",
    templateUrl: "./admin-tickets-dashboard.component.html",
    styleUrls: ["./admin-tickets-dashboard.component.scss"],
})
export class AdminTicketsDashboardComponent implements OnInit {
    public doughnutChartLabels: Label[] = [
        "Resolved",
        "Open",
        "In Progress",
        "Replied",
        "Deleted",
    ];
    public doughnutChartData: MultiDataSet = [[350, 450, 100, 100, 100]];
    public doughnutChartType: ChartType = "doughnut";

    public lineChartData: ChartDataSets[] = [
        { data: [15, 5, 18, 28, 2, 5, 30], label: "Tickets Stats" },
    ];
    public lineChartLabels: Label[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    public lineChartColors: Color[] = [
        {
            borderColor: "gray",
            backgroundColor: "#7a92a3",
        },
    ];
    public lineChartLegend = true;
    public lineChartType = "line";
    public lineChartPlugins = [];
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService
    ) {}

    ngOnInit() {
        this._fuseNavigationService.removeNavigationItem('HelpDesk');
        this._fuseNavigationService.removeNavigationItem('Accounts');
        this._fuseNavigationService.removeNavigationItem("knowledgeBase");
        this._fuseNavigationService.removeNavigationItem("aiBots");
        this._fuseNavigationService.removeNavigationItem("aiBots");
        this._fuseNavigationService.removeNavigationItem("announcement");
        this._fuseNavigationService.removeNavigationItem("aiBotsManagement");
        this._fuseNavigationService.removeNavigationItem("health");
        const customFunctionNavItem = {
            id: "HelpDesk",
            title: "Work Flows",
            translate: "Work Flow",
            type: "group",
            children: [
                {
                    id: "Dashboard",
                    title: "Dashboard",
                    translate: "Dashboard",
                    type: "item",
                    icon: "dashboard",
                    url: "/admin-tickets-dashboard",
                },
            ],
        };

        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem,
            "end"
        );

        let navigation = this._fuseNavigationService.getCurrentNavigation();

        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: false,
                },
                toolbar: {
                    hidden: false,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };
        this._fuseSidebarService.getSidebar("quickPanel").close();
    }

    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
