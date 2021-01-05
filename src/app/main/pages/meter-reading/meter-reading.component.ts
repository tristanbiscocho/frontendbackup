
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { FuseConfigService } from '@fuse/services/config.service';

import { AddMeterFormDialogComponent } from './add-meter-reading/add-meter-reading.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageService } from 'primeng/components/common/messageservice';
import { MeterReadingService } from './meter-reading.service';
import { ActivatedRoute } from '@angular/router';
// import { EditMeterFormDialogComponent } from './edit-meter-reading/add-meter-reading.component';
import { ReasonDialogComponent } from '../meter-reading-for-reason/reason-dialog/reason-dialog.component';



@Component({
    selector: 'meter-reading',
    templateUrl: './meter-reading.component.html',
    styleUrls: ['./meter-reading.component.scss']
})
export class MeterReadingComponent {
    users: any[];
    param1: any;
    reasons: any = [];
    dialogRef: any;
    event: any = 0;
    currentUser: any;
    meterReading: any;
    customerId: any;
    EnergyType: any;
    customerName: any;
    pageOffset: any;
    IsBlocked: any = false;
    isEconomicMeterReadming: any;
    previousMeterReading: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _meterReadingService: MeterReadingService,
        public _activeRoute: ActivatedRoute,
        public route: ActivatedRoute
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
        const currentuserdata = localStorage.getItem('UserDetail');

        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
        // this.route.queryParams.subscribe(params => {
        //     if(this.route.snapshot.queryParams.prop == "true")
        //     {


        //     }


        // });
        this._activeRoute.params.forEach(params => {
            // get suuplier id from route
            const getCoustomerId = params['CUSTOMERID'];
            const pageOffset = params['USEROFFSET'];
            if (getCoustomerId !== undefined) {
                this.customerId = getCoustomerId;
            }
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
            const getEnergyType = params['ENERGYID'];
            if (!!getEnergyType) {
                this.EnergyType = getEnergyType;
            } else {
                this.EnergyType = this.currentUser.EnergyTypeId;
            }
        });
        const data = {
            SearchText: '',
            IsEconomy: null,
            CustomerID:this.customerId
        };
        this.getMeterReadingData();
        this.getMeterreadingdatareason(data);



    }



    addReadingMeter(): any {
        this.dialogRef = this.dialog.open(AddMeterFormDialogComponent, {
            panelClass: 'add-meter-reading-form-dialog',
            data: {
                event: this.event,
                customerID: this.customerId,
                EnergyType: this.EnergyType,
                isEconomicMeterReadming: this.isEconomicMeterReadming,
                perviousMeterReadingData: this.previousMeterReading
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!!response) {
                    // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Reading added successfully.'});
                    this.getMeterReadingData();
                }

            });
    }

    // editReadingMeter(): any {
    //     this.dialogRef = this.dialog.open(EditMeterFormDialogComponent, {
    //         panelClass: 'add-meter-reading-form-dialog',
    //         data: {
    //             event: this.event,
    //             customerID: this.customerId,
    //             EnergyType: this.EnergyType,
    //             isEconomicMeterReadming: this.isEconomicMeterReadming,
    //             perviousMeterReadingData: this.previousMeterReading
    //         }
    //     });
    //     this.dialogRef.afterClosed()
    //     .subscribe(response => {
    //      if (!!response) {
    //             // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Reading added successfully.'});
    //             this.getMeterReadingData();
    //       }

    //     });
    // }

    getMeterReadingData(): any {
        let id;
        if (!!this.customerId) {
            id = this.customerId;
        } else {
            id = this.currentUser.CustomerId;
        }
        this._meterReadingService.getReading(id).subscribe(
            response => {

                if (response.status_code === 0) {
                    this.meterReading = response.data;

                    this.customerName = response.data.CustomerName;
                    this.IsBlocked = response.data.IsBlocked;
                    this.isEconomicMeterReadming = response.data.IsElectricMeterReading;
                    this.previousMeterReading = response.data.PreviousConfig;
                } else {
                    this.meterReading = [];
                }
            });
    }

    setValue(event): any {
        this.event = event;
    }

    viewReasons(row): any {

        this.dialogRef = this.dialog.open(ReasonDialogComponent, {
            panelClass: 'reason-dialog',
            data: {
                data: row,
            }
        });
    }

    getMeterreadingdatareason(data): any {
        
        this._meterReadingService.getMeterreadingreasons(data).subscribe(res => {
            if (res.status_code === 0) {
                this.reasons = res.data;

            } else {
                this.reasons = [];
            }
        });
    }

}
