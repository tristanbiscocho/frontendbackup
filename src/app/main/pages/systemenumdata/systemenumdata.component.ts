import {
    Component,
    ViewChild,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ElementRef,
} from "@angular/core";
import { systemenumService } from "./systemenum.service";
import { Http, Headers, URLSearchParams } from "@angular/http";
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { FuseContactsContactFormDialogComponent } from "./city-form/contact-form.component";
// import { FuseUtils } from '../../../../../../core/fuseUtils';
import * as _ from "lodash";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { FuseConfigService } from "@fuse/services/config.service";
import { debounceTime } from "rxjs/operators";
import { FuseUtils } from "@fuse/utils";
import { MessageService } from "primeng/components/common/messageservice";
@Component({
    selector: "systemenumdata",
    templateUrl: "./systemenumdata.component.html",
    styleUrls: ["./systemenumdata.component.scss"],
})
export class SystemEnumDataComponent implements OnInit {
    dialogRef: any;
    searchInput: FormControl;
    rows = [];
    FilteredRows = [];
    selected = [];
    temp = [];
    cityFormErrors: any;
    savecityForm: FormGroup;
    systemEnum: any;
    public Allenumdata: any[];
    public remark: string;
    public city: string;
    public ID: string;
    public Type: string;
    public ParentId: string;
    public currentrow: any;
    public regions: any;
    public region: string;
    public isadd: boolean;
    public title: string;
    public test: string;
    public currentuser: any;
    public TypeID: string;
    public filteredTypes: any[];
    public systemenums: any;
    public SystemEnums: any;
    public systemenumdata: any;
    public SystemEnumListValues: any;
    currentLanguage: any;
    resourceData: any;
    SystemEnum: any[];
    confirmDialogRef: any;
    searchConfiguartion: any;
    constructor(
        private formBuilder: FormBuilder,
        public sysservice: systemenumService,
        public dialog: MatDialog,
        public _fuseConfigService: FuseConfigService,
        public messageService: MessageService
    ) {
        this.searchConfiguartion = new FormControl("");

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

        this.currentuser = JSON.parse(localStorage.getItem("userinfo"));
        var lan = localStorage.getItem("lang");
        if (lan == null) {
            localStorage.setItem("lang", "en");
        }
        var currentlang = localStorage.getItem("lang");
        this.currentLanguage = currentlang == "en" ? 0 : 1;
        var data = localStorage.getItem("resources");
        if (data != undefined && data != null) {
            this.resourceData = JSON.parse(localStorage.getItem("resources"));
        }
        if (this.resourceData == undefined) {
            this.sysservice.GetAllResourceValue().subscribe((result) => {
                if (result != "False") {
                    localStorage.setItem("resources", JSON.stringify(result));
                    this.resourceData = result;
                    this.sysservice.AllResources = result;
                } else {
                    this.resourceData = [];
                }
            });
        }
        this.searchInput = new FormControl("");
        this.isadd = true;
        this.title = "Add Data";

        this.cityFormErrors = {
            systemenums: {},
        };

        this.sysservice.getallSystemenumdata().subscribe((result) => {
            if (result.Message == "False") {
                this.FilteredRows = [];
                this.rows = [];
                this.SystemEnumListValues = result;
            } else {
                this.rows = result;
                // this.rows = _.orderBy(this.rows, ['Id']['desc']);
                this.FilteredRows = result;
                this.SystemEnumListValues = result;
            }
        });
        this.sysservice.GetSys_ListData().subscribe((data) => {
            this.systemenumdata = data;
        });
    }
    getLanguage(key) {
        if (key != null && key != undefined) {
            if (this.resourceData != undefined) {
                for (let English of this.resourceData) {
                    if (
                        English.Res_Key == key &&
                        English.LanguageCode == this.currentLanguage
                    ) {
                        var keyvalue = English.Value;
                        return keyvalue;
                    }
                }
            }
        }
    }
    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open(
            "GET",
            `http://realestateapi.techextensorproducts.com/api/LocationInfoes/GetCities`
        );

