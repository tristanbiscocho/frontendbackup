import { Component, OnInit } from "@angular/core";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseConfigService } from "@fuse/services/config.service";

@Component({
    selector: "app-monitoring",
    templateUrl: "./monitoring.component.html",
    styleUrls: ["./monitoring.component.scss"],
})
export class MonitoringComponent implements OnInit {
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService
    ) {}

    ngOnInit() {
        this._fuseNavigationService.removeNavigationItem("HelpDesk");
        this._fuseNavigationService.removeNavigationItem("Accounts");
        this._fuseNavigationService.removeNavigationItem("knowledgeBase");
        this._fuseNavigationService.removeNavigationItem("aiBots");
        this._fuseNavigationService.removeNavigationItem("announcement");
        this._fuseNavigationService.removeNavigationItem("aiBotsManagement");
        this._fuseNavigationService.removeNavigationItem("health");

        const customFunctionNavItem = {
            id: "aiBots",
            title: "WorkSpace",
            translate: "WorkSpace",
            type: "group",
            children: [
                {
                    id: "Bots",
                    title: "Bots",
                    translate: "Bots",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot",
                },
                {
                    id: "Logs",
                    title: "Logs",
                    translate: "Logs",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/logs",
                },
            ],
        };
        const customFunctionNavItem2 = {
            id: "aiBotsManagement",
            title: "Management",
            translate: "Management",
            type: "group",
            children: [
                {
                    id: "sourceControl",
                    title: "Source Control",
                    translate: "Source Control",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot/source-control",
                },
                {
                    id: "serverLicense",
                    title: "Server License",
                    translate: "Server License",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/server-license",
                },
                {
                    id: "languages",
                    title: "Languages",
                    translate: "Languages",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/languages",
                },
                {
                    id: "modules",
                    title: "Production Checklist",
                    translate: "Production Checklist",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/production-checklist",
                },
                {
                    id: "checklist",
                    title: "Modules",
                    translate: "Modules",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/modules",
                },
            ],
        };
        const customFunctionNavItem3 = {
            id: "health",
            title: "Health",
            translate: "Health",
            type: "group",
            children: [
                {
                    id: "Monitoring",
                    title: "Monitoring",
                    translate: "Monitoring",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot/monitoring",
                },
                {
                    id: "alerting",
                    title: "Alerting",
                    translate: "Alerting",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/alerting",
                },
                {
                    id: "debug",
                    title: "Debug",
                    translate: "Debug",
                    type: "item",
                    icon: "menu_book",
                    exactMatch: true,
                    url: "/ai-bot/debug",
                },
            ],
        };
        const customFunctionNavItem4 = {
            id: "announcement",
            title: "Announcement",
            translate: "Announcement",
            type: "group",
            children: [
                {
                    id: "latest",
                    title: "Latest Release",
                    translate: "Latest Release",
                    type: "item",
                    icon: "android",
                    exactMatch: true,
                    url: "/ai-bot/latest-release",
                },
            ],
        };

        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem,
            "end"
        );
        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem2,
            "end"
        );
        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem3,
            "end"
        );
        this._fuseNavigationService.addNavigationItem(
            customFunctionNavItem4,
            "end"
        );

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
    }
}
