// <reference path="../../../../core/components/confirm-dialog/confirm-dialog.component.ts" />
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth";
import {
    Routes,
    Router,
    RouterModule,
    ActivatedRoute,
    Params,
} from "@angular/router";
import {
    FormBuilder,
    Validators,
    FormControl,
    FormGroup,
} from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import * as _ from "lodash";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { FuseUtils } from "@fuse/utils";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import { debounceTime } from "rxjs/operators";
import { FuseConfigService } from "@fuse/services/config.service";
import { WorkflowsService } from "./workflows.service";

@Component({
    selector: "workflows",
    templateUrl: "./workflows.component.html",
    styleUrls: ["./workflows.component.scss"],
})
export class workflowsComponent implements OnInit {
    workflows = [];
    FilteredorgWorkFlows = [];
    FilteredAdminWorkflows = [];
    public currentuser: any;
    searchInput: any;
    currentLanguage: any;
    resourceData: any;
    currentindex = 0;
    public OrgWorkflows: any[] = [];
    public AdminWorkflows: any[] = [];
    public TempOrgData: any[] = [];
    public TempAdminData: any[] = [];
    flag = 7;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    constructor(
        public authService: AuthService,
        private router: Router,
        public dialog: MatDialog,
        private _fuseConfigService: FuseConfigService,
        public _workflowService: WorkflowsService
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
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

        this.workflows = [];
        this.OrgWorkflows = [];
        this.FilteredorgWorkFlows = [];
        this.FilteredAdminWorkflows = [];
        this.searchInput = new FormControl("");
        this.currentuser = JSON.parse(localStorage.getItem("userinfo"));
        const currentlang = localStorage.getItem("lang");
        this.currentLanguage = currentlang == "en" ? 0 : 1;
        const data = localStorage.getItem("resources");
        if (data != undefined && data != null) {
            this.resourceData = JSON.parse(localStorage.getItem("resources"));
        }
    }
    GetWorkFlow(Id): any {
        this.router.navigate(["/pages/add-workflow/" + Id + "/" + 3]);
    }

