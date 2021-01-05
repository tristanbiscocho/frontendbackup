import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MyReferralsService } from './my-referrals.service';
import { SettingsService } from '../settings/settings.service';
import { MessageService } from 'primeng/components/common/messageservice';



@Component({
    selector   : 'my-referrals',
    templateUrl: './my-referrals.component.html',
    styleUrls  : ['./my-referrals.component.scss']
})
export class MyReferralsComponent implements OnInit
{
    reffralCount: any;
    currentUser: any;
    EmailAddress: any;
    settings: any;
    emailPattern: any
    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _myReferralsService: MyReferralsService,
        public _settingSerivce: SettingsService,
        public messageService: MessageService
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
    }

    ngOnInit(): any {
        this.getReffralCount(this.currentUser.Id);
        this.getSettingsList();
    }

    getReffralCount(id): any{
        this._myReferralsService.getReffralCount(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.reffralCount = response.data;
                  } else {
                    this.reffralCount = null;
                  }
            });
    }

    addMyReferrals(): any{
        const data = {
            ReferralId : this.currentUser.Id,
            EmailAddress : this.EmailAddress,
            ReferralStatus : 47 
        };
        if(this.emailPattern.test(data.EmailAddress)  == true) {

        
        this._myReferralsService.addReferrals(data).subscribe(data => {
            if (data.status_code == 200){
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Invite sent successfully.' });
                this.EmailAddress = null;
                this.getReffralCount(this.currentUser.Id);
            } else {
                this.messageService.add({ 
                    severity: 'warn', 
                    summary: 'Error', 
                    detail: 'Already sent referral by other person on this Email address. Or User is already registered in the system.' });
            }
        });
    } else {
        this.messageService.add({ 
            severity: 'warn', 
            summary: 'Error', 
            detail: 'Please enter valid Email address' });
        }
    }

    getSettingsList(): any {
        this._settingSerivce.getSettingsList().subscribe(
            response => {
                if (response.status_code === 200) {
                    this.settings = response.data;
                } else {
                    this.settings = null;
                }
            }
        );
    }
}
