import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SupplierPlanDetails } from "../../supplier/supplier-classes";
import * as _ from 'lodash';
import { SupplierService } from "../../supplier/supplier.service";
import { MessageService } from "primeng/components/common/messageservice";
import { LoaderService } from "app/main/services/loader.service";

@Component({
    selector     : 'add-plan',
    templateUrl  : './add-plan.component.html',
    styleUrls    : ['./add-plan.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AddPlanFormDialogComponent implements OnInit
{
   
    dialogTitle: string;
    type: any;
    AddPlanForm: FormGroup;
    AddPlanFormErros: any;
    supplierId: any;
    supplierDetails: any;
    showLoader: any;
    constructor(
        public dialogRef: MatDialogRef<AddPlanFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _suuplierSerivce: SupplierService,
        public messageService: MessageService,
        private _loaderService: LoaderService
    )
    {
        this.supplierId = data.supplierId;
        this.supplierDetails = data.details;
        this.AddPlanFormErros = {
            SupplierId: {},
            PlanName: {},
            PlanType : {},
            Status: {},
            Id: {}
        };
    }

    ngOnInit(): any
    {
        this.AddPlanForm = this.formBuilder.group({
            SupplierId: [this.supplierId, Validators.required],
            PlanName: ['', Validators.required],
            PlanType: ['1', Validators.required],
            Status: ['1', Validators.required],
            Id: ['']
          });
          if (!!this.supplierDetails){
              this.AddPlanForm.patchValue(this.supplierDetails);
          }
          this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }


    addPlan(): any {
        
        const supplier = new SupplierPlanDetails();
        Object.assign(supplier, this.AddPlanForm.value);
        const data = _.omit(supplier, ['Id']);
        this._suuplierSerivce.addSupplierPlan(data).subscribe(
            response => {
             if (response.status_code === 200){
                
                this.dialogRef.close({data: response});
             } else {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Error in adding supplier.'});
             }
            },
            error => {
              }
            );
    }

    editPlan(): any{
        const supplier = new SupplierPlanDetails();
        Object.assign(supplier, this.AddPlanForm.value);
        this._suuplierSerivce.editSupplierPlan(supplier).subscribe(
            response => {
             if (response.status_code === 200){
                this.dialogRef.close({data: response});
             } else {
                this.messageService.add({severity: 'warn', summary: 'Error', detail: 'Error in editing supplier plan.'});
             }
            },
            error => {
              }
            );
    }
   
}
