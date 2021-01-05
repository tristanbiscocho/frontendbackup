export class AddPartnerClass {
  ID: any;
  Title: any;
  FirstName: any;
  LastName: any;
  PhoneNo: any;
  EmailId: any;
  AddressLine1: any;
  AddressLine2: any;
  City: any;
  PostCode: any;
  SortCode: any;
  DOB: any;
  AccountNUmber: any;
  ComissionPercentage: any;
  RocketChatUserID?: any;
}

export class AddPartnerCustomer{
  Id:number;
  CustomerName:String;  
  Phone_No:any;
  CustomerInformation:any;
  CallbackFlag:any;
  CallbackDate:any;
  CallbackTime:any;
  Notes?:any;
  CreatedDate?:any;
  UpdatedOn?:any;
  Status?:any;
  PartnerId:any;
}

export class AddPartnerPlan {
    PartnerId:  any;
    StartDate: any;
    EndDate: any;
    TotalCommission: any;
    NoOfReferral: any;
    Status: any;
    TransactionId: any;
    TransactionDate: any;
    ID: any;
}


export class GetReferralCount {
    PartnerId: any;
    StartDate: any;
    EndDate: any;
}

