import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSwitchHistoryService } from '../admin-switch-history/admin-switch-history.service';
import { SupplierService } from '../supplier/supplier.service';
import { SettingsService } from '../settings/settings.service';
import { MessageService } from 'primeng/components/common/messageservice';
import * as _ from 'lodash';
import Swal from "sweetalert2";


@Component({
    selector: 'create-switch-history',
    templateUrl: './create-switch-history.component.html',
    styleUrls: ['./create-switch-history.component.scss']
})
export class CreateSwitchHistoryComponent implements OnInit {
    bills: any[];
    customerId: any;
    switchDetails: any;
    pooldata: any;
    suppliers: any;
    elecSupplierId: any;
    gasAndElecSupplierId: any;
    elecSupplierPlanId: any;
    gasAndElecSupplierPlanId: any;
    getElePlanName: any;
    getGasAndElcName: any;
    gasAndElecSupplierName: any;
    elecSupplierName: any;
    elecPlanId: any;
    gasElecPlanId: any;
    elecPlanName: any;
    gasElecPlanName: any;
    plans: any;
    energyTypeId: any;
    gasSupplier: any;
    packages: any;
    packageId: any;
    supplierId: any;
    planId: any;
    customerUId: any;
    packageName: any;
    packageAmount: any;
    supplierPlans: any;
    pageOffset: any;
    customerPageOffset: any;
    IsSWitchedsuppliers: any;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public _activeRoute: ActivatedRoute,
        public _switchService: AdminSwitchHistoryService,
        public _supplierService: SupplierService,
        public _settingSerivce: SettingsService,
        public messageService: MessageService,
        public router: Router
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: false
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['userId'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
        });
        this._activeRoute.params.forEach(params => {
            const getcustomerUId = params['customerId'];
            const pageOffset = params['PAGEOFFSET'];
            const customerPageOffset = params['CUSTOMERPAGEOFFSET'];
            if (getcustomerUId !== undefined) {
                this.customerUId = getcustomerUId;
            }
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
            if (!!customerPageOffset) {
                this.customerPageOffset = customerPageOffset;
            }
        });

    }

    ngOnInit(): any {
        this.getPackages();

        this.getSuppliers();
    }
    getPackages(): any {
        this._settingSerivce.getPackageList().subscribe(
            response => {
                
                if (response) {
                    this.packages = response;
                } else {
                    this.packages = [];
                }
            });
    }

    switchDetail(): any {
        this._switchService.getSwitchDetail(this.customerId).subscribe(response => {
            if (response.status_code == 0) {
                this.switchDetails = response.data;
                this.pooldata = response.data.PoolDetails;
                this.elecSupplierId = response.data.ElectricityCurrentSupplierId;
                this.gasAndElecSupplierId = response.data.GasCurrentSupplierId;
                this.elecPlanId = response.data.ElectricityCurrentPlanId;
                this.gasElecPlanId = response.data.GasCurrentPlanId;
                this.energyTypeId = response.data.EnergyTypeId;
                this.packageId = response.data.PackageId;
                if (!!this.packageId || this.packageId != 0) {
                    this.packageName = this.packages.find(x => x.Id == this.packageId).Name;
                    this.packageAmount = this.packages.find(x => x.Id == this.packageId).Amount;
                }
                if (!!this.elecSupplierId || this.elecSupplierId != 0) {
                    this.elecSupplierName = this.suppliers.find(x => x.ID == this.elecSupplierId).Name;
                }
                if (!!this.gasAndElecSupplierId || this.gasAndElecSupplierId != 0) {
                    this.gasAndElecSupplierName = this.suppliers.find(x => x.ID == this.gasAndElecSupplierId).Name;
                }
                if (this.energyTypeId == 1) {
                    this.suppliers = this.IsSWitchedsuppliers.filter(x => x.EnergyTypeID == 1);
                } else {
                    this.suppliers = this.IsSWitchedsuppliers;
                }

                this.getSupplierElcPlans(this.elecSupplierId, this.gasAndElecSupplierId);
            } else {
                this.switchDetail = null;
            }
        });
    }

    getSuppliers(): any {
        const data = {
            searchText : '',
            energyTypeId : null
        };
        this._supplierService.getSupplier(data).subscribe(
            response => {
                if (response.status_code === 200) {
                    this.suppliers = response.data;
                    this.gasSupplier = response.data;
                    this.suppliers = _.filter(response.data, d => {
                        return d.Status == '1';
                    });
                    this.IsSWitchedsuppliers = _.filter(this.suppliers, d => {
                        return d.IsCanUsedForSwitch == true;
                    });

                } else {
                    this.suppliers = [];
                }
                this.switchDetail();

            });
    }

    getSupplierPlans(value): any {
        this._supplierService.getSupplierLists(value.value).subscribe(
            resposne => {
            this.supplierPlans = resposne.data;

        }
        );
    }

    getSupplierElcPlans(elecsupId, gasElcSupID): any {
        let data = [];
        if(elecsupId != 0){
            data.push(elecsupId);
        } 
        if(gasElcSupID != 0){
        data.push(gasElcSupID);
        }


        this._supplierService.getSupplierplans(data).subscribe(
            response => {
                if (response.status_code = 200){
                this.plans = response.data;
                if (this.plans.length > 0){

                
                if (!!this.gasElecPlanId || this.gasElecPlanId != 0 ){
                this.gasElecPlanName = this.plans.find(x => x.Id == this.gasElecPlanId).PlanName;
                } 
                if (!!this.elecPlanId || this.elecPlanId != 0){
                this.elecPlanName = this.plans.find(x => x.Id == this.elecPlanId).PlanName;
            }
                }
            }
            });
    }

    switchNow(): any {
 
        let data;
        if(this.energyTypeId ==  1){
            data = {
                CustomerID: this.customerId,
                ElectricityPlanFromID: this.elecSupplierId,
                ElectricityPlanToId: this.supplierId,
                Date: null,
                Status: null,
                PoolId: this.pooldata[0].Id,
                GasPlanFromID: this.gasAndElecSupplierId,
                GasPlanToId: this.supplierId,
                NewGasPlanId: this.planId,
                NewElectricityPlanId: this.planId
            };
        } else {
            data = {
                CustomerID: this.customerId,
                ElectricityPlanFromID: this.elecSupplierId,
                ElectricityPlanToId: this.supplierId,
                Date: null,
                Status: null,
                PoolId: this.pooldata[0].Id,
                GasPlanFromID: null,
                GasPlanToId: null,
                NewGasPlanId: null,
                NewElectricityPlanId: this.planId
            };
        }
        if((!!data.ElectricityPlanToId || !!data.GasPlanToId) && (!!data.NewGasPlanId || !!data.NewElectricityPlanId))
        {
        this._switchService.addSwitchDetail(data).subscribe((response: any) => {
            if (response.status_code == 200) {
                this.router.navigate(['/admin-switch-history/' + this.customerId + '/' + this.customerUId + '/' + this.customerPageOffset + '/' + this.pageOffset]);
                Swal.fire({
                    type: "success",
                    title: "Succees",
                    text:
                        "Switch done successfully."
                });
                //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Switch done successfully.' });
            } else {
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in  switch supplier.' });
            }
        });
        }
        else
        {
            Swal.fire({
                type: "error",
                    title: "Error",
                    text:
                        "Please Choose New Supplier and Plan."
            })
        }

    }
}
