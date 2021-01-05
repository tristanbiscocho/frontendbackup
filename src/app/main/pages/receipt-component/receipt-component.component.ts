import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-receipt-component',
  templateUrl: './receipt-component.component.html',
  styleUrls: ['./receipt-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReceiptComponentComponent implements OnInit {
 Data: any;
 parsedata:any;
 createddate:any;
 amount:any;
  constructor(public dialogRef: MatDialogRef<ReceiptComponentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) 
    {
      
      this.Data = data.data;            
      if (this.Data)
      {
          if(this.Data.StripeChargeD != null)
          {
            this.parsedata = JSON.parse(this.Data.StripeChargeD);
            
            this.createddate = new Date(this.parsedata.created * 1000);
            this.amount = this.parsedata.amount;
          }
      }
    }

    ngOnInit() {

    }

}
