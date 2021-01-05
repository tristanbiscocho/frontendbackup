import { FuseConfigService } from './../../../../@fuse/services/config.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsDataService } from '../services/client.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {



  constructor(private _ClientsDataService:ClientsDataService,
    private route: ActivatedRoute,
    private router: Router,
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
    ClientId="1";
  
clientDetails;
  ngOnInit() {
    this.getAllCommissionType();
    this.getInvoiceGenerationType();
    this.getinvoicePayableType();
    this.route.paramMap.subscribe(params => {
      let id = params.get("Id");
      console.log(id)
      this.ClientId=id;
    this._ClientsDataService.getClientDetails(id).subscribe(res=>{
      console.log(res.body)
      this.clientDetails=res.body;

    })
    })
  
  }
  commissionType;
  getAllCommissionType(){
    this._ClientsDataService.getAllCommission().subscribe(res=>{
      console.log(res);
      this.commissionType=res.body;
    })
  }
  allSupplier;
  getAllSupplier(){
    this._ClientsDataService.getAllSupplier().subscribe(res=>{
      console.log(res);
      this.allSupplier=res.body;
    })
  }
  invoiceGenerationType;
  getInvoiceGenerationType(){
    this._ClientsDataService.getAllInvoiceGenerationType().subscribe(res=>{
      console.log(res);
      this.invoiceGenerationType=res.body;
    })
  }
  invoicePayable;
  getinvoicePayableType(){
    this._ClientsDataService.getAllInvoicePayable().subscribe(res=>{
      console.log(res);
      this.invoicePayable=res.body;
    })
  }
  findCommissionType(id){
    if(id!=null){
      var findCommission=this.commissionType.find(x=>x.Id==id);
      return findCommission.Name;
    }

  }
  findInvoiceGeneration(id){
    if(id!=null){
      var findCommission=this.invoiceGenerationType.find(x=>x.Id==id);
      return findCommission.TypeOfInvoice;
    }

  }
  findInvoicePayable(id){
    if(id!=null){
      var findCommission=this.invoicePayable.find(x=>x.Id==id);
      return findCommission.Type;
    }

  }
}
