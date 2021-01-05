import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-paymentmodal',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmPaymentComponent implements OnInit {
 Data: any;
date = new Date();
  constructor(public dialogRef: MatDialogRef<ConfirmPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) 
    {
      
      this.Data = data.data;  
    }

    ngOnInit() {

    }

   
}
