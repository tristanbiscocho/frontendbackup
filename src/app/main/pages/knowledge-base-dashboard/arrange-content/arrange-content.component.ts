import { Component, OnInit } from "@angular/core";
import { FuseNavigationService } from "@fuse/components/navigation/navigation.service";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { FuseConfigService } from "@fuse/services/config.service";

@Component({
    selector: "app-arrange-content",
    templateUrl: "./arrange-content.component.html",
    styleUrls: ["./arrange-content.component.scss"],
})
export class ArrangeContentComponent implements OnInit {
    arrangeSection: any = 1;

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
      this._fuseNavigationService.removeNavigationItem("aiBots");
      this._fuseNavigationService.removeNavigationItem("announcement");
      this._fuseNavigationService.removeNavigationItem("aiBotsManagement");
      this._fuseNavigationService.removeNavigationItem("health");
      const customFunctionNavItem = {
          id: "knowledgeBase",
          title: "Knowledge Base",
          translate: "Knowledge Base",
          type: "group",
          children: [
              {
                  id: "Dashboard",
                  title: "Dashboard",
                  translate: "Dashboard",
                  type: "item",
                  icon: "dashboard",
                  exactMatch: true,
                  url: "/knowledge-base-dashboard",
              },
              {
                  id: "articles",
                  title: "Manage Articles",
                  translate: "Manage Articles",
                  type: "item",
                  icon: "library_books",
                  exactMatch: true,
                  url: "/knowledge-base-dashboard/manage-articles",
              },
              {
                  id: "arrangeContent",
                  title: "Arrange Content",
                  translate: "Arrange Content",
                  type: "item",
                  icon: "view_agenda",
                  exactMatch: true,
                  url: "/knowledge-base-dashboard/arrange-content",
              },
          ],
      };
      this._fuseNavigationService.addNavigationItem(
          customFunctionNavItem,
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

    activeTab(no){
      this.arrangeSection = no;
    }
}
