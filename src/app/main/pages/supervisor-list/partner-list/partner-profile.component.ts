import { Component, ViewEncapsulation, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormControlName } from '@angular/forms';
import * as _ from 'lodash';
import { MessageService } from 'primeng/components/common/messageservice';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { SupervisorService } from '../supervisor-list.service';
import { debounceTime } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;


export const MY_FORMATS = {
    parse: {
        dateInput: 'L',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD/MM/YYYYY',
        monthYearA11yLabel: 'MMM YYYY',
    },
};




@Component({
    selector: 'supervisor-partner-form-dialog',
    templateUrl: './partner-profile.component.html',
    styleUrls: ['./partner-profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})

export class SupervisorFormDialogComponent implements OnInit {

    dialogTitle: string;
    type: any;
    partnerList: any;
    partners: any;
    selectedPartners: any;
    searchPartner: FormControl ;
    filterByParters: any[];
    constructor(
        public dialogRef: MatDialogRef<SupervisorFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private changeDetectorRefs: ChangeDetectorRef,
        public messageService: MessageService,
        public _supervisorService: SupervisorService
    ) {
        
        this.selectedPartners = data.data;
        this.searchPartner = new FormControl('');

    }

    ngOnInit(): any {
        this.getPartnerData();
        this.searchPartner.valueChanges
        .pipe(debounceTime(400))
        .subscribe(searchText => {
        this.partnerList = FuseUtils.filterArrayByString(this.filterByParters, searchText);
      });
    }

    getPartnerData(): any {
        this._supervisorService.getAllPartners().subscribe(
            response => {
                if (response.status_code === 0) {
                    this.partnerList = response.data;
                    this.filterByParters = response.data;
                    if (!!this.partnerList && this.partnerList.length >= 1) {
                        this.partnerList = [];
                        this.filterByParters = [];
                        let selectedIds = (!!this.selectedPartners && this.selectedPartners.length >= 1) ? _.map(this.selectedPartners, 'Id') : [];
                        _.each(response.data, data => {
                            if (!_.includes(selectedIds, data.PartnerId)) {
                                this.partnerList.push(data);
                                this.filterByParters.push(data);
                            }
                        });
                    }
                    
                    for (let i = 0; i < this.partnerList.length; i++) {
                        this.partnerList[i].isChecked = false;
                        this.partnerList[i].Id = this.partnerList[i].PartnerId;
                    }
                } else {
                    this.partnerList = [];
                }
            });
    }
    savePartner(): any {
        this.dialogRef.close(this.partners);
    }

    selectedPartner(event, i): any {
        let data = _.filter(this.partnerList, home => {
            return home.isChecked;
        });
        this.partners = data;
        // _.map(data, "PartnerId");
    }
}

