"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var material_1 = require('@angular/material');
var forms_1 = require('@angular/forms');
var FieldSelectDialogComponent = (function () {
    function FieldSelectDialogComponent(dialogRef, data, formBuilder, authService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.disabled = true;
        this.typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
        
        this.action = data.action;
        this.emailsdata = data.FieldData;
        if (this.action === 'edit') {
            
        }
        else {
            
            this.dialogTitle = 'Select Field';
            this.disabled = false;
        }
        this.resourceFormErrors = {
            field: {}
        };
    }
    FieldSelectDialogComponent.prototype.changeListener = function ($event) {
        
        this.readThis($event.target);
    };
    FieldSelectDialogComponent.prototype.readThis = function (inputValue) {
        var _this = this;
        
        var file = inputValue.files[0];
        var myReader = new FileReader();
        this.file = file.name;
        myReader.onloadend = function (e) {
            var image = myReader.result;
            
            _this.FileUp = image;
            _this.authService.binarydata = null;
            _this.authService.binarydata = image;
            var files = image;
        };
        myReader.readAsDataURL(file);
    };
    FieldSelectDialogComponent.prototype.ngOnInit = function () {
        this.resourceForm = this.formBuilder.group({
            field: ['', forms_1.Validators.required]
        });
        this.resourceForm.valueChanges.subscribe(function () {
        });
    };
    FieldSelectDialogComponent = __decorate([
        core_1.Component({
            selector: 'FieldSelect-dialog',
            templateUrl: './FieldSelect.component.html',
            styleUrls: ['./FieldSelect.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA))
    ], FieldSelectDialogComponent);
    return FieldSelectDialogComponent;
}());
exports.FieldSelectDialogComponent = FieldSelectDialogComponent;
