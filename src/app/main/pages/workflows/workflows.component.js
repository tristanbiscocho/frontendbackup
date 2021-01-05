"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var fuseUtils_1 = require('../../../../core/fuseUtils');
var workflowsComponent = (function () {
    function workflowsComponent(authService, router) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.workflows = [];
        this.FilteredorgWorkFlows = [];
        this.FilteredAdminWorkflows = [];
        this.currentindex = 0;
        this.OrgWorkflows = [];
        this.AdminWorkflows = [];
        this.TempOrgData = [];
        this.TempAdminData = [];
        this.flag = 7;
        this.workflows = [];
        this.OrgWorkflows = [];
        this.FilteredorgWorkFlows = [];
        this.FilteredAdminWorkflows = [];
        this.authService.showloader = true;
        this.searchInput = new forms_1.FormControl('');
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
        if (this.currentuser.Roles == 3) {
            //all workflow list for Admin
            this.authService.GetAllWorkFlowList(0).then(function (result) {
                var temparray = [];
                _this.authService.showloader = false;
                if (result.Message == "False") {
                    _this.AdminWorkflows = [];
                    _this.OrgWorkflows = [];
                    _this.authService.showloader = false;
                }
                else {
                    _this.workflows = result;
                    for (var _i = 0, _a = _this.workflows; _i < _a.length; _i++) {
                        var workflow = _a[_i];
                        if (workflow.WorkFlowFor == 0 && workflow.CreatedBy == 0) {
                            _this.TempOrgData.push(workflow);
                            _this.OrgWorkflows = _this.TempOrgData;
                        }
                        else if (workflow.WorkFlowFor == 1) {
                            _this.TempAdminData.push(workflow);
                            _this.AdminWorkflows = _this.TempAdminData;
                        }
                    }
                    _this.FilteredorgWorkFlows = _this.OrgWorkflows;
                    _this.FilteredAdminWorkflows = _this.AdminWorkflows;
                    _this.authService.showloader = false;
                    _this.TempAdminData = [];
                    _this.TempOrgData = [];
                }
            });
        }
        else {
            this.authService.GetAllWorkFlowList(this.currentuser.OrgId).then(function (result) {
                _this.authService.showloader = false;
                if (result.Message == "False") {
                    _this.AdminWorkflows = [];
                    _this.OrgWorkflows = [];
                    _this.authService.showloader = false;
                }
                else {
                    _this.workflows = result;
                    for (var _i = 0, _a = _this.workflows; _i < _a.length; _i++) {
                        var workflow = _a[_i];
                        if (workflow.WorkFlowFor == 0) {
                            _this.TempOrgData.push(workflow);
                            _this.OrgWorkflows = _this.TempOrgData;
                        }
                    }
                    _this.FilteredorgWorkFlows = _this.OrgWorkflows;
                    _this.authService.showloader = false;
                }
            });
        }
    }
    workflowsComponent.prototype.GetWorkFlow = function (Id) {
        this.router.navigate(['/pages/add-workflow/' + Id + '/' + 3]);
    };
    workflowsComponent.prototype.onLinkClick = function (name) {
        this.currentindex = name.index;
    };
    workflowsComponent.prototype.getLanguage = function (key) {
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
    workflowsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchInput.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(function (searchText) {
            if (_this.currentindex == 0) {
                _this.OrgWorkflows = fuseUtils_1.FuseUtils.filterArrayByString(_this.FilteredorgWorkFlows, searchText);
            }
            else {
                _this.AdminWorkflows = fuseUtils_1.FuseUtils.filterArrayByString(_this.FilteredAdminWorkflows, searchText);
            }
        });
    };
    workflowsComponent = __decorate([
        core_1.Component({
            selector: 'workflows',
            templateUrl: './workflows.component.html',
            styleUrls: ['./workflows.component.scss']
        })
    ], workflowsComponent);
    return workflowsComponent;
}());
exports.workflowsComponent = workflowsComponent;
