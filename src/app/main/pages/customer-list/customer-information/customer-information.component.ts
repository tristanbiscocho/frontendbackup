import { Component, OnInit, ViewEncapsulation ,PipeTransform,Pipe} from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer-list.service';
import { MatDialog } from '@angular/material';
import { MessageViewerComponent } from './message-viewer/message-viewer.component';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss'],
  
})
export class CustomerInformationComponent implements OnInit {

  customerId: any;
  customerUId: any;
  pageOffset: any;
  customerPageOffset: any;
  userId: any;
  customerInfo: any = [];
  status = null;
  historyData: any;
  poolData: any;
  switchData: any;
  billData: any;
  meterData: any;
  mesData: any;
  upcomedata:any;
  anythingdata:any;
  parsedata:any=[];
  dialogRef: any;
  profiledetails:any;
  constructor(public _activeRoute: ActivatedRoute,
    private _fuseConfigService: FuseConfigService,
    public _customerService: CustomerService,
    public dialog: MatDialog,

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

  ngOnInit() {
    this._activeRoute.params.forEach(params => {
      const getcustomerId = params['customerId'];
      if (getcustomerId !== undefined) {
        this.userId = parseInt(getcustomerId);
      }
      const UserId = params['userId'];
      if (UserId != undefined) {
        this.customerId = parseInt(UserId);
      }
    });
    this._activeRoute.params.forEach(params => {
      const getCustomerUid = params['customerId'];
      const pageOffset = params['PAGEOFFSET'];
      const customerPageOffset = params['CUSTOMERPAGEOFFSET'];
      if (!!getCustomerUid) {
        this.customerUId = getCustomerUid;
      }
      if (!!pageOffset) {
        this.pageOffset = pageOffset;
      }
      if (!!customerPageOffset) {
        this.customerPageOffset = customerPageOffset;
      }
    });
    this.getCustomerinfo();
  }


  onChange(event): any {
    this.pageOffset = event.offset;
  }

  getCustomerinfo(): any {
    //Pool Data
    const poolData = {
      CustomerId: this.customerId,
      UserId: this.userId,
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

    // Switch Data
    const SwitchData = {
        CustomerId: this.customerId,
        UserId: this.userId,
        Cases: 'SWITCH'
      };

      this._customerService.getCustomerInfo(SwitchData)
      .subscribe((res: any) => {
        if (res.status_code === 0) {
          const switchData1 = res.data.Table1;
          switchData1.splice(0, 1);

          this.switchData = switchData1;
        }
        else {
          this.switchData = [];
        }
      });

      // Bill Data
      const billData = {
        CustomerId: this.customerId,
        UserId: this.userId,
        Cases: 'BILL'
      };

      this._customerService.getCustomerInfo(billData)
      .subscribe((res: any) => {
        if (res.status_code === 0) {
          this.billData = res.data.Table1;
          if(this.billData.length > 0)
          {
            for(var i = 0;i<this.billData.length;i++)
          {
              this.parsedata = JSON.parse(this.billData[i].StripeChargeD);
          }
          } 
          }
        else {
          this.billData = [];
        }
      });

      // Meter Data
      const meterData = {
        CustomerId: this.customerId,
        UserId: this.userId,
        Cases: 'METER'
      };

      this._customerService.getCustomerInfo(meterData)
      .subscribe((res: any) => {
        if (res.status_code === 0) {
          this.meterData = res.data.Table1;
          
        }
        else {
          this.meterData = [];
        }
      });

      // Message Data
      const msgData = {
        CustomerId: this.customerId,
        UserId: this.userId,
        Cases: 'MESSAGE'
      };

      this._customerService.getCustomerInfo(msgData)
      .subscribe((res: any) => {
        if (res.status_code === 0) {
          this.mesData = res.data.Table1;
        
          
        }
        else {
          this.mesData = [];
        }
      });


      //Upcoming Data
      const upcomeData = {
        CustomerId: this.customerId,
        UserId: this.userId,
        Cases: 'UPCOME'
      }
      this._customerService.getCustomerInfo(upcomeData)
      .subscribe((res: any) => {
        if (res.status_code === 0) {
          this.upcomedata = res.data.Table1;
        }
        else {
          this.upcomedata = [];
        }
      });


      //Anythingh Data
      const anythingData = {
        CustomerId: this.customerId,
        UserId: this.userId,
        Cases: 'ANYTHING'
      }
      this._customerService.getCustomerInfo(anythingData)
      .subscribe((res: any) => {
        if (res.status_code === 0) {
          this.anythingdata = res.data.Table1;
        }
        else {
          this.anythingdata = [];
        }
      });

  }

  requestJSON(data): any {
    this.dialogRef = this.dialog.open(MessageViewerComponent, {
        panelClass: 'app-message-viewer',
        data: {
            event: data
        }
    });
    
}

}
