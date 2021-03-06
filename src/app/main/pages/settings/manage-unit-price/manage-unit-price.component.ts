import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatRadioChange } from '@angular/material';
import { SettingsService } from '../settings.service';
@Component({
    selector: 'manage-unit-price',
    templateUrl: './manage-unit-price.component.html',
    styleUrls: ['./manage-unit-price.component.scss']
})
export class ManageUnitPriceComponent implements OnInit {
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
    ElectricityDataForEconomic: any;
    ElectricitydataForNoramal: any;
    IsValid: any = true;
    IsValidGas: any = true;
    IsValidEconomy: any = true;
    IsValidNormal: any = true;
    historydetails: any;
    IsHistory: any = false;
    ElectricitydataForRegular: any;
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
        this.getSurchargeList();
        this.getHistoryDetails();
    }

    getSurchargeList(): any {
        this._settingSerivce.GetUnitPriceList().subscribe(
            response => {
                if (response.status_code == 0){
                    this.ConsumptionHistory = response.data;
                    this.ElectricityData =  this.ConsumptionHistory.filter(x => x.EnergyType == 2);
                    this.ElectricitydataForNoramal = this.ElectricityData.filter(x => x.MeterType == 1);
                    this.ElectricityDataForEconomic = this.ElectricityData.filter(x => x.MeterType == 2);
                    this.ElectricitydataForRegular = this.ElectricityData.filter(x => x.MeterType == 3);
                    this.GasData =  this.ConsumptionHistory.filter(x => x.EnergyType == 1); 
                } else {
                    this.ConsumptionHistory = null;
                }
            });
    }

    getHistoryDetails(): any {
        this._settingSerivce.getUnitHistory().subscribe(
            response => {
                if (response.status_code == 0){
                    this.historydetails = response.data;
                } else {
                    this.historydetails = null;
                }
            });
    }

    updateEconomicMeter(): any {
        const data = this.ElectricityDataForEconomic;
        this._settingSerivce.UpdateUnit(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Electricity Unit Price updated successfully.' });
                    this.getSurchargeList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Electricity Unit Price.' });
                }
        });
    }

    updateNormalMeter(): any {
        const data = this.ElectricitydataForNoramal;
        this._settingSerivce.UpdateUnit(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Electricity Unit Price updated successfully.' });
                    this.getSurchargeList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Electricity Unit Price.' });
                }
        });
    }
    updateRegularMeter(): any {
        const data = this.ElectricitydataForRegular;
        this._settingSerivce.UpdateUnit(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Electricity Unit Price updated successfully.' });
                    this.getSurchargeList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Electricity Unit Price.' });
                }
        });
    }

    updateGasSurcharge(): any {
        const data = this.GasData;
        this._settingSerivce.UpdateUnit(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gas Unit Price updated successfully.' });
                    this.getSurchargeList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Gas Unit Price.' });
                }
        });
    }

    ValidateInput(event): any {
        
        let data = event.target.value;
        for(let details of this.ElectricitydataForRegular) {
           
            if(details.NormalPrice != null || details.NormalPrice != undefined) {
                details.NormalPrice = Number(details.NormalPrice);
                if (details.NormalPrice > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValid = true;
                    break;
                } else if (details.NormalPrice < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValid = true;
                    break;
                } else {
                    this.IsValid = false;
                }
            } else {
                this.IsValid = true;
                details.NormalPrice = 0;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
        
        
    }

    ValidateInputNormal(event): any {
        let data = event.target.value;
        for(let details of this.ElectricitydataForNoramal) {
            
            if(details.NormalPrice != null || details.NormalPrice != undefined) {
                details.NormalPrice = Number(details.NormalPrice);
                if (details.NormalPrice > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValidNormal = true;
                    break;
                } else if (details.NormalPrice < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValidNormal = true;
                    break;
                } else {
                    this.IsValidNormal = false;
                }
            } else {
                details.NormalPrice = 0;
                this.IsValidNormal = true;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
        
        
    }


    ValidateInputEconomy(event): any {
        let data = event.target.value;
        for(let details of this.ElectricityDataForEconomic) {
            if(details.LowPrice != null || details.LowPrice != undefined) {
                details.LowPrice = Number(details.LowPrice);
                if (details.LowPrice > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValidEconomy = true;
                    break;
                } else if (details.LowPrice < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValidEconomy = true;
                    break;
                } else {
                    this.IsValidEconomy = false;
                }
            } else {
                details.LowPrice = 0;
                this.IsValidEconomy = true;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
        
        
    }


    ValidateInputGas(event): any {
        let data = event.target.value;
        for(let details of this.GasData) {
           
            if(details.NormalPrice != null || details.NormalPrice != undefined) {
                details.NormalPrice = Number(details.NormalPrice);
                if (details.NormalPrice > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValidGas = true;
                    break;
                } else if (details.NormalPrice < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValidGas = true;
                    break;
                } else {
                    this.IsValidGas = false;
                }
            } else {
                details.NormalPrice = 0;
                this.IsValidGas = true;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
        
        
    }
}
