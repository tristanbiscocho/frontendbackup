"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var shared_module_1 = require('../../../../core/modules/shared.module');
var router_1 = require('@angular/router');
var workflows_component_1 = require('./workflows.component');
var routes = [
    {
        path: 'pages/workflows',
        component: workflows_component_1.workflowsComponent
    }
];
var workflowsModule = (function () {
    function workflowsModule() {
    }
    workflowsModule = __decorate([
        core_1.NgModule({
            declarations: [
                workflows_component_1.workflowsComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes)
            ]
        })
    ], workflowsModule);
    return workflowsModule;
}());
exports.workflowsModule = workflowsModule;
