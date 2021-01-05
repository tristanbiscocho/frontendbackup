import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CustomerService } from '../customer-list/customer-list.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  paymentdata:any=[];
  customerId:any;
  pageOffset: any;
  parsedata:any;
  formatteddate:any;
  customername:any;
  constructor(
    private _fuseConfigService: FuseConfigService,
    public _activeRoute: ActivatedRoute,
    public dialog: MatDialog,
    public _customerService: CustomerService,
    public messageService: MessageService,
    private route: ActivatedRoute
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
  }

  ngOnInit() {
    this._activeRoute.params.forEach(params => {
      const getCoustomerId = params['CUSTOMERID'];
      const pageOffset = params['OFFSET'];
      if (getCoustomerId !== undefined) {
          this.customerId = getCoustomerId;
      }
      if (!!pageOffset) {
          this.pageOffset = pageOffset;
      }
      else
      {
        this.pageOffset=0;
      }
  });
    this.getPaymentstatus();
  }

  getPaymentstatus()
  {
    this._customerService.getpaymentinformation(this.customerId).subscribe((res:any)=>{
      if (res.status_code === 0) 
      {
        this.customername = res.data.CustomerName;
        if(res.data.CustomerPaymentFromGCList != null)
        {
          this.paymentdata = res.data.CustomerPaymentFromGCList;
          for(var i=0;i<this.paymentdata.length;i++)
          {
            this.parsedata = JSON.parse(this.paymentdata[i].NewPaymentObjectFromGocard);
            
            const date = this.parsedata.charge_date.split('-');
            this.formatteddate =  date[2]+ "/" +date[1]+ "/" +date[0];
          }
        }
      }
      else
      {
        this.paymentdata = [];
      }
    })
  }

}
