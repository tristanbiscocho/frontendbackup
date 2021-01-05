import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatRadioChange } from '@angular/material';
import { SettingsService } from '../settings.service';
@Component({
    selector: 'manage-fixed-cost',
    templateUrl: './manage-fixed-cost.component.html',
    styleUrls: ['./manage-fixed-cost.component.scss']
})
export class ManageFixedCostComponent implements OnInit {
    settingsCount: any;
    settings: any;
    settingsForm: FormGroup;
    fixedAmount = "Referral_discount_Fixed";
    discountPercentage = "Referral_discount_Percentage";
    ID = 1;
    ElectricityData: any;
    ConsumptionHistory: any[];
    GasData: any;
    @Output() change: EventEmitter<MatRadioChange>;
    settingsValue: any;
    serviceCharge: any;
    IsValid: any = true;
    IsValidGas: any = true;
    historydetails: any;
    IsHistory: any = false;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _settingSerivce: SettingsService,
        private formBuilder: FormBuilder,
        public messageService: MessageService
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
    }

    ngOnInit(): any {
        this.settingsForm = this.formBuilder.group({
            Setting_Key: [this.fixedAmount, Validators.required],
            Setting_Value: [this.settingsValue, Validators.required],
            Id: [this.ID]
        });
        this.GetFixedPriceList();
        this.getHistoryDetails();
    }

    GetFixedPriceList(): any {
        this._settingSerivce.GetFixedPriceList().subscribe(
            response => {
                if (response.status_code == 0){
                    this.ConsumptionHistory = response.data;
                    this.ElectricityData =  this.ConsumptionHistory.filter(x => x.EnergyType == 2);
                    this.GasData =  this.ConsumptionHistory.filter(x => x.EnergyType == 1); 
                } else {
                    this.ConsumptionHistory = null;
                }
            });
    }

    updateElectricitySurcharge(): any {
        const data = this.ElectricityData;
        this._settingSerivce.UpdateFixed(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Electricity Standing Charges updated successfully.' });
                    this.GetFixedPriceList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Electricity Standing Charges.' });
                }
        });
    }

    updateGasSurcharge(): any {
        const data = this.GasData;
        this._settingSerivce.UpdateFixed(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gas Standing Charges updated successfully.' });
                    this.GetFixedPriceList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Gas Standing Charges.' });
                }
        });
    }

    ValidateInput(event): any {
        let data = event.target.value;
        for(let details of this.ElectricityData) {
            if(details.Value != null && details.Value >= 0) {
                if (details.Value > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValid = true;
                    break;
                } else if (details.Value < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValid = true;
                    break;
                } else {
                    this.IsValid = false;
                }
            } else {
                this.IsValid = true;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
        
        
    }

    ValidateInputGas(event): any {
        let data = event.target.value;
        for (let details of this.GasData) {
            if (details.Value != null && details.Value >= 0) {
                if (details.Value > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValidGas = true;
                    break;
                } else if (details.Value < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValidGas = true;
                    break;
                } else {
                    this.IsValidGas = false;
                }
            } else {
                this.IsValidGas = true;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
        
        
    }

    getHistoryDetails(): any {
        this._settingSerivce.getFixedHistory().subscribe(
            response => {
                if (response.status_code == 0){
                    this.historydetails = response.data;
                } else {
                    this.historydetails = null;
                }
            });
    }
}
