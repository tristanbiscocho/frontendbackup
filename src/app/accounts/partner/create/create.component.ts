import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FuseConfigService } from '@fuse/services/config.service';
import { ClientsDataService } from '../services/client.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateComponent implements OnInit {

   constructor(private _ClientsDataService:ClientsDataService,
    public sanitizer: DomSanitizer,
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
  form = new FormGroup({
    email: new FormControl('', [
    
      Validators.email,
    ]),
    CompanyName : new FormControl('', [
    
    ]),
    SupplierId : new FormControl('', [
    
    ]),
    Title : new FormControl('', [

    ]),
    FirstName : new FormControl('', [
    
    ]),
    LastName : new FormControl('', [
  
    ]),
    Number : new FormControl('', [
 
    ]),
    Address : new FormControl('', [
    
    ]),
    BusineesPhoneNumber : new FormControl('', [
    
    ]),
    BuildingName : new FormControl('', [
      // Validators.required,
    ]),
    TownCity : new FormControl('', [
    
    ]),
    VatNumber : new FormControl('', [
      // Validators.required,
    ]),
    TermOfDuration : new FormControl('', [
    
    ]),
});
get TermOfDuration() {
  return this.form.get('TermOfDuration');
}

get SupplierId() {
  return this.form.get('SupplierId');
}
get email() {
  return this.form.get('email');
}
get CompanyName() {
  return this.form.get('CompanyName');
}
get Title() {
  return this.form.get('Title');
}
get FirstName() {
  return this.form.get('FirstName');
}
get LastName() {
  return this.form.get('LastName');
}
get Number() {
  return this.form.get('Number');
}
get Address() {
  return this.form.get('Address');
}
get BusineesPhoneNumber() {
  return this.form.get('BusineesPhoneNumber');
}
get BuildingName() {
  return this.form.get('BuildingName');
}
get TownCity() {
  return this.form.get('TownCity');
}
get VatNumber() {
  return this.form.get('VatNumber');
}
variablePercentage="";
variableAmount="";
variableType="percentage"
urlSafe: SafeResourceUrl;
setVariableFee(val){
this.variableType=val;
}
  ngOnInit() {
  for (let index = 1; index < 61; index++) {
    this.daysAfter.push(index);
  }
    this.getAllSupplier();
    this.getAllCommissionType();
    this.getInvoiceGenerationType();
    this.getinvoicePayableType();
  }
  country="BE"
  rawString=[];
  count=1;

  addNewPrecentage(){
  
        this.rawString.push({item:this.count});
        this.count++;
}
addCommission(value){
this.addcommissionShow=value;
}
addcommissionShow=false;
removePercentage(){
this.rawString.shift();
}
rawStringAMount=[];
addNewAmount(){
  let obj=` <div id='${this.count}' class="row"  *ngIf="variableType=='percentage'||variableType=='both'">
  <div class="col-md-6">
    <mat-form-field class="example-full-width">
        <mat-label> Amount</mat-label>
        <input type="text" matInput [ngModelOptions]="{standalone: true}" [(ngModel)]="variablePercentage">
      
        <!-- <mat-hint>Errors appear instantly!</mat-hint> -->
      </mat-form-field>
      
</div>
<div class="col-md-6">
  <div class="row">
    <div class="col-md-6" >
      <mat-form-field class="example-full-width">
          <mat-label> Start Commission</mat-label>
          <!-- <span matPrefix>%&nbsp;</span> -->
          <input type="text" matInput >
        
          <!-- <mat-hint>Errors appear instantly!</mat-hint> -->
        </mat-form-field>
        
        
  </div>
  <div class="col-md-5">
   
      <mat-form-field class="example-full-width">
        <mat-label> End Commission</mat-label>
        <!-- <span matPrefix>%&nbsp;</span> -->
        <input type="text" matInput >
      
        <!-- <mat-hint>Errors appear instantly!</mat-hint> -->
      </mat-form-field>
      
</div>
<div class="col-md-1">
<button type="button" onclick="removeRow('${this.count}')" class="btn btn-primary btn-sm">-</button>
</div>
   </div>
   
</div>
 </div>`;
this.count++;
  this.rawStringAMount.push(obj);
}
  matcher = new MyErrorStateMatcher();
  commissionType;
  getAllCommissionType(){
    this._ClientsDataService.getAllCommission().subscribe(res=>{
      console.log(res);
      this.commissionType=res.body;
    })
  }
  returnHtml(item) {
    this.urlSafe=this.sanitizer.bypassSecurityTrustUrl(item)
    return this.urlSafe;
  }
  removeRow(item){
this.rawString.splice((item-1),1)
var myobj = document.getElementById(item);
myobj.remove();
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
  allSupplier;
  getAllSupplier(){
    this._ClientsDataService.getAllSupplier().subscribe(res=>{
      console.log(res);
      this.allSupplier=res.body;
    })
  }
  termOfDuration=[3,6,9,12,18,24,30,36];
  days=[
  {id:1,name:"MONDAY"},
  {id:2,name:"TUESDAY"},
  {id:3,name:"WEDNESDAY"},
  {id:4,name:"THURSDAY"},
  {id:5,name:"FRIDAY"},
  {id:6,name:"SATURDAY"},
  {id:7,name:"SUNDAY"}
]
  daysAfter=[]
  currentCommission=1;
  setCommissionType(id){
    this.currentCommission=id;
  }
  currentInvoice=1;
  setInvoiceGenerationType(id){
    this.currentInvoice=id;
  }
  currentPayable=1;
  setInvoicePayableType(id){
    this.currentPayable=id;
  }
  precentageValue="";
  fixedvalue="";
  variablevalue=""
  fixDate=Date;
  DayDuration=""
  WeekDay=""
  FortNight=Date;
  SecondLastWeekDayMonth=""
  LastWeekMonth="";
  payableAfterDate=Date;
  payableAfterDays=""
  perencetageError=true;
  onSubmit(){
    if(this.currentCommission==1){
      if(this.precentageValue==""){
        // this.notificationService.openSnackBar('Percentage value is required');
      }
    }
    else  if(this.currentCommission==2){
       if(this.fixedvalue==""){
        // this.notificationService.openSnackBar('Fixed value is required');
      }
    }
    else  if(this.currentCommission==3){
      if(this.variablevalue==""){
        // this.notificationService.openSnackBar('Variable value is required');
      }
    }
    else  if(this.currentCommission==4){
      if(this.precentageValue==""||this.fixedvalue==""||this.variablevalue==""){
        // this.notificationService.openSnackBar('All Commission Value is required is required');
      }
    }
    let invoiceGeneration="";
if(this.currentInvoice==1){
  invoiceGeneration=this.fixDate.toString();
}
else if(this.currentInvoice==2){
  invoiceGeneration=this.DayDuration;
}
else if(this.currentInvoice==3){
  invoiceGeneration=this.WeekDay;
}
else if(this.currentInvoice==5){
  invoiceGeneration=this.FortNight.toString();
}
else if(this.currentInvoice==6){
  invoiceGeneration=this.SecondLastWeekDayMonth;
}
else if(this.currentInvoice==7){
  invoiceGeneration=this.LastWeekMonth;
}
let invoicePayable="";
if(this.currentPayable==1){
  invoicePayable="Sign In";
}
if(this.currentPayable==2){
  invoicePayable=this.payableAfterDate.toString();
}
else if(this.currentPayable==3){
  invoicePayable=this.payableAfterDays;
}
if(invoicePayable!=""&&invoiceGeneration!=""){
if(this.form.valid){
  debugger
  let obj=this.form.value;
  obj.ComissonType=this.currentCommission;
  obj.FixedFee=this.fixedvalue;
  obj.VariableFee=this.variablevalue;
  obj.PrecentageFee=this.precentageValue;
  obj.InvoiceGenerationType=this.currentInvoice;
  obj.InvoicePayabelType=this.currentPayable;
  if(this.currentInvoice==1){
    obj.InvoiceGenerationValue=invoiceGeneration;
  }else{
    obj.InvoiceGenerationValue=invoiceGeneration;
  }

  obj.InvoicePayableValue=invoicePayable;


this._ClientsDataService.creatClient(obj).subscribe(res=>{
  console.log(res)
  // this.notificationService.openSnackBar('Success');
})


}else{
  // this.notificationService.openSnackBar('Form Is Invalid');
}

}else{
  // this.notificationService.openSnackBar('Some Filed Are Missing');
}
  }


}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
