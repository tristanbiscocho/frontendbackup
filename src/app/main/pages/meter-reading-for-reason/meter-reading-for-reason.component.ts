import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { CustomerService } from '../customer-list/customer-list.service';
import { AuditTrailFormDialogComponent } from '../logger-audit/audit-details/audit-details.component';
import { MeterReadingService } from '../meter-reading/meter-reading.service';
import { ReasonDialogComponent } from './reason-dialog/reason-dialog.component';


@Component({
  selector: 'app-meter-reading-for-reason',
  templateUrl: './meter-reading-for-reason.component.html',
  styleUrls: ['./meter-reading-for-reason.component.scss']
})
export class MeterReadingForReasonComponent implements OnInit {
    tableOffset: any = 0;
    searchCategory = new FormControl();
    pageOffset:any;
    meterType:any;
    reasons:any=[];
    filtercust:any=[];
    dialogRef: any;

  constructor(
    private _fuseConfigService: FuseConfigService,
    public _activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    public _meterReadingService: MeterReadingService
  ) { 
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
  this.searchCategory = new FormControl('');
  const data = {
      SearchText  : '',
      IsEconomy : null
  };
  this.getMeterreadingdata(data);
  this._activeRoute.params.forEach(params =>{
      const pageOffset = params['OFFSET'];
      if (!!pageOffset){
          this.pageOffset = pageOffset;
      }
  });
  }

  ngOnInit() {
    
  }

    filterCustomer(): any {
      
      const data = {
        SearchText  : this.searchCategory.value,
        IsEconomy : this.meterType
    };
    this.getMeterreadingdata(data);
    }

    clearFilter(): any {
      
      this.searchCategory = new FormControl('');
        this.meterType = null;
        const data = {
          SearchText  : this.searchCategory.value,
          IsEconomy : this.meterType
      };
        this.getMeterreadingdata(data);
    }

    getMeterreadingdata(data):any{
      
      this._meterReadingService.getMeterreadingreasons(data).subscribe(res=>{
        if (res.status_code === 0) {
          this.reasons = res.data;
          
          this.filtercust = res.data;
      } else {
          this.reasons = [];
          this.filtercust = [];
      }
      })
    }

    onChange(event): any {
      this.pageOffset = event.offset;
    }

     
      filterbyEnergyType(data): any {
        
        this.meterType = data.value;
    }

    viewReasons(row):any
    {
      
      this.dialogRef = this.dialog.open(ReasonDialogComponent, {
        panelClass: 'reason-dialog',
        data: {
            data: row,
        }
    });
    }
}


