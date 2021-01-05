"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var animations_1 = require('../../../../core/animations');
var sweetalert2_1 = require('sweetalert2');
var $ = require('jquery');
require('jQuery-QueryBuilder/dist/js/query-builder.standalone.js');
require('jQuery-QueryBuilder/dist/css/query-builder.default.css');
var fieldselect_component_1 = require('./fieldselect/fieldselect.component');
var http_1 = require('@angular/http');
var core_2 = require('@angular/core');
var AddWorkflowComponent = (function () {
    function AddWorkflowComponent(formBuilder, dialog, authService, router, route, http) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.http = http;
        this.position = 'after';
        this.chooseexecution = '1';
        this.selectable = true;
        this.removable = true;
        this.tempdata = [];
        this.disable = true;
        this.months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '23', '24', '25', '26', '27', '28', '29', '30', '31', 'last'];
        this.ondays = ['first', 'second', 'third', 'fourth', 'last'];
        this.week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.rules_basic = {
            condition: 'AND',
            rules: [{}]
        };
        this.actionlist = [];
        this.FinalActionList = [];
        this.SMSEventConfiguratios = [];
        this.EMAILEventConfiguration = [];
        this.Templates = [];
        this.GetEmailIds = [];
        this.GetMobileNo = [];
        // this.AddSMSConfigurations();
        this.currentuser = JSON.parse(localStorage.getItem('userinfo'));
        var currentlang = localStorage.getItem('lang');
        this.currentLanguage = currentlang == 'en' ? 0 : 1;
        var data = localStorage.getItem('resources');
        if (data != undefined && data != null) {
            this.resourceData = JSON.parse(localStorage.getItem('resources'));
        }
        if (this.resourceData == undefined) {
            this.authService.GetAllSystemEnumData().then(function (result) {
                if (result != "False") {
                    _this.resourceData = result;
                    _this.authService.Allresources = result;
                }
                else {
                    _this.resourceData = [];
                }
            });
        }
        this.authService.GetAllObjectData().then(function (result) {
            _this.Objects = result;
        });
        //this.authService.GetAllActionsData().then((result) => {
        //    this.Actions = result;
        //});
        this.route.params
            .forEach(function (params) {
            var workflowID = params['ID'];
            _this.currentindex = workflowID;
            _this.flag = params['For'];
            if (workflowID != undefined && _this.flag == 3) {
                _this.workflowID = JSON.parse(params['ID']);
                _this.authService.GetWorkFlowDataByID(_this.workflowID).then(function (result) {
                    _this.workflowdata = result;
                    _this.WorkFlowName = _this.workflowdata.WorkFlowName;
                    _this.Description = _this.workflowdata.Description;
                    _this.Status = _this.workflowdata.IsActive;
                    _this.ObjValue = _this.workflowdata.AppObjectID;
                    _this.ExecutedOn = _this.workflowdata.EvaluationCriteria;
                    if (_this.workflowdata.EvaluationCriteria == 0) {
                        _this.chooseexecution = '2';
                        var data = JSON.parse(_this.workflowdata.Timings);
                        _this.schedulesetting = data.CronType;
                        _this.date = data.Date;
                        _this.time = data.Time;
                        _this.dailytime = data.TimeDaily;
                        _this.dayweekly = data.DayWeekly;
                        _this.timeweekly = data.TimeWeekly;
                        _this.daymonthly = data.DayMonthly;
                        _this.timemonthly = data.TimeMonthly;
                    }
                    _this.ruleresult = JSON.parse(_this.workflowdata.Rules);
                    _this.GetFeild();
                    _this.authService.getsysobjectID(_this.workflowID).then(function (result) {
                        _this.result = result;
                        var ID = _this.result._body;
                        _this.sysappobjectid = parseInt(ID);
                    });
                    _this.EMAILEventConfiguration = [];
                    _this.authService.GetWorkFlowActionList(_this.workflowID).then(function (result) {
                        if (result.Message == "False") {
                            _this.EMAILEventConfiguration = [];
                        }
                        else {
                            _this.EMAILEventConfiguration = result;
                            for (var _i = 0, _a = _this.EMAILEventConfiguration; _i < _a.length; _i++) {
                                var item = _a[_i];
                                item.Action_InputData = JSON.parse(item.Action_InputData);
                            }
                            _this.data = _this.EMAILEventConfiguration;
                        }
                    });
                });
            }
        });
        if (this.currentuser.Roles == 3) {
            //Call for Admin
            this.authService.SP_GetAllTemplate(0).then(function (result) {
                if (result.Message != "False") {
                    _this.Templates = result;
                }
            });
        }
        else {
            this.authService.SP_GetAllTemplate(this.currentuser.OrgId).then(function (result) {
                if (result.Message != "False") {
                    _this.Templates = result;
                }
            });
        }
    }
    AddWorkflowComponent.prototype.Deselect = function () {
        if (this.chooseexecution == '2') {
            this.ExecutedOn = null;
        }
        else if (this.chooseexecution == '1') {
            this.schedulesetting = null;
        }
    };
    AddWorkflowComponent.prototype.getLanguage = function (key) {
        if (key != null && key != undefined) {
            if (this.resourceData != undefined) {
                for (var _i = 0, _a = this.resourceData; _i < _a.length; _i++) {
                    var English = _a[_i];
                    if (English.Res_Key == key && English.LanguageCode == this.currentLanguage) {
                        var keyvalue = English.Value;
                        return keyvalue;
                    }
                }
            }
        }
    };
    //doSomething($event) {
    //    this.currentindex = $event.selectedIndex
    //    if (this.currentindex == 2) {
    //        if (this.chooseexecution == '1') {
    //            if (this.ExecutedOn == undefined && this.ExecutedOn == null) {
    //                this.exe = ['', Validators.required],
    //                    this.sche = ['']
    //            }
    //            else {
    //                this.sche = ['']
    //            }
    //        }
    //        else if (this.chooseexecution == '2') {
    //            if (this.schedulesetting == undefined && this.schedulesetting == null) {
    //                this.exe = [''],
    //                    this.sche = ['', Validators.required]
    //            }
    //            else if (this.schedulesetting == 'OneTime') {
    //                    this.exe = [''],
    //                    this.Date = ['', Validators.required],
    //                    this.Time = ['', Validators.required]
    //            }
    //        }
    //    }
    //}
    AddWorkflowComponent.prototype.EditConfigData = function (Action) {
        this.currentactionid = Action.Action_InputData.ActionID;
        this.currentactionType = Action.ActionType;
        if (this.currentactionType == 1) {
        }
        else {
        }
    };
    AddWorkflowComponent.prototype.ngAfterViewInit = function () {
        //this.getQueryBuilder();
    };
    AddWorkflowComponent.prototype.ngOnInit = function () {
        this.horizontalStepperformStep1 = this.formBuilder.group({
            module: ['', forms_1.Validators.required],
            name: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required],
            description: [''],
            WorkFlowFor: ['']
        });
        this.horizontalStepperformStep2 = this.formBuilder.group({
            executedon: [''],
            response: [''],
            verified: [''],
        });
        this.ExecutionOnForm = this.formBuilder.group({
            chooseexecution: [''],
            eventBased: [''],
            CronType: [''],
            Date: [''],
            Time: [''],
            TimeDaily: [''],
            DayWeekly: [''],
            TimeWeekly: [''],
            DayMonthly: [''],
            TimeMonthly: ['']
        });
    };
    AddWorkflowComponent.prototype.addFiled = function () {
        var _this = this;
        var data = this.currentactionid;
        this.dialogRef = this.dialog.open(fieldselect_component_1.FieldSelectDialogComponent, {
            panelClass: 'FieldSelect-dialog',
            data: {
                action: 'new',
                FieldData: this.currentactionType == 1 ? this.GetEmailIds : this.GetMobileNo
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(function (response) {
            if (!response) {
                return;
            }
            else {
                var data = response.getRawValue();
                _this.emailsdata = data.field;
                if (_this.workflowID == undefined) {
                    for (var _i = 0, _a = _this.EMAILEventConfiguration; _i < _a.length; _i++) {
                        var item = _a[_i];
                        if (item.ActionID == _this.currentactionid) {
                            for (var _b = 0, _c = _this.emailsdata; _b < _c.length; _b++) {
                                var email = _c[_b];
                                if (item.TO != "") {
                                    item.TO = item.TO + "," + "[" + email + "]";
                                }
                                else {
                                    item.TO = item.TO + "[" + email + "]";
                                }
                            }
                        }
                    }
                }
                else {
                    for (var _d = 0, _e = _this.EMAILEventConfiguration; _d < _e.length; _d++) {
                        var item = _e[_d];
                        if (item.Action_InputData.ActionID == _this.currentactionid) {
                            for (var _f = 0, _g = _this.emailsdata; _f < _g.length; _f++) {
                                var email = _g[_f];
                                if (item.Action_InputData.TO != "") {
                                    item.Action_InputData.TO = item.Action_InputData.TO + "," + "[" + email + "]";
                                }
                                else {
                                    item.Action_InputData.TO = item.Action_InputData.TO + "[" + email + "]";
                                }
                            }
                        }
                    }
                }
            }
        });
    };
    AddWorkflowComponent.prototype.getQueryBuilder = function () {
        if (this.workflowID == undefined) {
            $('#builder').queryBuilder({
                filters: this.Feilds,
                rules: this.rules_basic,
            });
        }
        else {
            $('#builder').queryBuilder({
                filters: this.Feilds,
                rules: this.ruleresult,
            });
        }
    };
    AddWorkflowComponent.prototype.ChangeName = function (choice) {
        
        var action = choice;
        var id = action.ActionID;
        if (action.ActionType == 1) {
            if (this.FinalActionList.length > 0) {
                for (var i = 0; i < this.FinalActionList.length; i++) {
                    if (this.FinalActionList[i].ActionId == id) {
                        this.FinalActionList[i].Name = action.Name;
                    }
                }
            }
        }
        else if (action.ActionType == 2) {
            if (this.FinalActionList.length > 0) {
                for (var i = 0; i < this.FinalActionList.length; i++) {
                    if (this.FinalActionList[i].ActionId == id) {
                        this.FinalActionList[i].Name = action.Name;
                    }
                }
            }
        }
        
    };
    AddWorkflowComponent.prototype.random = function () {
        
        var d = new Date();
        var n = d.getTime();
        this.randomEmailnumber = n;
    };
    AddWorkflowComponent.prototype.AddEmailAction = function () {
        
        this.random();
        if (this.workflowID == undefined) {
            this.EMAILEventConfiguration.push({ 'ActionType': "1", 'TO': "", 'Template': "", 'ActionID': this.randomEmailnumber, 'Name': "Email" });
        }
        else {
            
            this.EMAILEventConfiguration.push({ 'ID': "", 'ActionType': "1", 'Action_InputData': { 'ActionType': "1", 'TO': "", 'Template': "", 'ActionID': this.randomEmailnumber, 'Name': "Email" } });
        }
    };
    AddWorkflowComponent.prototype.AddSMSAction = function () {
        
        this.random();
        if (this.workflowID == undefined) {
            this.EMAILEventConfiguration.push({ 'ActionType': "2", 'TO': "", 'Template': "", 'ActionID': this.randomEmailnumber, 'Name': "SMS" });
        }
        else {
            
            this.EMAILEventConfiguration.push({ 'ID': "", 'ActionType': "2", 'Action_InputData': { 'ActionType': "2", 'TO': "", 'Template': "", 'ActionID': this.randomEmailnumber, 'Name': "SMS" } });
        }
    };
    AddWorkflowComponent.prototype.AddConfigData = function (Action) {
        
        this.currentactionid = Action.ActionID;
        this.currentactionType = Action.ActionType;
        var id = Action.ActionID;
        if (Action.ActionType == 1) {
            
            if (this.EMAILEventConfiguration.length > 0) {
                var Count = 0;
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        
                        Count++;
                        this.EMAILEventConfiguration.indexOf(id);
                        this.EMAILEventConfiguration = this.EMAILEventConfiguration.slice();
                    }
                }
                if (Count == 0) {
                    this.EMAILEventConfiguration.push({ 'ActionType': "1", 'TO': "", 'Template': "", 'ActionID': Action.ActionId, 'Name': '' });
                    var data = this.EMAILEventConfiguration;
                }
            }
            else {
                this.EMAILEventConfiguration.push({ 'ActionType': "1", 'TO': "", 'Template': "", 'ActionID': Action.ActionId, 'Name': '' });
            }
        }
        else if (Action.ActionType == 2) {
            if (this.EMAILEventConfiguration.length > 0) {
                var Count = 0;
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        
                        Count++;
                        this.EMAILEventConfiguration.indexOf(id);
                        this.EMAILEventConfiguration = this.EMAILEventConfiguration.slice();
                    }
                }
                if (Count == 0) {
                    this.EMAILEventConfiguration.push({ 'ActionType': "2", 'TO': "", 'Template': "", 'ActionID': Action.ActionId, 'Name': '' });
                    var data = this.EMAILEventConfiguration;
                }
            }
            else {
                this.EMAILEventConfiguration.push({ 'ActionType': "2", 'TO': "", 'Template': "", 'ActionID': Action.ActionId, 'Name': '' });
            }
        }
    };
    AddWorkflowComponent.prototype.Delete = function (action) {
        
        
        var index = this.EMAILEventConfiguration.indexOf(action);
        if (index >= 0) {
            this.EMAILEventConfiguration.splice(index, 1);
        }
        if (action.ActionType == 1) {
            var id = action.ActionId;
            if (this.EMAILEventConfiguration.length > 0) {
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        
                        this.EMAILEventConfiguration.splice(index, 1);
                        this.EMAILEventConfiguration = this.EMAILEventConfiguration.slice();
                    }
                }
            }
        }
        else {
            var id = action.ActionId;
            if (this.EMAILEventConfiguration.length > 0) {
                for (var i = 0; i < this.EMAILEventConfiguration.length; i++) {
                    if (this.EMAILEventConfiguration[i].ActionID == id) {
                        
                        this.EMAILEventConfiguration.splice(index, 1);
                        this.EMAILEventConfiguration = this.EMAILEventConfiguration.slice();
                    }
                }
            }
        }
        //var data = action;
    };
    AddWorkflowComponent.prototype.SaveWorkFlow = function () {
        var _this = this;
        this.authService.showloader = true;
        this.ruleresult = $('#builder').queryBuilder('getRules');
        var TimeData = {
            CronType: this.schedulesetting == undefined ? "" : this.schedulesetting,
            Date: this.date == undefined ? "" : this.date,
            Time: this.time == undefined ? "" : this.time,
            TimeDaily: this.dailytime == undefined ? "" : this.dailytime,
            DayWeekly: this.dayweekly == undefined ? "" : this.dayweekly,
            TimeWeekly: this.timeweekly == undefined ? "" : this.timeweekly,
            DayMonthly: this.daymonthly == undefined ? "" : this.daymonthly,
            TimeMonthly: this.timemonthly == undefined ? "" : this.timemonthly
        };
        var data = {
            WorkFlowName: this.WorkFlowName,
            Description: this.Description,
            Status: this.Status == true ? 1 : 0,
            ExecutedOn: this.ExecutedOn,
            Module: this.ObjValue,
            ID: this.workflowID,
            TimeData: TimeData,
            Rules: this.ruleresult
        };
        this.authService.SaveWorkFlow(data).subscribe(function (result) {
            
            var data = result;
            var Rule = "";
            var data2 = _this.rules_basic;
            var res = $('#builder').queryBuilder('getSQL', $(_this).data('stmt'), false);
            if (res != null) {
                Rule = JSON.stringify(res);
            }
            else {
                Rule = "NO RULE";
            }
            //Add AppObject Filter ID
            var AppObjectFilterData = {
                Entity: _this.ObjValue,
                AppObjectQuery: Rule,
                ID: _this.sysappobjectid
            };
            _this.authService.UpdateAppObjectFilter(AppObjectFilterData).subscribe(function (result) {
                
            }, function (err) {
                
                _this.authService.showloader = false;
            });
            
            _this.actionlist = [];
            for (var _i = 0, _a = _this.EMAILEventConfiguration; _i < _a.length; _i++) {
                var action = _a[_i];
                var data1 = {
                    'ID': parseInt(action.ID),
                    'ActionID': parseInt(action.ActionType),
                    'Action_InputData': JSON.stringify(action.Action_InputData)
                };
                _this.actionlist.push(data1);
            }
            var url = 'http://ctsapi.techextensorproducts.com/api/Actions/UpdateWorkFlowAction';
            //  var url = 'http://localhost:55959/api/Actions/UpdateWorkFlowAction';
            var req = _this.http.post(url, {
                ID: _this.workflowID,
                actions: _this.actionlist,
            })
                .subscribe(function (res) {
                
                _this.authService.showloader = false;
                sweetalert2_1.default({
                    title: _this.getLanguage('RES_KEY_SUCCESS'),
                    text: _this.getLanguage('RES_KEY_SWAL_UPDATED_WORKFLOW_SUCCESS'),
                    confirmButtonText: _this.getLanguage('RES_KEY_OK')
                });
                _this.router.navigate(['pages/workflows']);
            }, function (err) {
                _this.authService.showloader = false;
            });
        });
    };
    AddWorkflowComponent.prototype.AddWorkFlow = function () {
        var _this = this;
        if (this.schedulesetting == undefined && this.ExecutedOn == undefined) {
            sweetalert2_1.default({
                title: 'Error!',
                text: 'Select ExecutedOn Data First!',
                confirmButtonText: 'Ok'
            });
        }
        else {
            
            this.authService.showloader = true;
            var result = $('#builder').queryBuilder('getRules');
            this.ruleresult = $('#builder').queryBuilder('getRules');
            var TimeData = {
                CronType: this.schedulesetting == undefined ? "" : this.schedulesetting,
                Date: this.date == undefined ? "" : this.date,
                Time: this.time == undefined ? "" : this.time,
                TimeDaily: this.dailytime == undefined ? "" : this.dailytime,
                DayWeekly: this.dayweekly == undefined ? "" : this.dayweekly,
                TimeWeekly: this.timeweekly == undefined ? "" : this.timeweekly,
                DayMonthly1: this.daymonthly == undefined ? "" : this.daymonthly,
                TimeMonthly: this.timemonthly == undefined ? "" : this.timemonthly
            };
            if (this.currentindex != undefined && this.flag == 7) {
                this.WorkFlowFor = this.currentindex;
            }
            var OrgId = 0;
            if (this.currentuser.Roles == 3) {
                OrgId = 0;
            }
            else {
                OrgId = this.currentuser.OrgId;
            }
            var data = {
                WorkFlowName: this.WorkFlowName,
                Description: this.Description,
                Status: this.Status == true ? 1 : 0,
                ExecutedOn: this.ExecutedOn,
                Module: this.ObjValue,
                OrgId: OrgId,
                TimeData: TimeData,
                Rules: this.ruleresult,
                WorkFlowFor: this.WorkFlowFor
            };
            //Add WorkFlow
            this.authService.AddWorkFlow(data).subscribe(function (result) {
                
                var data = result;
                var Rule = "";
                var data2 = _this.rules_basic;
                var res = $('#builder').queryBuilder('getSQL', $(_this).data('stmt'), false);
                if (res != null) {
                    Rule = JSON.stringify(res);
                }
                else {
                    Rule = "NO RULE";
                }
                //Add AppObject Filter ID
                var AppObjectFilterData = {
                    Entity: _this.ObjValue,
                    AppObjectQuery: Rule
                };
                _this.authService.AddAppObjectFilter(AppObjectFilterData).subscribe(function (result1) {
                    
                    var data = {
                        "WorkFlowID": result.ID,
                        "AppObjectFilterID": result1
                    };
                    _this.authService.AddWorkFlowCriteria(data).subscribe(function (result) {
                        
                    });
                });
                //Add WorkFlow Actions
                for (var _i = 0, _a = _this.EMAILEventConfiguration; _i < _a.length; _i++) {
                    var action = _a[_i];
                    var data1 = {
                        'ActionID': parseInt(action.ActionType),
                        'Action_InputData': JSON.stringify(action)
                    };
                    _this.actionlist.push(data1);
                }
                var headers = new http_1.Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                headers.append('Token', _this.currentuser.Token);
                var url = 'http://ctsapi.techextensorproducts.com/api/Actions/CreateWorkFlowAction';
                var req = _this.http.post(url, {
                    ID: result.ID,
                    actions: _this.actionlist,
                    headers: headers
                })
                    .subscribe(function (res) {
                    
                    _this.authService.showloader = false;
                    sweetalert2_1.default({
                        title: _this.getLanguage('RES_KEY_SUCCESS'),
                        text: _this.getLanguage('RES_KEY_SWAL_ADD_WORKFLOW_SUCCESS'),
                        confirmButtonText: _this.getLanguage('RES_KEY_OK')
                    });
                    _this.router.navigate(['pages/workflows']);
                }, function (err) {
                    _this.authService.showloader = false;
                });
            }, function (err) {
                
                _this.authService.showloader = false;
                sweetalert2_1.default({
                    title: _this.getLanguage('RES_KEY_SWAL_ERROR'),
                    text: _this.getLanguage('RES_KEY_SWAL_ERROR_ADD_WORKFLOW'),
                    confirmButtonText: _this.getLanguage('RES_KEY_OK')
                });
            });
        }
    };
    AddWorkflowComponent.prototype.customTrackBy = function (index, obj) {
        return index;
    };
    AddWorkflowComponent.prototype.GetFeild = function () {
        var _this = this;
        
        if (this.currentuser.Roles == 3) {
            this.authService.GetFeildData(this.ObjValue, 0).then(function (result) {
                
                _this.result = result;
                var response = JSON.parse(_this.result._body);
                _this.ObjFeilds = response;
                _this.Feilds = response;
                _this.FilterEmailIDS(_this.Feilds);
                _this.getQueryBuilder();
            });
        }
        else {
            this.authService.GetFeildData(this.ObjValue, this.currentuser.OrgId).then(function (result) {
                
                _this.result = result;
                var response = JSON.parse(_this.result._body);
                _this.ObjFeilds = response;
                _this.Feilds = response;
                _this.FilterEmailIDS(_this.Feilds);
                _this.getQueryBuilder();
            });
        }
    };
    AddWorkflowComponent.prototype.FilterEmailIDS = function (list) {
        this.GetEmailIds = [];
        this.GetMobileNo = [];
        if (list != null) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var entry = list_1[_i];
                if (entry.datatype == 5) {
                    this.GetEmailIds.push(entry);
                }
                if (entry.datatype == 4) {
                    this.GetMobileNo.push(entry);
                }
            }
        }
    };
    ///
    AddWorkflowComponent.prototype.add = function (event) {
        var input = event.input;
        var value = event.value;
        // Add our fruit
        if ((value || '').trim()) {
            this.tags.push({ name: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    };
    AddWorkflowComponent.prototype.remove = function (fruit) {
        var index = this.tags.indexOf(fruit);
        if (index >= 0) {
            this.tags.splice(index, 1);
        }
    };
    AddWorkflowComponent.prototype.AddEmail = function (tag, choice) {
        var data = tag.field;
        if (choice == "") {
            choice = [data];
        }
        else {
            choice = choice + ',' + [data];
        }
    };
    AddWorkflowComponent.prototype.DeleteAction = function (aaction) {
        aaction.ID;
        var index = this.EMAILEventConfiguration.indexOf(aaction);
        if (index >= 0) {
            this.EMAILEventConfiguration.splice(index, 1);
            this.EMAILEventConfiguration = this.EMAILEventConfiguration.slice();
        }
        this.authService.DeleteAction(aaction.ID).then(function (result) {
            if (result == "False") {
            }
            else {
            }
        });
    };
    AddWorkflowComponent.prototype.Disable = function (actions) {
        var checkerr = 0;
        if (actions != undefined) {
            for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                var action = actions_1[_i];
                if (action.TO == "" || action.Template == "") {
                    checkerr = checkerr + 1;
                }
            }
            if (checkerr == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    AddWorkflowComponent.prototype.EditDisable = function (actions) {
        var checkerr = 0;
        if (actions != undefined) {
            for (var _i = 0, actions_2 = actions; _i < actions_2.length; _i++) {
                var action = actions_2[_i];
                if (action.Action_InputData.TO == "" || action.Action_InputData.Template == "") {
                    checkerr = checkerr + 1;
                }
            }
            if (checkerr == 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    __decorate([
        core_2.ViewChild('stepper')
    ], AddWorkflowComponent.prototype, "stepper", void 0);
    AddWorkflowComponent = __decorate([
        core_1.Component({
            selector: 'add-workflow',
            templateUrl: './add-workflow.component.html',
            styleUrls: ['./add-workflow.component.scss'],
            animations: animations_1.fuseAnimations
        })
    ], AddWorkflowComponent);
    return AddWorkflowComponent;
}());
exports.AddWorkflowComponent = AddWorkflowComponent;
