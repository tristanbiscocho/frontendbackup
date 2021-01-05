import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import * as _ from "lodash";
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
import { SupervisorService } from '../supervisor-list.service';
@Component({
    selector: 'supervisor-partners',
    templateUrl: './supervisor-partners.component.html',
    styleUrls: ['./supervisor-partners.component.scss']
})
export class SupervisorPartnersComponent implements OnInit{
    
    // partners
    Supervisor: any[];
    filterBySupervisor: any[];

    // var for add or edit partners
    dialogRef: any;
    event: any = 0;

    // search from list
    searchPartner: FormControl;
    minheight: any;
    pageOffset: any;
    currentUser: any;
    supervisorID: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute,
        public _superviseorService: SupervisorService
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
            const pageOffset = params['OFFSET'];
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
            const supervisorID= params['USERID'];
            if(!!supervisorID){
                this.supervisorID = supervisorID;
            }
            
        });

        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }

     

        this.searchPartner =  new FormControl('');
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }
  
    // Start OnInit function
    ngOnInit(): void {

        // search partner
        this.searchPartner.valueChanges
            .pipe(debounceTime(400))
            .subscribe(searchText => {
            this.Supervisor = FuseUtils.filterArrayByString(this.filterBySupervisor, searchText);
          });
        this.getPartnerById(this.supervisorID);

      }

      // End onInit

      getPartnerById(id): any {
        this._superviseorService.getpartnerById(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.Supervisor = response.data;
                    this.filterBySupervisor = response.data;
                    for(let data of this.Supervisor){
                        data['total'] = data.CompletedReferralCount + data.FailReferralCount + data.PendingReferralCount;
                    }
                } else {
                    this.filterBySupervisor = [];
                    this.Supervisor =   [];
                }
            });
      }

 

}
