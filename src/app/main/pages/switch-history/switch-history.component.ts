import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { AdminSwitchHistoryService } from '../admin-switch-history/admin-switch-history.service';
import { ActivatedRoute } from '@angular/router';
import { SupplierPlanModalComponent } from '../Authentication/register/supplier-plan/supplier-plan.component';
import { MatDialog } from '@angular/material';



@Component({
    selector   : 'switch-history',
    templateUrl: './switch-history.component.html',
    styleUrls  : ['./switch-history.component.scss']
})
export class SwitchHistoryComponent implements OnInit
{
    currentUser: any;
    switchHistory: any;
    credits: any;
    customerId: any;
    customerUId: any;
    pageOffset: any;
    customerPageOffset: any;
    dialogRef1s: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _switchService: AdminSwitchHistoryService,
        public _activeRoute: ActivatedRoute,
        public dialog: MatDialog,
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
        this._activeRoute.params.forEach(params => {
            const getcustomerId = params['ID'];
            if (getcustomerId !== undefined) {
                this.customerId = getcustomerId;
            }
        });
        this._activeRoute.params.forEach(params => {
            const getCustomerUid = params['userId'];
            const pageOffset = params['PAGEOFFSET'];
            const customerPageOffset = params['CUSTOMERPAGEOFFSET'];
            if (!!getCustomerUid){
                this.customerUId =  getCustomerUid;
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
        this.getSwitchHistory();
        
    }

    getSwitchHistory(): any {
        
        let data;
        if (!!this.customerId){
            data = {
                id: this.customerId,
                userId: this.customerUId
            };
        } else {
            data = {
                id: this.currentUser.CustomerId,
                userId: this.currentUser.Id
            };
        }
       
        this._switchService.getCustomerSwitchDetail(data).subscribe( (response: any) => {
            
            if (response.status_code == 0){
                this.credits = response.data.ReferralCredit;
                this.switchHistory = response.data.SwitchPlans;
                
            } else {
                this.credits = null;
                this.switchHistory = null;
            }
        });
    }

    viewDetails(data): any {
        
        let elecOld;
        let eleNew;
        let gasOld;
        let gasNew;
        this._switchService.getPlanDataById(data.ElectricityPlanFrom_ID).subscribe( (response: any) => {
            elecOld = response;
           
                    this._switchService.getPlanDataById(data.ElectricityPlanToId_ID).subscribe( (response3: any) => {
                        eleNew = response3;
                        if(!!data.GasPlanFromID) {
                            this._switchService.getPlanDataById(data.GasPlanFromID_ID).subscribe( (response1: any) => {
                                gasOld = response1;
                                this._switchService.getPlanDataById(data.GasPlanToId_ID).subscribe( (response2: any) => {
                                    gasNew = response2;
                            this.dialogRef1s = this.dialog.open(SupplierPlanModalComponent, {
                                panelClass: 'supplier-plan',
                                data: 
                                {
                                    elecOld: JSON.parse(elecOld.data.PlanData),
                                    eleNew: JSON.parse(eleNew.data.PlanData),
                                    gasNew: JSON.parse(gasNew.data.PlanData),
                                    gasOld: JSON.parse(gasOld.data.PlanData)
            
                                }
                            });
                            this.dialogRef1s.afterClosed()
                    .subscribe(() => {
                    });
                        });
                    });
                        } else {
                            this.dialogRef1s = this.dialog.open(SupplierPlanModalComponent, {
                                panelClass: 'supplier-plan',
                                data: 
                                {
                                    elecOld: JSON.parse(elecOld.data.PlanData),
                                    eleNew: JSON.parse(eleNew.data.PlanData)
            
                                }
                            });
                            this.dialogRef1s.afterClosed()
                    .subscribe(() => {
                    });
                        }
                        
                
            });
           
        });
       
        
    }
}