        req.onload = () => {
            var data = JSON.parse(req.response);
            cb(JSON.parse(req.response));
        };
        req.send();
    }

    getSystemenutypebyID(id) {
        if (this.systemenumdata != undefined) {
            for (let entry of this.systemenumdata) {
                if (entry.Id == id) {
                    return entry.Name;
                }
            }
        }
    }

    //open Edit City Dialog
    opendialog(row) {
        this.currentrow = row;
        if (row == null) {
            this.dialogRef = this.dialog.open(
                FuseContactsContactFormDialogComponent,
                {
                    panelClass: "contact-form-dialog",
                    data: {
                        action: "new",
                        alldata: this.rows,
                    },
                }
            );
        } else {
            this.dialogRef = this.dialog.open(
                FuseContactsContactFormDialogComponent,
                {
                    panelClass: "contact-form-dialog",
                    data: {
                        action: "edit",
                        listdata: row,
                        alldata: this.rows,
                    },
                }
            );
        }
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            } else {
                var action = response[0];
                var data = response[1].getRawValue();
                if (action == "save") {
                    this.sysservice.EditSys_ListValue(data).subscribe(
                        (result) => {
                            // var dataindex = this.rows.indexOf(this.currentrow);
                            // this.rows[dataindex].ID = result.Id;
                            // this.rows[dataindex].Value = result.Value;
                            // this.rows[dataindex].Type = this.getSystemenutypebyID(result.ListID); // this.gettypebyid(result.SystemEnumID);
                            // this.rows[dataindex].Seq = result.Seq;

                            this.sysservice
                                .getallSystemenumdata()
                                .subscribe((result) => {
                                    if (result.Message == "False") {
                                        this.FilteredRows = [];
                                        this.rows = [];
                                        this.SystemEnumListValues = result;
                                        this.messageService.add({
                                            severity: "warn",
                                            summary: "Error",
                                            detail: "Error in update data.",
                                        });
                                    } else {
                                        this.rows = result;
                                        // this.rows = _.orderBy(this.rows, ['Id']['desc']);
                                        this.FilteredRows = result;

                                        this.SystemEnumListValues = result;
                                        localStorage.setItem(
                                            "gelAllResourceData",
                                            JSON.stringify(result)
                                        );
                                        this.messageService.add({
                                            severity: "success",
                                            summary: "Success",
                                            detail:
                                                "Your data has been updated successfully.",
                                        });
                                    }
                                });
                        },
                        (err) => {}
                    );
                } else {
                    this.sysservice.AddSys_ListValue(data).subscribe(
                        (result) => {
                            // result.Type = this.getSystemenutypebyID(result.ListID);
                            // this.rows.unshift(result);
                            // this.rows = [...this.rows];

                            this.sysservice
                                .getallSystemenumdata()
                                .subscribe((result) => {
                                    if (result.Message == "False") {
                                        this.FilteredRows = [];
                                        this.rows = [];
                                        this.SystemEnumListValues = result;
                                        this.messageService.add({
                                            severity: "warn",
                                            summary: "Error",
                                            detail: "Error in add data.",
                                        });
                                    } else {
                                        this.rows = result;
                                        // this.rows = _.orderBy(this.rows, ['Id']['desc']);
                                        this.FilteredRows = result;
                                        this.SystemEnumListValues = result;
                                        localStorage.setItem(
                                            "gelAllResourceData",
                                            JSON.stringify(result)
                                        );
                                        this.messageService.add({
                                            severity: "success",
                                            summary: "Success",
                                            detail:
                                                "Your data has been added successfully.",
                                        });
                                    }
                                });
                        },
                        (err) => {}
                    );
                }
            }
        });
    }

    ngOnInit() {
        this.savecityForm = this.formBuilder.group({
            systemenums: ["", [Validators.required]],
        });
        this.searchConfiguartion.valueChanges
            .pipe(debounceTime(400))
            .subscribe((searchText) => {
                this.FilteredRows = FuseUtils.filterArrayByString(
                    this.rows,
                    searchText
                );
            });
    }

    //get Name by ID
    getnamebyID(id) {
        if (this.regions != undefined) {
            for (let entry of this.regions) {
                if (entry.ID == id) {
                    return entry.Name;
                }
            }
        }
    }

    //delete city
    deletecity(list) {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false,
        });

        this.confirmDialogRef.componentInstance.confirmMessage =
            "Are you sure want to remove record?";

        this.confirmDialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.sysservice.Deletelistvalue(list.Id).then(
                    (result) => {
                        var data = this.rows.indexOf(list);
                        this.rows.splice(this.rows.indexOf(list), 1);
                        this.rows = [...this.rows];
                        this.FilteredRows = this.rows;
                        localStorage.setItem(
                            "gelAllResourceData",
                            JSON.stringify(result)
                        );
                        this.messageService.add({
                            severity: "success",
                            summary: "Success",
                            detail:
                                " Your record has been deleted successfully.",
                        });
                    },
                    (err) => {}
                );
            }
            this.confirmDialogRef = null;
        });
    }
}
