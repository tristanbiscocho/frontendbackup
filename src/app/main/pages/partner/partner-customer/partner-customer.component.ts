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
import { SupervisorService } from '../../supervisor-list/supervisor-list.service';
import { CustomerService } from '../../customer-list/customer-list.service';
import { AuthService } from 'app/main/services/auth';

@Component({
    selector: 'partner-customer',
    templateUrl: './partner-customer.component.html',
    styleUrls: ['./partner-customer.component.scss']
})
export class PartnerCustomersComponent implements OnInit {

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
    currentUser: any;
    userId: any;
    flag: any;
    partnerData: any;
    partnerList: any=[];
    supervisorId: any;
    partnerName: any;
    toDate: any;
    fromDate: any;
    status: any;
    IsPartner: any;
    statusData:any;
    isSIgnUpConfirm = 10;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public messageService: MessageService,
        public _activeRoute: ActivatedRoute,
        public _supervisorService: SupervisorService,
        public _CustomerService: CustomerService,
        private _authService:AuthService
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
        // form control for serach partner 
        this.searchPartner = new FormControl('');
        const min = window.innerHeight - 200;
        this.minheight = min + 'px';
        this._activeRoute.params.forEach(params => {
            const pageOffset = params['OFFSET'];
            const userId = params['USERID'];
            const flag = params['FLAG'];
            const supervisorId = params['supervisorId'];
            const partnerName = params['userName'];
            const IsPartner = params['ISPARTNER'];
            
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
                
                
            }
            if (!!userId) {
                this.userId = userId;
            }
            if (!!flag) {
                this.flag = flag;
                
            }
            if (!!supervisorId) {
                this.supervisorId = supervisorId;
            }
            if (!!partnerName) {
                this.partnerName = partnerName;
            }
            if (!!IsPartner){
                this.IsPartner = IsPartner;
            }
        });

        if (this.currentUser.RoleType == 1 || this.currentUser.RoleType == 4 || this.currentUser.RoleType == 7 || this.currentUser.RoleType == 5) {
            this.partnerData = {
                PartnerUserId: this.userId,
                Status: this.flag,
                ToDate: null,
                FromDate: null,
                SearchText: null
            };
            this.getcustomerDetails(this.partnerData);
        }

        if (this.currentUser.RoleType == 3) {
            this.partnerData = {
                PartnerUserId: this.userId,
                Status: this.flag,
                ToDate: null,
                FromDate: null,
                SearchText: null
            };
            this.getcustomerDetails(this.partnerData);
        }

        if (this.currentUser.RoleType == 6) {
            this.partnerData = {
                PartnerUserId: this.userId,
                Status: this.flag,
                ToDate: null,
                FromDate: null,
                SearchText: null
            };
            this.getcustomerDetails(this.partnerData);
        }

        if (this.currentUser.RoleType == 2) {
            this.partnerData = {
                userId: this.currentUser.Id,
                isSignUpConfirmation: this.flag,
                ToDate: null,
                FromDate: null,
                searchText: null,
                CustomerId : this.currentUser.CustomerId
            };
            this.pageOffset = 0;
            this.getCustomerRefferalList(this.partnerData);
        }
    }
    // END constructor

    onChange(event): any {
        this.pageOffset = event.offset;
    }
    // Start OnInit function
    ngOnInit(): void {
        const sys_data = this._authService.getAllResourceData();
        this.statusData = sys_data.filter(x => x.ListID == 11);
        // search partner
        // this.searchPartner.valueChanges
        //     .pipe(debounceTime(400))
        //     .subscribe(searchText => {
        //     this.partners = FuseUtils.filterArrayByString(this.filterByParters, searchText);
        //   });
    }
    // End onInit

    getcustomerDetails(data): any {
        this._supervisorService.getCustomersList(data).subscribe(
            response => {
                if (response.status_code == 0) {
                    this.partnerList = response.data;
                    
                } else {
                    this.partnerList = [];
                }
            },
            error => {
            }
        );
    }

    getCustomerRefferalList(data): any {
        this._CustomerService.getCustomerRefferalList(data).subscribe(
            (response: any) => {
                if (response.status_code == 0) {
                    this.partnerList = response.data.CustomerReferralList;
                    
                } else {
                    this.partnerList = [];
                }
            },
            error => {
            }
        );
    }

    filterRefCustomer(): any{
        let ToDate = null;
        if (!!this.toDate) {
            const d = new Date(this.toDate);
            d.setHours(23, 59, 59);
            ToDate = !!d ? d : ToDate;
        }
        let FromDate = null;
        if (!!this.fromDate) {
            const d = new Date(this.fromDate);
            d.setHours(12, 0, 0);
            FromDate = !!d ? d : FromDate;
        }
        // let status;
        // if (!!this.status) {
        //     status = this.status;
        // } else {
        //     status = this.flag;
        // }

        FromDate = new Date(this.toDate).getDate() == new Date(this.fromDate).getDate() ? null : FromDate;

        this.partnerData = {
            userId : this.userId,
            isSignUpConfirmation: this.isSIgnUpConfirm,
            ToDate: ToDate,
            FromDate: FromDate,
            SearchText: this.searchPartner.value,
            CustomerId : this.currentUser.CustomerId,
            Status: this.status
        };
        this.getCustomerRefferalList(this.partnerData);
    }

    clearRefFilter(): any{
        this.status = null;
        this.toDate = null;
        this.fromDate = null;
        this.searchPartner = new FormControl('');
        this.partnerData = {
            userId : this.userId,
            isSignUpConfirmation: 1,
            ToDate: this.toDate,
            FromDate: this.fromDate,
            SearchText: this.searchPartner.value,
            CustomerId : this.currentUser.CustomerId,
            Status: this.status
        };
        this.getCustomerRefferalList(this.partnerData);
    }

    filterCustomer(): any {
        
        let ToDate = null;
        if (!!this.toDate) {
            const d = new Date(this.toDate);
            d.setHours(23, 59, 59);
            ToDate = !!d ? d : ToDate;
        }
        let FromDate = null;
        if (!!this.fromDate) {
            const d = new Date(this.fromDate);
            d.setHours(12, 0, 0);
            FromDate = !!d ? d : FromDate;
        }
        let status;
        if (!!this.status) {
            status = this.status;
        } else {
            status = this.flag;
        }

        FromDate = new Date(this.toDate).getDate() == new Date(this.fromDate).getDate() ? null : FromDate;

        this.partnerData = {
            PartnerUserId: this.userId,
            Status: status,
            ToDate: ToDate,
            FromDate: FromDate,
            SearchText: this.searchPartner.value
        };
        this.getcustomerDetails(this.partnerData);
    }

    clearFilter(): any {
        this.status = null;
        this.toDate = null;
        this.fromDate = null;
        this.searchPartner = new FormControl('');
        this.partnerData = {
            PartnerUserId: this.userId,
            Status: this.flag,
            ToDate: this.toDate,
            FromDate: this.fromDate,
            SearchText: this.searchPartner.value
        };
        this.getcustomerDetails(this.partnerData);

    }
}
