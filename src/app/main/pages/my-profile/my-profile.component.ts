import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';
import { EditProfileFormDialogComponent } from './edit-profile/edit-profile.component';
import { MyProfileService } from './my-profile.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from 'app/main/services/auth';
import { ActivatedRoute } from '@angular/router';
import { ManageProfileFormDialogComponent } from '../partner/partner-profile/partner-profile.component';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import * as moment from 'moment';
import { SettingsService } from '../settings/settings.service';
import { LoginService } from '../Authentication/login/login.service';
import { EnterPasswordFormDialogComponent } from './enter-userpassword/enter-userpassword.component';
import * as _ from 'lodash';
import { SupervisorService } from '../supervisor-list/supervisor-list.service';
import { SponsorProfileFormDialogComponent } from './edit-sponsor/edit-sponsor.component';
import { debounceTime } from 'rxjs/operators';
import { LoaderService } from 'app/main/services/loader.service';
import { CustomerService } from '../customer-list/customer-list.service';

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    poolData:any=[];
    profiledetails:any=[];
    dialogRef: any;
    currentUser: any;
    customerDetail: any;
    EmployeeStatus: any;
    ResidentialStatus:any;
    Timeatcurrentaddress:any;
    Wheredidyouhereaboutus:any;
    Typeofhouse:any;
    Familymemebers:any;
    Noofrooms:any;
    epmStatus: any;
    responseForAll: any;
    shortCode: any;
    accountNumber: any;
    customerId: any;
    activities: any;
    filterdActivities: any[];
    searchActivity: any;
    period: any;
    typeOfHouse: any;
    familyMember: any;
    noOfRooms: any;
    resStatusL: any;
    timeOfCurAdd: any;
    hearAbout: any;
    paymentMethods: any;
    packages: any[];
    pageOffset: any;
    plan:any;
    filltered_activity: any;
    showLoader: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        public _myProfileService: MyProfileService,
        public messageService: MessageService,
        public _authService: AuthService,
        public _activeRoute: ActivatedRoute,
        public _settingSerivce: SettingsService,
        public _loginService: LoginService,
        public _superviseorService: SupervisorService,
        private _loaderService: LoaderService,
        private _customerService:CustomerService
    ) {
        this.getAllResourceData();
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
        this.searchActivity = new FormControl("");
        this._activeRoute.params.forEach(params => {
            const getCoustomerId = params['CUSTOMERID'];
            const pageOffset = params['USEROFFSET'];
            if (getCoustomerId !== undefined) {
                this.customerId = getCoustomerId;
            }
            if (!!pageOffset) {
                this.pageOffset = pageOffset;
            }
        });

        this.getPackages();
        const currentuserdata = localStorage.getItem('UserDetail');
        this.responseForAll = this._authService.getAllResourceData();
        this.period = this.responseForAll.filter(x => x.ListID == 3);
        this.typeOfHouse = this.responseForAll.filter(x => x.ListID == 2);
        this.familyMember = this.responseForAll.filter(x => x.ListID == 4);
        this.noOfRooms = this.responseForAll.filter(x => x.ListID == 5);
        this.epmStatus = this.responseForAll.filter(x => x.ListID == 6);
        this.resStatusL = this.responseForAll.filter(x => x.ListID == 7);
        this.timeOfCurAdd = this.responseForAll.filter(x => x.ListID == 8);
        this.hearAbout = this.responseForAll.filter(x => x.ListID == 9);
        this.paymentMethods = this.responseForAll.filter(x => x.ListID == 10);
        

        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }

        if (!!this.customerId) {
            this.getUserDetail(this.customerId);
            this.getUserHistoryDetail(this.customerId);
        } else if (this.currentUser.RoleType == 2) {
            this.getUserDetail(this.currentUser.CustomerId);
        } else if ( this.currentUser.RoleType == 4 ){
            this.getSupervisorDetail(this.currentUser.CustomerId);
        } 
        else if(this.currentUser.RoleType == 7){
            this.getSupervisorDetail(this.currentUser.CustomerId);
        }
            else {
            this.getPartnerDetail(this.currentUser.CustomerId);
        } 
    }

    ngOnInit(): any {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
        this.searchActivity.valueChanges
        .pipe(debounceTime(400))
            .subscribe(searchText => {
            this.activities = FuseUtils.filterArrayByString(this.filltered_activity, searchText);
          });

        
            // .subscribe(searchText => {
            //     this.activities = FuseUtils.filterArrayByString(
            //         this.activities,
            //         searchText
            //     );
            // });
           
    }

    getPackages(): any {
        this._settingSerivce.getPackageList().subscribe(
            response => {
                if (response) {
                    this.packages = response;
                } else {
                    this.packages = [];
                }
            });
    }

    getSupervisorDetail(id): any {
        
        this._superviseorService.getSupervisorDetail(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.customerDetail = response.data;
                    this.accountNumber = this.customerDetail.AccountNUmber;
                    this.accountNumber = this.accountNumber.toString();
                } else {
                    this.customerDetail = null;
                }
            });
    }
    getUserDetail(id): any {
        id = Number(id);
        this._myProfileService.getUserDetail(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    this.customerDetail = response.data;
                    this.getcustomerinfo();
                    this.EmployeeStatus = this.epmStatus.filter(x => x.Id == this.customerDetail.EmploymentStatusId);
                    this.ResidentialStatus = this.resStatusL.filter(x=> x.Id == this.customerDetail.ResidentalStatusId);
                    this.Wheredidyouhereaboutus = this.hearAbout.filter(x=>x.Id == this.customerDetail.WhereDidYouhearaboutUs);
                    this.Timeatcurrentaddress = this.timeOfCurAdd.filter(x=>x.Id == this.customerDetail.TimeOfCurrentAddress);
                    if (!!this.customerDetail.Person.PaymentDetails_AccountNumber) {
                        this.accountNumber = this.customerDetail.Person.PaymentDetails_AccountNumber;

                    } 
                    if (!!this.accountNumber) {
                        this.accountNumber = this.accountNumber.toString();

                    }
                } else {
                    this.customerDetail = null;
                }
            });
    }

    getUserHistoryDetail(id): any {
    
        this._myProfileService.getUserHistoryDetail(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    if (!!response.data && response.data.length >= 1) {
                        this.activities = _.filter(response.data, d => {
                            return d.FieldName != 'PackageId';
                        });
                    }
                    this.filterdActivities = response.data;
                    const activites = []; 
                    if(!!this.activities) {
                    for (const data of this.activities) {
                        switch (data.FieldName) {
                            case 'DOB': {
                                data.OldValue = moment(data.OldValue).format('DD / MM / YYYY');
                                data.NewValue = moment(data.NewValue).format('DD / MM / YYYY');
                                data['activity'] = "Updated Date of birth " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'EmploymentStatusId': {
                                data.OldValue = this.epmStatus.find(x => x.Id == data.OldValue).Value;
                                data.NewValue = this.epmStatus.find(x => x.Id == data.NewValue).Value;
                                data['activity'] = "Updated Employment Status " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'ResidentalStatusId': {
                                data.OldValue = this.resStatusL.find(x => x.Id == data.OldValue).Value;
                                data.NewValue = this.resStatusL.find(x => x.Id == data.NewValue).Value;
                                data['activity'] = "Updated Residential Status " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                           
                            case 'TimeOfCurrentAddress': {
                                data.OldValue = this.timeOfCurAdd.find(x => x.Id == data.OldValue).Value;
                                data.NewValue = this.timeOfCurAdd.find(x => x.Id == data.NewValue).Value;
                                data['activity'] = "Updated Time at Current Address " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'WhereDidYouhearaboutUs': {
                                data.OldValue = this.hearAbout.find(x => x.Id == data.OldValue).Value;
                                data.NewValue = this.hearAbout.find(x => x.Id == data.NewValue).Value;
                                data['activity'] = "Updated Where id you hear about us " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                           
                            case 'IsElectricMeterReading': {
                                if (data.OldValue == "True"){
                                    data.OldValue = 'Yes';
                                } else {
                                    data.OldValue = 'No';
                                }

                                if (data.NewValue == "True"){
                                    data.NewValue = 'Yes';
                                } else {
                                    data.NewValue = 'No';
                                }
                                data['activity'] = "Updated Economy meter reading " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'FirstName': {
                                data['activity'] = "Updated First name " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'LastName': {
                                data['activity'] = "Updated Last name " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'EmailAddress': {
                                data['activity'] = "Updated Email address " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'MobileNumber': {
                                data['activity'] = "Updated Mobile Number " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'AddressId': {
                                break;
                            }
                            case 'PaymentDetails_SortCode': {
                                data['activity'] = "Updated Sort Code " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'PaymentDetails_AccountNumber': {
                                data['activity'] = "Updated Account Number " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'PaymentDetails_AccountName': {
                                data['activity'] = "Updated Account Name " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'Title': {
                                if (data.OldValue == 0) {
                                    data.OldValue = 'Mr';
                                } else if (data.OldValue == 1) {
                                    data.OldValue = 'Miss';
                                } else if(data.OldValue == 2) {
                                    data.OldValue = 'Mrs';
                                }
                                else if(data.OldValue == 3){
                                    data.OldValue = 'Ms';
                                }
                                else{
                                    data.OldValue = 'Dr';
                                }

                                if (data.NewValue == 0) {
                                    data.NewValue = 'Mr';
                                } else if (data.NewValue == 1) {
                                    data.NewValue = 'Miss';
                                } else if(data.NewValue == 2){
                                    data.NewValue = 'Mrs';
                                }
                                else if(data.NewValue == 3){
                                    data.NewValue = 'Ms';
                                }
                                else{
                                    data.NewValue = 'Dr';
                                }
                                data['activity'] = "Updated Title " + data.OldValue + ' to ' + data.NewValue;
                                break;
                            }
                            case 'PackageId': {
                                this.activities.splice(this.activities.indexOf(data), 1);
                            }
                        }
                    }

                    this.filltered_activity = this.activities;
                }
                } else {
                    this.activities = [];
                    this.filterdActivities = [];
                }
            });
    }

    getPartnerDetail(id): any {
        this._myProfileService.getPartnerDetail(id).subscribe(
            response => {
                if (response.status_code === 200) {
                    this.customerDetail = response.data;
                } else {
                    this.customerDetail = null;
                }
            });
    }

    getAllResourceData(): any {
        this.responseForAll = this._authService.getAllResourceData();
        this.epmStatus = this.responseForAll.filter(x => x.ListID == 6);
    }

    editProfileByuser(event): any {
        if (this.currentUser.RoleType == 2) {
            this.dialogRef = this.dialog.open(EnterPasswordFormDialogComponent, {
                panelClass: 'enter-userpassword-form-dialog',
                data: {
                    event: event,
                    data: this.customerDetail,
                    userId: this.customerId
                }
            });
            this.dialogRef.afterClosed().subscribe(data => {
                const loginUser = {
                    email: this.currentUser.UserName,
                    password: data.OldPassword
                };
                this._loginService.login(loginUser).subscribe(
                    response => {
                        if (response.status_code != 200) {
                            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Please check your password.' });
                        } else {
                            localStorage.setItem("Token", response.data.Token);
                            localStorage.setItem("UserDetail", JSON.stringify(response.data));
                            this.editProfile(event);
                        }
                    });
            });
        } else {
            this.editProfile(event);
        }
    }

    editProfile(event): any {
        
        this.dialogRef = this.dialog.open(EditProfileFormDialogComponent, {
            panelClass: 'edit-profile-form-dialog',
            data: {
                event: event,
                data: this.customerDetail,
                userId: this.customerId
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                if (!!response) {
                    if (event == 'edit') {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile edited successfully.' });
                        if (!!this.customerId) {
                            this.getUserDetail(this.customerId);
                            this.getUserHistoryDetail(this.customerId);
                        } else if (this.currentUser.RoleType == 2) {
                            this.getUserDetail(this.currentUser.CustomerId);
                            this.getUserHistoryDetail(this.currentUser.CustomerId);
                        } else {
                            this.getPartnerDetail(this.currentUser.CustomerId);
                        }
                    } else {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated successfully.' });
                    }
                } else {

                }

            });
    }

    editPartner(event): any {
        
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: 'partner-profile-form-dialog',
            data: {
                event: event,
                data: this.customerDetail,
                userId: this.customerId
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                if (!!response) {
                    this.getPartnerDetail(this.currentUser.CustomerId);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile edited successfully.' });
                } else {

                }

            });
    }


    editSponsor(event): any {
        this.dialogRef = this.dialog.open(SponsorProfileFormDialogComponent, {
            panelClass: 'edit-sponsor-form-dialog',
            data: {
                event: event,
                data: this.customerDetail,
                userId: this.customerId
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response) => {
                if (!!response) {
                    this.getSupervisorDetail(this.currentUser.CustomerId);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile edited successfully.' });
                } else {

                }

            });
    }

    getcustomerinfo()
    {
        const poolData = {
            CustomerId: this.customerDetail.Id,
            UserId: this.customerDetail.Person.UserId,
            Cases: 'POOL'
          };
         
          this._customerService.getCustomerInfo(poolData)
            .subscribe((res: any) => {
              if (res.status_code === 0) {
                this.poolData = res.data.Table1;
                this.profiledetails = res.data.Table[0];
              }
              else {
                this.poolData = [];
              }
            });
    }

}
    