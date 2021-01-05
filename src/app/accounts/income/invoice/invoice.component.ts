import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { ClientsDataService } from '../services/client.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private _ClientsDataService:ClientsDataService,
    private route: ActivatedRoute,
    private _fuseConfigService: FuseConfigService,
    ) { 


      this._fuseConfigService.config = {
        layout: {
            navbar: {
                hidden: false,
            },
            toolbar: {
                hidden: false,
            },
            footer: {
                hidden: true,
            },
            sidepanel: {
                hidden: true,
            },
        },
    };
    }
PartnerId;
form = new FormGroup({
  
  SupplierId : new FormControl('', [
    Validators.required,
  ]),
  BillDate : new FormControl('', [
    Validators.required,
  ]),
  DueDate : new FormControl('', [
    Validators.required,
  ]),
  BillNumber : new FormControl('', [
    Validators.required,
  ]),
  Category : new FormControl('', [
    Validators.required,
  ]),
  OrderNumber : new FormControl('', [
    Validators.required,
  ]),
  Note : new FormControl('', [
    Validators.required,
  ]),
});
get SupplierId() {
  return this.form.get('SupplierId');
}
get BillDate() {
  return this.form.get('BillDate');
}
get DueDate() {
  return this.form.get('DueDate');
}
get BillNumber() {
  return this.form.get('BillNumber');
}
get Category() {
  return this.form.get('Category');
}
get OrderNumber() {
  return this.form.get('OrderNumber');
}
get Note() {
  return this.form.get('Note');
}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.PartnerId = params.get("Id");
    });
    this.getAllSupplier();
  }
  allSupplier;
  getAllSupplier(){
    this._ClientsDataService.getAllSupplier().subscribe(res=>{
      console.log(res);
      this.allSupplier=res.body;
    })
  }
}
