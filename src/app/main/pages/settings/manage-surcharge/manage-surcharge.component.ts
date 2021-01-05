import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatRadioChange } from '@angular/material';
import { SettingsService } from '../settings.service';
@Component({
    selector: 'manage-surcharge',
    templateUrl: './manage-surcharge.component.html',
    styleUrls: ['./manage-surcharge.component.scss']
})
export class ManageSurchargeComponent implements OnInit {
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
    IsValidElc: any = true;
    gas_elc: any;
    elcOf_gas_elc: any;
    historydetails: any;
    IsHistory: any = false;
    isnull:boolean=false;
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
        this._settingSerivce.GetSurchargeList().subscribe(
            response => {
                if (response.status_code == 0){
                    this.ConsumptionHistory = response.data;
                    this.ElectricityData =  this.ConsumptionHistory.filter(x => x.EnergyType == 2);
                    this.gas_elc =  this.ConsumptionHistory.filter(x => x.EnergyType == 1); 
                    this.GasData = this.gas_elc.filter(x => x.SubEnergyType == 1);
                    this.elcOf_gas_elc = this.gas_elc.filter(x => x.SubEnergyType == 2);
                } else {
                    this.ConsumptionHistory = null;
                }
            });
    }

    updateElectricitySurcharge(): any {
        
        const data = this.ElectricityData;
        
        
       
                this._settingSerivce.UpdateSurcharge(data).subscribe(
                    response => {
                        if (response.status_code == 200){
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Electricity Surcharge updated successfully.' });
                            this.getSurchargeList();
                            this.getHistoryDetails();
                        } else {
                            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Electricity Surcharge.' });
                        }
                });
                
    }

    updateGasSurcharge(): any {
        const data = this.GasData;
        this._settingSerivce.UpdateSurcharge(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gas Surcharge updated successfully.' });
                    this.getSurchargeList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Gas Surcharge.' });
                }
        });
    }

    updateGasElecSurcharge(): any {
        const data = this.elcOf_gas_elc;
        this._settingSerivce.UpdateSurcharge(data).subscribe(
            response => {
                if (response.status_code == 200){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Gas Surcharge updated successfully.' });
                    this.getSurchargeList();
                    this.getHistoryDetails();
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update Gas Surcharge.' });
                }
        });
    }

    ValidateInput(event): any {
        
        let data = event.target.value;
        for(let details of this.ElectricityData) {
            if (details.Value != null && details.Value >= 0) {
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


    ValidateGasInput(event): any {
        let data = event.target.value;
        for(let details of this.GasData) {
            if(details.Value != null && details.Value >= 0) {
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

    ValidateInputElcGas(event): any {
        let data = event.target.value;
        for(let details of this.elcOf_gas_elc) {
            if(details.Value != null && details.Value >= 0) {
                if (details.Value > 100){
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please enter a value less than 100.' });
                    this.IsValidElc = true;
                    break;
                } else if (details.Value < 0) {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Entered values must not be negative." });
                    this.IsValidElc = true;
                    break;
                } else {
                    this.IsValidElc = false;
                }
            } else {
                this.IsValidElc = true;
                this.messageService.add({ severity: 'warn', summary: 'Error', detail: "Please enter proper value." });
                break;

            }
        }
    }

    
    getHistoryDetails(): any {
        this._settingSerivce.getSurchargeHistory().subscribe(
            response => {
                if (response.status_code == 0){
                    this.historydetails = response.data;
                } else {
                    this.historydetails = null;
                }
            });
    }
}
