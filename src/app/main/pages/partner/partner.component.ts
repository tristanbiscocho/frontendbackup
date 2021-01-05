import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { ManageProfileFormDialogComponent } from './partner-profile/partner-profile.component';
import { PartnerService } from './partner.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import * as _ from "lodash";
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit{
    
    // partners
    partners: any[];
    filterByParters: any[];

    // var for add or edit partners
    dialogRef: any;
    event: any = 0;

    // search from list
    searchPartner: FormControl;
    minheight: any;
    pageOffset: any;
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _partnerSerivce: PartnerService,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute,
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

        // function declaration for get partner details
        this.getPartner();

        // form control for serach partner 
        this.searchPartner = new FormControl('');
        const min = window.innerHeight - 200;
        this.minheight = min + 'px';
        this._activeRoute.params.forEach(params => {
            const pageOffset = params['OFFSET'];
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
        });
    }
    // END constructor

    onChange(event): any {
        this.pageOffset = event.offset;
    }
    // Start OnInit function
    ngOnInit(): void {

        // search partner
        this.searchPartner.valueChanges
            .pipe(debounceTime(400))
            .subscribe(searchText => {
            this.partners = FuseUtils.filterArrayByString(this.filterByParters, searchText);
          });

      }
      // End onInit



    // add partner / save partner 
    addPartner(): any {
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: 'partner-profile-form-dialog',
            data: {
                event: this.event
            }
        });
        this.dialogRef.afterClosed()
        .subscribe(response => {
         if (!!response) {
         
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Partner created successfully.'});
                this.getPartner();
            
          }
         
        });
    }

     // function defination for get partner details
    getPartner(): any {
        this._partnerSerivce.getPartner().subscribe(
            response => {
              if (response.status_code === 200) {
                this.partners = response.data;
                
                this.filterByParters = response.data;
                for (let data of this.partners){
                    data['userName'] = data.FirstName + ' ' + data.LastName;
                }
              } else {
                this.partners = [];
                this.filterByParters = [];
              }
            });
    }

    setValue(event): any {
        this.event = event;
    }

    // edit partner 
    editPartner(row): any{

        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: 'partner-profile-form-dialog',
            data: {
                event: this.event,
                data : row
            }
            
            
        });
        this.dialogRef.afterClosed()
        .subscribe(response => {
          if (!!response) {
            this.messageService.add({severity: 'success', summary: 'Success', detail: 'Partner updated successfully.'});
            this.getPartner();
          } else {
              return;
          }
         
        });
    }
}
