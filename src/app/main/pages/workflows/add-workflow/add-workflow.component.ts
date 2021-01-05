import { Component, AfterViewInit, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import * as _ from "lodash";
import "jQuery-QueryBuilder/dist/js/query-builder.standalone.js";
import "jQuery-QueryBuilder/dist/css/query-builder.default.css";
import { Router, ActivatedRoute } from "@angular/router";
import { MatChipInputEvent, MatHorizontalStepper } from "@angular/material";
import { FieldSelectDialogComponent } from "./FieldSelect/FieldSelect.component";
import { MatDialog } from "@angular/material";
import { ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { FuseConfigService } from "@fuse/services/config.service";
import { WorkflowsService } from "../workflows.service";

@Component({
    selector: "add-workflow",
    templateUrl: "./add-workflow.component.html",
    styleUrls: ["./add-workflow.component.scss"],
    animations: fuseAnimations,
})
export class AddWorkflowComponent implements AfterViewInit, OnInit {
    @ViewChild("stepper") stepper: MatHorizontalStepper;
    form: FormGroup;
    formErrors: any;
    horizontalStepperformStep1: FormGroup;
    horizontalStepperformStep2: FormGroup;
    horizontalStepperformStep3: FormGroup;
    horizontalStepperformStep4: FormGroup;
    ExecutionOnForm: FormGroup;
    position = "after";
    chooseexecution = "1";
    public Actions: any;
    public Objects: any;
    public ObjValue: any;
    public WorkFlowName: any;
    public Status: any;
    public Description: any;
    public ExecutedOn: any;
    public actionlist: any[];
    public FinalActionList: any[];
    public SMSEventConfiguratios: any[];
    public EMAILEventConfiguration: any[];
    public CurrentAction: any;
    public Templates: any[];
    public ObjFeilds: any;
    public GetEmailIds: any[];
    public GetMobileNo: any[];
    public GetTokens: any[];
    public currentuser: any;
    public tags: any[];
    public schedulesetting: any;
    public date: any;
    public ruleresult: any;
    public currentactionType: any;
    dialogRef: any;
    public sysappobjectid: any;
    public WorkFlowFor: any;
    public flag: any;
    // public actionlist: any[];
    BackgroundColour: any;
    time: any;
    dailytime: any;
    dayweekly: any;
    timeweekly: any;
    daymonthly: any;
    timemonthly: any;
    selectable: boolean = true;
    removable: boolean = true;
    /*Query Builder Configuration*/
    public result: any;
    public Feilds: any;
    public workflowID: any;
    public workflowdata: any;
    tempdata: any[] = [];
    randomEmailnumber: any;
    randomSMSnumber: any;
    currentactionid: any;
    emailsdata: any;
    data: any;
    disable: boolean = true;
    exe: any;
    sche: any;
    Date: any;
    Time: any;
    currentLanguage: any;
    currentindex: any;
    resourceData: any;
    months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    days = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "last",
    ];
    ondays = ["first", "second", "third", "fourth", "last"];
    week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient,
        public _fuseConfigService: FuseConfigService,
        public _addWorkflowService: WorkflowsService
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

        this.actionlist = [];
        this.FinalActionList = [];
        this.SMSEventConfiguratios = [];
        this.EMAILEventConfiguration = [];
        this.Templates = [];
        this.GetEmailIds = [];
        this.GetMobileNo = [];
        this.GetTokens = [];
        // this.AddSMSConfigurations();
        this.currentuser = JSON.parse(localStorage.getItem("UserDetail"));

        // if (this.resourceData == undefined) {
        //     this._addWorkflowService.GetAllSystemEnumData().subscribe(
        //         response => {
        //         if (response != "False") {
        //             this.resourceData = response;
        //         }
        //         else {
        //             this.resourceData = [];
        //         }
        //     });
        // }
        this._addWorkflowService.GetAllObjectData().subscribe((response) => {
            this.Objects = response;
        });

        // this.authService.GetAllActionsData().then((result) => {
        //    this.Actions = result;
        // });

        this.route.params.forEach((params) => {
            const workflowID = params["ID"];
            this.currentindex = workflowID;
            this.flag = params["For"];

            if (workflowID != undefined && this.flag == 3) {
                this.workflowID = JSON.parse(params["ID"]);
                this._addWorkflowService
                    .GetWorkFlowDataByID(this.workflowID)
                    .subscribe((result) => {
                        this.workflowdata = result;
                        this.WorkFlowName = this.workflowdata.WorkFlowName;
                        this.Description = this.workflowdata.Description;
                        this.Status = this.workflowdata.IsActive;
                        this.ObjValue = this.workflowdata.AppObjectID;
                        this.ExecutedOn = this.workflowdata.EvaluationCriteria;
                        if (this.workflowdata.EvaluationCriteria == 0) {
                            this.chooseexecution = "2";
                            var data = JSON.parse(this.workflowdata.Timings);
                            this.schedulesetting = data.CronType;
                            this.date = data.Date;
                            this.time = data.Time;
                            this.dailytime = data.TimeDaily;
                            this.dayweekly = data.DayWeekly;
                            this.timeweekly = data.TimeWeekly;
                            this.daymonthly = data.DayMonthly;
                            this.timemonthly = data.TimeMonthly;
                        }

                        this.ruleresult = JSON.parse(this.workflowdata.Rules);

                        this.GetFeild();
                        this._addWorkflowService
                            .getsysobjectID(this.workflowID)
                            .then((result) => {
                                this.result = result;
                                var ID = this.result._body;
                                this.sysappobjectid = parseInt(ID);
                            });
                        this.EMAILEventConfiguration = [];
                        this._addWorkflowService
                            .GetWorkFlowActionList(this.workflowID)
                            .then((result) => {
                                if (result.Message == "False") {
                                    this.EMAILEventConfiguration = [];
                                } else {
                                    this.EMAILEventConfiguration = result;
                                    for (let item of this
                                        .EMAILEventConfiguration) {
                                        item.Action_InputData = JSON.parse(
                                            item.Action_InputData
                                        );
                                    }
                                    this.data = this.EMAILEventConfiguration;
                                }
                            });
                    });
            }
        });

        // Call for Admin
        this._addWorkflowService.SP_GetAllTemplate(0).then((result) => {
            if (result.Message != "False") {
                this.Templates = result;
            }
        });
    }

    Deselect(): any {
        if (this.chooseexecution == "2") {
            this.ExecutedOn = null;
            // if (this.schedulesetting == "OneTime") {
            //    this.exe = [''],
            //        this.Date = ['', Validators.required],
            //        this.Time = ['', Validators.required]
            // }
        } else if (this.chooseexecution == "1") {
            this.schedulesetting = null;
        }
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
    // doSomething($event) {
    //     this.currentindex = $event.selectedIndex
    //     if (this.currentindex == 2) {
    //         if (this.chooseexecution == '1') {
    //             if (this.ExecutedOn == undefined && this.ExecutedOn == null) {

    //                 this.exe = ['', Validators.required],
    //                     this.sche = [''];
    //             }
    //             else {
    //                 this.sche = [''];
    //             }
    //         }
    //         else if (this.chooseexecution == '2') {
    //             if (this.schedulesetting == undefined && this.schedulesetting == null) {
    //                 this.exe = [''],
    //                     this.sche = ['', Validators.required];
    //             }
    //             else if (this.schedulesetting == 'OneTime') {
    //                 this.exe = [''],
    //                     this.Date = ['', Validators.required],
    //                     this.Time = ['', Validators.required];

    //             }
    //         }
    //     }

    // }
    EditConfigData(Action): any {
        this.currentactionid = Action.Action_InputData.ActionID;
        this.currentactionType = Action.ActionType;
        if (this.currentactionType == 1) {
        } else {
        }
    }

    protected rules_basic = {
        condition: "AND",
        rules: [{}],
    };
    ngAfterViewInit(): any {
        //this.getQueryBuilder();
    }

    ngOnInit(): any {
        this.horizontalStepperformStep1 = this.formBuilder.group({
            module: ["", Validators.required],
            name: ["", Validators.required],
            status: ["", Validators.required],
            description: [""],
            WorkFlowFor: [""],
        });

        this.horizontalStepperformStep2 = this.formBuilder.group({
            executedon: [""],
            response: [""],
            verified: [""],
        });

        this.ExecutionOnForm = this.formBuilder.group({
            chooseexecution: [""],
            eventBased: [""],
            CronType: [""],
            Date: [""],
            Time: [""],
            TimeDaily: [""],
            DayWeekly: [""],
            TimeWeekly: [""],
            DayMonthly: [""],
            TimeMonthly: [""],
        });

        this.getModuleData();
    }

    getModuleData(): any {
        this._addWorkflowService.getAllModuleData().subscribe((result) => {
            if (result != "false") {
                this.Objects = result;
            }
        });

        this.ExecutionOnForm.controls["eventBased"].valueChanges.subscribe(
            (a) => {
                this.ExecutedOn = a;
            }
        );
        this.horizontalStepperformStep1.controls[
            "module"
        ].valueChanges.subscribe((a) => {
            this.ObjValue = a;
        });
        this.ExecutionOnForm.controls["CronType"].valueChanges.subscribe(
            (a) => {
                this.schedulesetting = a;
            }
        );
    }

    addFiled(): void {
        let Feilddata = null;
        const data = this.currentactionid;
        if (this.currentactionType == 1) {
            Feilddata = this.GetEmailIds;
        } else if (this.currentactionType == 2) {
            Feilddata = this.GetMobileNo;
        } else {
            Feilddata = this.GetTokens;
        }

        this.dialogRef = this.dialog.open(FieldSelectDialogComponent, {
            panelClass: "FieldSelect",
            data: {
                action: "new",
                FieldData: this
                    .GetEmailIds /*this.currentactionType == 1 ? this.GetEmailIds : this.GetMobileNo*/,
            },
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            if (!response) {
                return;
            } else {
                let data = response.getRawValue();
                this.emailsdata = data.field;
                if (this.workflowID == undefined) {
                    for (const item of this.EMAILEventConfiguration) {
                        if (item.ActionID == this.currentactionid) {
                            for (let email of this.emailsdata) {
                                if (item.TO != "") {
                                    item.TO = item.TO + "," + "[" + email + "]";
                                } else {
                                    item.TO = item.TO + "[" + email + "]";
                                }
                            }
                        }
                    }
                } else {
                    for (let item of this.EMAILEventConfiguration) {
                        if (
                            item.Action_InputData.ActionID ==
                            this.currentactionid
                        ) {
                            for (let email of this.emailsdata) {
                                if (item.Action_InputData.TO != "") {
                                    item.Action_InputData.TO =
                                        item.Action_InputData.TO +
                                        "," +
                                        "[" +
                                        email +
                                        "]";
                                } else {
                                    item.Action_InputData.TO =
                                        item.Action_InputData.TO +
                                        "[" +
                                        email +
                                        "]";
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    public getQueryBuilder(): any {
        // if (this.workflowID == undefined) {
        //     (<any>$("#builder")).queryBuilder({
        //         filters: this.Feilds,
        //         rules: this.rules_basic
        //     });
        // } else {
        //     (<any>$("#builder")).queryBuilder({
        //         filters: this.Feilds,
        //         rules: this.ruleresult
        //     });
        // }
    }

    ChangeName(choice): any {
        let action = choice;
        let id = action.ActionID;
        if (action.ActionType == 1) {
            if (this.FinalActionList.length > 0) {
                for (let i = 0; i < this.FinalActionList.length; i++) {
                    if (this.FinalActionList[i].ActionId == id) {
                        this.FinalActionList[i].Name = action.Name;
                    }
                }
            }
        } else if (action.ActionType == 2) {
            if (this.FinalActionList.length > 0) {
                for (let i = 0; i < this.FinalActionList.length; i++) {
                    if (this.FinalActionList[i].ActionId == id) {
                        this.FinalActionList[i].Name = action.Name;
                    }
                }
            }
        }
    }
    random(): any {
        const d = new Date();
        const n = d.getTime();
        this.randomEmailnumber = n;
    }
    AddEmailAction(): any {
        this.random();
        if (this.workflowID == undefined) {
            this.EMAILEventConfiguration.push({
                ActionType: "1",
                TO: "",
                Template: "",
                ActionID: this.randomEmailnumber,
                Name: "Email",
                Additional_Data: "",
            });
        } else {
            this.EMAILEventConfiguration.push({
                ID: "",
                ActionType: "1",
                Action_InputData: {
                    ActionType: "1",
                    TO: "",
                    Template: "",
                    ActionID: this.randomEmailnumber,
                    Name: "Email",
                    Additional_Data: "",
                },
            });
        }
    }

    AddSMSAction(): any {
        this.random();
        if (this.workflowID == undefined) {
            this.EMAILEventConfiguration.push({
                ActionType: "2",
                TO: "",
                Template: "",
                ActionID: this.randomEmailnumber,
                Name: "SMS",
                Additional_Data: "",
            });
        } else {
            this.EMAILEventConfiguration.push({
                ID: "",
                ActionType: "2",
                Action_InputData: {
                    ActionType: "2",
                    TO: "",
                    Template: "",
                    ActionID: this.randomEmailnumber,
                    Name: "SMS",
                    Additional_Data: "",
                },
            });
        }
    }
    AddPushNotification(): any {
        this.random();
        if (this.workflowID == undefined) {
            this.EMAILEventConfiguration.push({
                ActionType: "3",
                TO: "",
                Template: "",
                ActionID: this.randomEmailnumber,
                Name: "PushNotification",
                Additional_Data: "",
            });
        } else {
            this.EMAILEventConfiguration.push({
                ID: "",
                ActionType: "3",
                Action_InputData: {
                    ActionType: "3",
                    TO: "",
                    Template: "",
                    ActionID: this.randomEmailnumber,
                    Name: "PushNotification",
                    Additional_Data: "",
                },
            });
        }
    }
    AddConfigData(Action): any {
        this.currentactionid = Action.ActionID;
        this.currentactionType = Action.ActionType;
        let id = Action.ActionID;
        if (Action.ActionType == 1) {
            if (this.EMAILEventConfiguration.length > 0) {
                let Count = 0;

                for (let i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        Count++;
                        this.EMAILEventConfiguration.indexOf(id);
                        this.EMAILEventConfiguration = [
                            ...this.EMAILEventConfiguration,
                        ];
                    }
                }
                if (Count == 0) {
                    this.EMAILEventConfiguration.push({
                        ActionType: "1",
                        TO: "",
                        Template: "",
                        ActionID: Action.ActionId,
                        Name: "",
                        Additional_Data: "",
                    });
                    var data = this.EMAILEventConfiguration;
                }
            } else {
                this.EMAILEventConfiguration.push({
                    ActionType: "1",
                    TO: "",
                    Template: "",
                    ActionID: Action.ActionId,
                    Name: "",
                    Additional_Data: "",
                });
            }
        } else if (Action.ActionType == 2) {
            if (this.EMAILEventConfiguration.length > 0) {
                var Count = 0;
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        Count++;
                        this.EMAILEventConfiguration.indexOf(id);
                        this.EMAILEventConfiguration = [
                            ...this.EMAILEventConfiguration,
                        ];
                    }
                }
                if (Count == 0) {
                    this.EMAILEventConfiguration.push({
                        ActionType: "2",
                        TO: "",
                        Template: "",
                        ActionID: Action.ActionId,
                        Name: "",
                        Additional_Data: "",
                    });
                    var data = this.EMAILEventConfiguration;
                }
            } else {
                this.EMAILEventConfiguration.push({
                    ActionType: "2",
                    TO: "",
                    Template: "",
                    ActionID: Action.ActionId,
                    Name: "",
                    Additional_Data: "",
                });
            }
        }
    }

    Delete(action): any {
        let index = this.EMAILEventConfiguration.indexOf(action);
        if (index >= 0) {
            this.EMAILEventConfiguration.splice(index, 1);
        }
        if (action.ActionType == 1) {
            var id = action.ActionId;
            if (this.EMAILEventConfiguration.length > 0) {
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        this.EMAILEventConfiguration.splice(index, 1);
                        this.EMAILEventConfiguration = [
                            ...this.EMAILEventConfiguration,
                        ];
                    }
                }
            }
        } else {
            var id = action.ActionId;
            if (this.EMAILEventConfiguration.length > 0) {
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        this.EMAILEventConfiguration.splice(index, 1);
                        this.EMAILEventConfiguration = [
                            ...this.EMAILEventConfiguration,
                        ];
                    }
                }
            }
        }
    }

    SaveWorkFlow(): any {
        // this.ruleresult = (<any>$('#builder')).queryBuilder('getRules');
        var TimeData = {
            CronType:
                this.schedulesetting == undefined ? "" : this.schedulesetting,
            Date: this.date == undefined ? "" : this.date,
            Time: this.time == undefined ? "" : this.time,
            TimeDaily: this.dailytime == undefined ? "" : this.dailytime,
            DayWeekly: this.dayweekly == undefined ? "" : this.dayweekly,
            TimeWeekly: this.timeweekly == undefined ? "" : this.timeweekly,
            DayMonthly: this.daymonthly == undefined ? "" : this.daymonthly,
            TimeMonthly: this.timemonthly == undefined ? "" : this.timemonthly,
        };
        var data = {
            WorkFlowName: this.WorkFlowName,
            Description: this.Description,
            Status: this.Status == true ? 1 : 0,
            ExecutedOn: this.ExecutedOn,
            Module: this.ObjValue,
            ID: this.workflowID,
            TimeData: TimeData,
            Rules: this.ruleresult,
        };

        this._addWorkflowService.SaveWorkFlow(data).subscribe((result) => {
            var data = result;
            var Rule = "";
            var data2 = this.rules_basic;
            var res = null;
            if (res != null) {
                Rule = JSON.stringify(res);
            } else {
                Rule = "NO RULE";
            }
            // Add AppObject Filter ID
            var AppObjectFilterData = {
                Entity: this.ObjValue,
                AppObjectQuery: Rule,
                ID: this.sysappobjectid,
            };
            this._addWorkflowService
                .UpdateAppObjectFilter(AppObjectFilterData)
                .subscribe(
                    (result) => {},
                    (err) => {}
                );

            this.actionlist = [];

            for (let action of this.EMAILEventConfiguration) {
                var data1 = {
                    ID: parseInt(action.ID),
                    ActionID: parseInt(action.ActionType),
                    Action_InputData: JSON.stringify(action.Action_InputData),
                };

                this.actionlist.push(data1);
            }

            var url = "http://localhost:55959/api/Actions/UpdateWorkFlowAction";
            //var url = 'http://localhost:55959/api/Actions/UpdateWorkFlowAction';

            const req = this.http
                .post(url, {
                    ID: this.workflowID,
                    actions: this.actionlist,
                })
                .subscribe(
                    (res) => {
                        this.router.navigate(["/workflows"]);
                    },
                    (err) => {
                        // console.log("Error occured");
                    }
                );
        });
    }
    AddWorkFlow(): any {
        if (this.schedulesetting == undefined && this.ExecutedOn == undefined) {
            // swal({
            //     title: 'Error!',
            //     text: 'Select ExecutedOn Data First!',
            //     confirmButtonText: 'Ok'
            // })
        } else {
            // var result = (<any>$('#builder')).queryBuilder('getRules');
            // this.ruleresult = (<any>$('#builder')).queryBuilder('getRules');
            // console.log(this.ruleresult);
            var TimeData = {
                CronType:
                    this.schedulesetting == undefined
                        ? ""
                        : this.schedulesetting,
                Date: this.date == undefined ? "" : this.date,
                Time: this.time == undefined ? "" : this.time,
                TimeDaily: this.dailytime == undefined ? "" : this.dailytime,
                DayWeekly: this.dayweekly == undefined ? "" : this.dayweekly,
                TimeWeekly: this.timeweekly == undefined ? "" : this.timeweekly,
                DayMonthly1:
                    this.daymonthly == undefined ? "" : this.daymonthly,
                TimeMonthly:
                    this.timemonthly == undefined ? "" : this.timemonthly,
            };
            if (this.currentindex != undefined && this.flag == 7) {
                this.WorkFlowFor = this.currentindex;
            }
            var OrgId = 0;

            OrgId = this.currentuser.CustomerId;

            var data = {
                WorkFlowName: this.WorkFlowName,
                Description: this.Description,
                Status: this.Status == true ? 1 : 0,
                ExecutedOn: this.ExecutedOn,
                Module: this.ObjValue,
                OrgId: OrgId,
                TimeData: TimeData,
                Rules: this.ruleresult,
                WorkFlowFor: this.WorkFlowFor,
            };

            //Add WorkFlow
            this._addWorkflowService.AddWorkFlow(data).subscribe(
                (result) => {
                    var data = result;
                    var Rule = "";
                    var data2 = this.rules_basic;
                    var res = null;
                    // var res = null;
                    if (res != null) {
                        Rule = JSON.stringify(res);
                    } else {
                        Rule = "NO RULE";
                    }
                    //Add AppObject Filter ID
                    var AppObjectFilterData = {
                        Entity: this.ObjValue,
                        AppObjectQuery: Rule,
                    };

                    this._addWorkflowService
                        .AddAppObjectFilter(AppObjectFilterData)
                        .subscribe((result1) => {
                            var data = {
                                WorkFlowID: result.ID,
                                AppObjectFilterID: result1,
                            };
                            this._addWorkflowService
                                .AddWorkFlowCriteria(data)
                                .subscribe((result) => {});
                        });

                    //Add WorkFlow Actions

                    for (let action of this.EMAILEventConfiguration) {
                        var data1 = {
                            ActionID: parseInt(action.ActionType),
                            Action_InputData: JSON.stringify(action),
                        };
                        this.actionlist.push(data1);
                    }
                    var headers = new Headers();
                    headers.append(
                        "Content-Type",
                        "application/x-www-form-urlencoded; charset=UTF-8"
                    );
                    var url =
                        "http://localhost:55959/api/Actions/CreateWorkFlowAction";
                    //var url = 'http://localhost:55959/api/Actions/CreateWorkFlowAction';
                    const req = this.http
                        .post(url, {
                            ID: result.ID,
                            actions: this.actionlist,
                            headers: headers,
                        })
                        .subscribe(
                            (res) => {
                                this.router.navigate(["pages/workflows"]);
                            },
                            (err) => {
                                // console.log("Error occured");
                            }
                        );
                },
                (err) => {}
            );
        }
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    GetFeild(): any {
        this._addWorkflowService
            .getObjectFeild(this.ObjValue)
            .subscribe((result) => {
                if (result.Message == "False") {
                    this.ObjFeilds = [];
                } else {
                    this.result = result;
                    let response = result;
                    this.ObjFeilds = response;
                    this.Feilds = response;
                    this.FilterEmailIDS(this.Feilds);
                    this.getQueryBuilder();
                }
            });
    }

    FilterEmailIDS(list): any {
        this.GetEmailIds = [];
        this.GetMobileNo = [];
        this.GetTokens = [];
        if (list != null) {
            for (const entry of list) {
                if (entry.DataType == 5) {
                    this.GetEmailIds.push(entry);
                }
                if (entry.DataType == 4) {
                    this.GetMobileNo.push(entry);
                }
                if (entry.DataType == 6) {
                    this.GetTokens.push(entry);
                }
            }
        }
    }

    add(event: MatChipInputEvent): void {
        let input = event.input;
        let value = event.value;

        // Add our fruit
        if ((value || "").trim()) {
            this.tags.push({ name: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = "";
        }
    }

    remove(fruit: any): void {
        const index = this.tags.indexOf(fruit);

        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    }
    AddEmail(tag, choice): any {
        var data = tag.field;
        if (choice == "") {
            choice = [data];
        } else {
            choice = choice + "," + [data];
        }
    }

    DeleteAction(aaction): any {
        aaction.ID;
        const index = this.EMAILEventConfiguration.indexOf(aaction);
        if (index >= 0) {
            this.EMAILEventConfiguration.splice(index, 1);
            this.EMAILEventConfiguration = [...this.EMAILEventConfiguration];
        }

        this._addWorkflowService.DeleteAction(aaction.ID).then((result) => {
            if (result == "False") {
            } else {
            }
        });
    }

    Disable(actions): any {
        var checkerr = 0;
        if (actions != undefined) {
            for (let action of actions) {
                if (action.TO == "" || action.Template == "") {
                    checkerr = checkerr + 1;
                }
            }
            if (checkerr == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    EditDisable(actions): any {
        var checkerr = 0;
        if (actions != undefined) {
            for (let action of actions) {
                if (
                    action.Action_InputData.TO == "" ||
                    action.Action_InputData.Template == ""
                ) {
                    checkerr = checkerr + 1;
                }
            }
            if (checkerr == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