    onLinkClick(name): any {
        this.currentindex = name.index;
    }
    getLanguage(key): any {
        if (key != null && key != undefined) {
            if (this.resourceData != undefined) {
                for (const English of this.resourceData) {
                    if (
                        English.Res_Key == key &&
                        English.LanguageCode == this.currentLanguage
                    ) {
                        const keyvalue = English.Value;
                        return keyvalue;
                    }
                }
            }
        }
    }
    ngOnInit(): void {
        this.searchInput.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                if (this.currentindex == 0) {
                    this.OrgWorkflows = FuseUtils.filterArrayByString(
                        this.FilteredorgWorkFlows,
                        searchText
                    );
                } else {
                    this.AdminWorkflows = FuseUtils.filterArrayByString(
                        this.FilteredAdminWorkflows,
                        searchText
                    );
                }
            });
        this.getWorkflowList();
    }
    getWorkflowList(): any {
        // all workflow list for Admin
        this._workflowService.GetAllWorkFlowList(0).subscribe((result) => {
            if (result.Message == "False") {
                this.AdminWorkflows = [];
                this.OrgWorkflows = [];
            } else {
                this.workflows = result;
                this.OrgWorkflows = result;

                this.FilteredorgWorkFlows = this.OrgWorkflows;
                this.FilteredAdminWorkflows = this.AdminWorkflows;
                this.TempAdminData = [];
                this.TempOrgData = [];
            }
        });
    }

    DisableWorkFlow(id): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });
        // this.confirmDialogRef.componentInstance.confirmMessage = this.getLanguage('RES_KEY_CONFIRM_DISABLE_WORKFLOW');
        // this.confirmDialogRef.afterClosed().subscribe(result => {
        //     this.authService.showloader = true;
        //     this.authService.DisableWorkFlow(id).then(( result ) => {
        //         this.authService.showloader = false;
        //         if (result != 0)
        //         {
        //         var workflow = _.find(this.workflows, a => a.ID === id);
        //         var index = this.workflows.indexOf(workflow);
        //         this.workflows[index].IsActive = 0;
        //         swal({
        //             title: this.getLanguage('RES_KEY_SUCCESS'),
        //             text: this.getLanguage('RES_KEY_CONFIRM_DOSABLEWORKFLOW_MESSAGE'),
        //             confirmButtonText: this.getLanguage('RES_KEY_OK'),
        //             confirmButtonColor: this.dynamicAssetsService.getcolor()
        //         });
        //        }
        //        else
        //        {
        //         swal({
        //             title: this.getLanguage('RES_KEY_SWAL_ERROR'),
        //             text: this.getLanguage('RES_KEY_WORKFLOW_DISABLE_ERROR'),
        //             confirmButtonText: this.getLanguage('RES_KEY_OK'),
        //             confirmButtonColor: this.dynamicAssetsService.getcolor()
        //         });
        //        }
        //     });
        // });
    }

    // Delete Workflow

    DeleteWorkFlow(row): any {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });
        //this.confirmDialogRef.componentInstance.confirmMessage = this.getLanguage('RES_KEY_CONFIRM_DELETE_WORKFLOW');
        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";
        // this.confirmDialogRef.afterClosed().subscribe(result => {
        //     this.authService.showloader = true;
        //     this.authService.DeleteWorkFlow(row.ID).then((result) => {
        //         this.authService.showloader = false;
        //         if (result != 0)
        //         {
        //             this.workflows.splice(this.workflows.indexOf(row), 1);
        //             this.workflows = [...this.workflows];
        //             if (this.currentuser.Roles === 3)
        //             {
        //                 this.FilteredAdminWorkflows.splice(this.FilteredAdminWorkflows.indexOf(row), 1);
        //                 this.FilteredAdminWorkflows = [...this.FilteredAdminWorkflows];
        //             }
        //             else if (this.currentuser.Roles === 2)
        //             {
        //                 this.OrgWorkflows.splice(this.OrgWorkflows.indexOf(row), 1);
        //                 this.OrgWorkflows = [...this.OrgWorkflows];
        //             }

        //             swal({
        //                 title: this.getLanguage('RES_KEY_SUCCESS'),
        //                 text: this.getLanguage('RES_KEY_CONFIRM_DELETE_WORKFLOW_SUCCESS'),
        //                 confirmButtonText: this.getLanguage('RES_KEY_OK'),
        //                 confirmButtonColor:this.dynamicAssetsService.getcolor()
        //             });
        //        }
        //        else
        //        {
        //         swal({
        //             title: this.getLanguage('RES_KEY_SWAL_ERROR'),
        //             text: this.getLanguage('RES_KEY_DELETE_WORKFLOW_ERROR'),
        //             confirmButtonText: this.getLanguage('RES_KEY_OK'),
        //             confirmButtonColor: this.dynamicAssetsService.getcolor()
        //         });
        //        }
        //     });
        // });
    }

    // Enable workflow

    EnableWorkFlow(id): any {
        //   this.authService.showloader = true;
        //   this.authService.DisableWorkFlow(id).then(( result ) => {
        //       this.authService.showloader = false;
        //       if (result != 0)
        //       {
        //       var workflow = _.find(this.workflows, a => a.ID === id);
        //       var index = this.workflows.indexOf(workflow);
        //       this.workflows[index].IsActive = 1    ;
        //       swal({
        //           title: this.getLanguage('RES_KEY_SUCCESS'),
        //           text: this.getLanguage('RES_KEY_ENABLEWORKFLOW_SUCCESSMESSAGE'),
        //           confirmButtonText: this.getLanguage('RES_KEY_OK'),
        //           confirmButtonColor: this.dynamicAssetsService.getcolor()
        //       });
        //      }
        //      else
        //      {
        //       swal({
        //           title: this.getLanguage('RES_KEY_SWAL_ERROR'),
        //           text: this.getLanguage('RES_KEY_WORKFLOW_ENABLE_ERROR'),
        //           confirmButtonText: this.getLanguage('RES_KEY_OK'),
        //           confirmButtonColor: this.dynamicAssetsService.getcolor()
        //       });
        //      }
        //   });
    }
}
