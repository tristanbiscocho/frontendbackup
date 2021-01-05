import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { FuseConfigService } from '@fuse/services/config.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ManageProfileFormDialogComponent } from './edit-profile/edit-profile.component';
import { SupplierService } from './supplier.service';
import { FormControl } from '@angular/forms';
import { FuseUtils } from '@fuse/utils';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
    suppliers: any[] = [];
    filterSupplier: any[] = [];

    dialogRef: any;
    event: any = 0;
    searchSupplier: any;
    EnergyType: any;
    pageOffset: any;
    confirmDialogRef: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public dialog: MatDialog,
        private _supplierService: SupplierService,
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

        // search supplier on enter
        this.searchSupplier = new FormControl('');
        const data = {
            searchText : '',
            energyTypeId : null
        };
        // this.getSupplier(data);
        this._activeRoute.params.forEach(params =>{
            const pageOffset = params['OFFSET'];
            if (!!pageOffset){
                this.pageOffset = pageOffset;
            }
        });
    }


    ngOnInit(): void {
        // search supplier
        // this.searchSupplier.valueChanges
        //     .pipe(debounceTime(400))
        //     .subscribe(searchText => {
        //         this.suppliers = FuseUtils.filterArrayByString(this.filterSupplier, searchText);
        //     });
        this._supplierService.getSupplierListNew().subscribe(res=>{
            this.suppliers=res;
            console.log(this.suppliers)
        })
    }

    onChange(event): any {
        this.pageOffset = event.offset;
    }
    filterSupp(): any {
        const data = {
            searchText: this.searchSupplier.value,
            energyTypeId: this.EnergyType
        };
        this.getSupplier(data);
    }

    ClearFilter(): any {
        this.searchSupplier = new FormControl('');
        this.EnergyType = null;
        const data = {
            searchText: '',
            energyTypeId: this.EnergyType
        };
        this.getSupplier(data);
    }
    // Get suuplier detail from api
    getSupplier(data): any {
        this._supplierService.getSupplierListNew().subscribe(
            response => {
                this.suppliers = response;
                // if (response.status_code === 200) {
                //     this.suppliers = response.data;
                //     this.filterSupplier = response.data;
                // } else {
                //     this.suppliers = [];
                //     this.filterSupplier = [];
                // }
            });
    }

    addReadingMeter(): any {
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: 'edit-profile-form-dialog',
            data: {
                event: this.event
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!!response) {

                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supplier created successfully.' });
                    const data = {
                        searchText : '',
                        energyTypeId : null
                    };
                    this.getSupplier(data);

                }

            });
    }

    // edit supplier detail
    editSupplier(row): any {
        debugger
        row.EnergyTypeID=parseInt(row.EnergyTypeID)
        if(row.IsCanUsedForSwitch=="True"){
            row.IsCanUsedForSwitch=1;
        }else{
            row.IsCanUsedForSwitch=0;
        }
        if(row.Status=="True"){
            row.Status=1;
        }else{
            row.Status=0;
        }
        this.dialogRef = this.dialog.open(ManageProfileFormDialogComponent, {
            panelClass: 'edit-profile-form-dialog',
            data: {
                event: this.event,
                data: row,
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(response => {
                if (!!response) {

                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supplier updated successfully.' });
                    const data = {
                        searchText : '',
                        energyTypeId : null
                    };
                    this.getSupplier(data);

                }

            });
    }


    deleteSupplier(row):any{
        
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = "Are you sure want to remove record?";

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
        this._supplierService.deleteSupplier(row.ID).subscribe(
            response => {
                if (response) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supplier deleted successfully.' });
                    const data = {
                        searchText : '',
                        energyTypeId : null
                    };
                    this.getSupplier(data);
                } else {
                    this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Error in delete package.' });
                }
            });
        }
        });

    }



    setValue(event): any {
        this.event = event;

    }

    // On change energy type
    filterbyEnergyType(data): any {
        // this.suppliers =  this.suppliers.find(st => {
        //     return data.value == st.EnergyTypeID;
        //   });
        this.EnergyType = data.value;
        // const id = data.value;
        // if (id == 3) {
        //     this.suppliers = this.filterSupplier;
        // } else {
        //     const data = this.filterSupplier.filter(x => x.EnergyTypeID == id);
        //     this.suppliers = data;
        // }
    }
}
