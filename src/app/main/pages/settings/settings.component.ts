import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { SettingsService } from './settings.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EditSettings } from './settings-classes';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatRadioChange } from '@angular/material';



@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    settingsCount: any;
    settings: any;
    settingsForm: FormGroup;
    fixedAmount = "Referral_discount_Fixed";
    discountPercentage = "Referral_discount_Percentage";
    ID = 1;
    @Output() change: EventEmitter<MatRadioChange>;
    settingsValue: any;
    serviceCharge: any;
    gasCharge: any=1;
    ElecCharge: any=1;
    Plan_Discount: any=1;
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
        this.getSettingsCount();
        this.getSettingsList();


    }

    getSettingsCount(): any {
        this._settingSerivce.getSettingsCount().subscribe(
            response => {
                if (response.status_code === 200) {
                    this.settingsCount = response.data;
                } else {
                    this.settingsCount = null;
                }
            }
        );
    }
    
    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe(
            response => {
                if (response.status_code === 200) {
                    this.settings = response.data;
                    this.settingsForm.patchValue(this.settings[0]);
                    this.serviceCharge = this.settings[2].Setting_Value;
                    this.gasCharge = this.settings[3].Setting_Value;
                    this.ElecCharge = this.settings[4].Setting_Value; 
                    this.Plan_Discount = this.settings[5].Setting_Value;
                } else {
                    this.settings = null;
                }
            }
        );
    }

    ediitSettings(): any {
        let settings = new EditSettings();
        Object.assign(settings, this.settingsForm.value);
        if (settings.Setting_Key == this.discountPercentage) {
            settings.Id = 2;
        } else {
            settings.Id = 1;
        }
        this._settingSerivce.editSettings(settings).subscribe(
            response => {
                if (response.status_code === 200) {
                    const settings = {
                        Id: 3,
                        Setting_Key: 'Service_Charge',
                        Setting_Value: this.serviceCharge
                    };
                    
                    this._settingSerivce.editSettings(settings).subscribe(
                        response => {
                            if (response.status_code === 200) {
                                const settings = {
                                    Id: 4,
                                    Setting_Key: 'Charge_Gas',
                                    Setting_Value: this.gasCharge
                                };


                                this._settingSerivce.editSettings(settings).subscribe(
                                    response => {
                                        if (response.status_code === 200) {
                                            const settings = {
                                                Id: 5,
                                                Setting_Key: 'Charge_Elc',
                                                Setting_Value: this.ElecCharge
                                            };
                                            this._settingSerivce.editSettings(settings).subscribe(
                                                response => {

                                                    if (response.status_code === 200) {
                                                        const settings = {
                                                            Id: 1004,
                                                            Setting_Key: 'Plan_Discount',
                                                            Setting_Value: this.Plan_Discount
                                                        };
                                                        this._settingSerivce.editSettings(settings).subscribe(
                                                            response => {
                                                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Settings updated successfully' });
                                                            });
                                                    } else {
                                                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update settings.' });
                                                    }
                                                });
                                        }
                                });

                                
                            } else {
                                this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update settings.' });
                            }
                    });

                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in update settings.' });
                }
            },
            error => {
            }
        );
    }

    radioChange(data): any {
        if (data.value == "Referral_discount_Fixed") {
            this.settingsForm.patchValue(this.settings[0]);
        } else {
            this.settingsForm.patchValue(this.settings[1]);
        }

    }
}
