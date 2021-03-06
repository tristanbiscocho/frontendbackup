
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { FuseConfigService } from "@fuse/services/config.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { FuseUtils } from "@fuse/utils";
import { MessageService } from "primeng/components/common/messageservice";
import { debounceTime } from "rxjs/operators";
import { ClientsService } from "../clients.service";
@Component({
    selector: "app-clients",
    templateUrl: "./clients.component.html",
    styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent implements OnInit {
    // partners
    agents: any[] = [];
    filterByAgents: any[];
    currentUser: any;
    tableOffset: any = 0;

    // var for add or edit agents
    dialogRef: any;
    event: any = 0;

    // search from list
    searchAgents: FormControl;
    minheight: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        private agentService: ClientsService,
        private router: Router,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute
    ) {
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
        const currentuserdata = localStorage.getItem("UserDetail");
        if (currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        } else {
            this.router.navigateByUrl("/login");
        }
        // function declaration for get ticket details
        this.getAgents();
        // form control for serach ticket
        this.searchAgents = new FormControl("");
        const min = window.innerHeight - 200;
        this.minheight = min + "px";
        this._activeRoute.params.forEach((params) => {
            const tableOffset = params["OFFSET"];
            if (!!tableOffset) {
                this.tableOffset = tableOffset;
            }
        });
    }

    onChangePage(event): any {
        this.tableOffset = event.offset;
    }

    ngOnInit(): void {
        // search ticket
        this.searchAgents.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.agents = FuseUtils.filterArrayByString(
                    this.filterByAgents,
                    searchText
                );
            });
    }


    getAgents(): any {
        if (this.currentUser) {
            this.agentService.getAllAgents().subscribe((response) => {
                if (response) {
                    this.agents = response;
                    this.filterByAgents = response;
                } else {
                    this.agents = [];
                    this.filterByAgents = [];
                }
            });
        } else {
            this.router.navigateByUrl("/login");
        }
    }

    setValue(event): any {
        this.event = event;
    }

 
    confirmDialogRef: any;

    deleteAgent(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });
        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";
        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.agentService.deleteAgent(row.Id).subscribe((response) => {
                    if (response) {
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Agent deleted successfully.",
                        });
                        this.getAgents();
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail: "Error in delete Agent.",
                        });
                    }
                });
            }
        });
    }

    filterAgent() {}

    clearAgentFilter() {
        this.searchAgents = new FormControl("");
    }
}
