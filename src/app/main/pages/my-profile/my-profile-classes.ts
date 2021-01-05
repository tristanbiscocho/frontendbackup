export class RegisterDetail {
    Id: number;
    EmploymentStatusId: number;
    ResidentalStatusId: number;
    TimeOfCurrentAddress: number;
    WhereDidYouhearaboutUs: number;
    CurrentSupplierID: number;
    PersonInfo?: PersonalDetail;
    AddressLine1: any;
    AddressLine2: any;
    City: any;
    ElectricityConsumption: any;
    ElectricityConsumptionPeriodID: any;
    ElectricityCurrentPlan_PlanID: any;
    ElectricityCurrentPlan_PlanPaymentID: any;
    ElectricityCurrentPlan_SupplierID: any;
    EnergyTypeID: any;
    EnergyUsageID: any;
    FamilyMembersId: any;
    GasConsumption: any;
    GasConsumptionPeriodID: any;
    GasCurrentPlan_PlanID: any;
    GasCurrentPlan_PlanPaymentID: any;
    GasCurrentPlan_SupplierID: any;
    HouseTypeID: any;
    NoOfRoomsId: any;
    Password: any;
    PersonID: any;
    PostCode: any;
    RegsitrationDate: any;
    TitleId: any;
    TypeOfHome: any;
    IsElectricMeterReading: any;
}

export class PersonalDetail {
    FirstName?: string;
    LastName?: string;
    EmailAddress?: string;
    MobileNumber?: string;
    DOB?: any;
    AddressId?: number;
    PaymentDetails_SortCode?: string;
    PaymentDetails_AccountNumber?: string;
    Title?: number;
    UserId?: number;
    Id?: number;
}

export class UpdatePassword {
    OldPassword: any;
    NewPassword: any;
    UserId: any;
}