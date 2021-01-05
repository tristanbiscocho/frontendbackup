import {
    Component,
    ViewEncapsulation,
    OnInit,
    Inject,
    ViewChild,
    Input
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from "@angular/forms";
import { MeterReadingService } from "../meter-reading.service";
import * as MeterReadingClass from "../meter-reading-classes";
import { MessageService } from "primeng/components/common/messageservice";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from "@angular/material/core";
import * as _moment from "moment";
import { LoaderService } from "app/main/services/loader.service";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { a } from "@angular/core/src/render3";
import Swal from "sweetalert2";
import { isNumber } from "lodash";
import { GetUserQuestionFormDialogComponent } from "../GetUserReason/GetUserReason.component";
import { RangeReasonFormDialogComponent } from "../range-reason/range-reason.component";
// tslint:disable-next-line:no-duplicate-imports

const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: "L"
    },
    display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "DD/MM/YYYYY",
        monthYearA11yLabel: "MMM YYYY"
    }
};

@Component({
    selector: "add-meter-reading-form-dialog",
    templateUrl: "./add-meter-reading.component.html",
    styleUrls: ["./add-meter-reading.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class AddMeterFormDialogComponent implements OnInit {
    showLoader: any;
    dialogTitle: string;
    type: any = 1;
    currentUser: any;
    addMeterForm: FormGroup;
    addEconomicForm: FormGroup;
    addElecForm: FormGroup;
    addGasForm: FormGroup;
    customerID: any;
    maxDate = new Date();
    ElectricityReading: any;
    ElectricityDate: any;
    GasDate: any;
    GasReading: any;
    EnergyType = 1;
    userEnergyType: any;
    isEconomicMeter: any;
    LowReadingValue: any;
    confirmDialogRef: any;
    previousMeterReadingData: any;
    GasPerviousReadingValue: any;
    IsLargeElcData?: any = false;
    IsLargeGasData?: any = false;
    IsLargeNrmlData?: any = false;
    IsLargeLowData?: any = false;

    nrmlMeterRange: any;
    lowMeterRange: any;
    gasMeterRange: any;
    ElecRange: any;

    queAns: any;
    otpforlowreadingofelectricity: any;
    otpforhighreadingofelectricity: any;
    otpforreadingofgas: any;

    prevDataGas: any;
    prevDataElec: any;
    prevDataLowElec: any;

    IsgasLessMeter: any;
    IselcLowLessMeter: any;
    IselcNrmlLessMeter: any; 
    dialogRef1: any;
    dialogRef2: any;

    IsLessNrmlRange: any;
    IsLessGasRange: any;
    IsLessLowRange: any;

    isShowGasMeter: any = false;
    isShowGasRange: any = false;
    isShowNormalRange: any = false;
    isShowNormalMeter: any = false;
    isShowLowMeter: any = false;
    isShowLowRange: any = false;


    gasReason: any;
    elecLowReason: any;
    elecNrmlReason: any;

    @ViewChild("ngOtpInputforlowreadingofelectricity")
    ngOtpInputforlowreadingofelectricity: any;
    @ViewChild("ngOtpInputforhighreadingofelwectricity")
    ngOtpInputforhighreadingofelwectricity: any;
    @ViewChild("ngOtpInputforreadingofgas") ngOtpInputforreadingofgas: any;
    config = {
        allowNumbersOnly: true,
        length: 5,
        isPasswordInput: false,
        disableAutoFocus: false
    };

    constructor(
        public dialogRef: MatDialogRef<AddMeterFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        public _addMeterReading: MeterReadingService,
        public messageService: MessageService,
        private _loaderService: LoaderService,
        public dialog: MatDialog
    ) {
        const customerId = data.customerID;
        const getEnergyType = data.EnergyType;
        this.isEconomicMeter = data.isEconomicMeterReadming;
        this.previousMeterReadingData = data.perviousMeterReadingData;

        
        this.prevDataGas = this.previousMeterReadingData.GasPerviousReadingValue;
        this.prevDataElec = this.previousMeterReadingData.ElectricityPreviousMeterReadingValue;
        this.prevDataLowElec = this.previousMeterReadingData.ElectricityPreviousLowMeterReadingValue;

        const currentuserdata = localStorage.getItem("UserDetail");
        if (!!currentuserdata) {
            this.currentUser = JSON.parse(localStorage.getItem("UserDetail"));
        }
        if (!!getEnergyType) {
            this.userEnergyType = getEnergyType;
        } else {
            this.userEnergyType = this.currentUser.EnergyTypeId;
        }
        if (!!customerId) {
            this.customerID = customerId;
        } else {
            this.customerID = this.currentUser.CustomerId;
        }
        if (this.userEnergyType == 2) {
            this.EnergyType = 2;
        }
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    ngOnInit(): any {
        this.addEconomicForm = this.formBuilder.group({
            CustomerID: [this.customerID],
            EnergyType: ["2", Validators.required],
            ReadingValue: ["", []],
            LowReadingValue: ["", []],
            Date: [new Date()],
            AdditionalInfo: [""]
        });

        this.addElecForm = this.formBuilder.group({
            CustomerID: [this.customerID],
            EnergyType: ["2", Validators.required],
            ReadingValue: ["", []],
            LowReadingValue: [""],
            Date: [new Date()],
            AdditionalInfo: [""]
        });

        this.addGasForm = this.formBuilder.group({
            CustomerID: [this.customerID],
            EnergyType: ["1", Validators.required],
            ReadingValue: ["", []],
            LowReadingValue: [""],
            Date: [new Date()],
            AdditionalInfo: [""]
        });
    }
    // For current meter reading is less then previous meter reading - START
    addMeterReading(): any {
        Swal.fire({
            // title: 'Are you sure?',
            text:
                "The meter reading you have entered is lower than the reading previously provided. Is this reading correct?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(result => {
            if (result.value) {
                this.dialogRef1 = this.dialog.open(GetUserQuestionFormDialogComponent, {
                    panelClass: 'GetUserReason',
                    data: {
                        IsgasLessMeter: this.IsgasLessMeter,
                        IselcLowLessMeter: this.IselcLowLessMeter,
                        IselcNrmlLessMeter: this.IselcNrmlLessMeter
                    }
                });
                this.dialogRef.afterClosed()
                .subscribe(response => {
                 if (!!response) {
                        
                  }
                 
                });
            } else {
                this.addEconomicForm = this.formBuilder.group({
                    CustomerID: [this.customerID],
                    EnergyType: ["2"],
                    ReadingValue: [""],
                    LowReadingValue: [""],
                    Date: [new Date()],
                    AdditionalInfo: [""]
                });

                this.addElecForm = this.formBuilder.group({
                    CustomerID: [this.customerID],
                    EnergyType: ["2"],
                    ReadingValue: [""],
                    LowReadingValue: [""],
                    Date: [new Date()],
                    AdditionalInfo: [""]
                });

                this.addGasForm = this.formBuilder.group({
                    CustomerID: [this.customerID],
                    EnergyType: ["1"],
                    ReadingValue: [""],
                    LowReadingValue: [""],
                    Date: [new Date()],
                    AdditionalInfo: [""]
                });
               

            }
        });
    }
    // For current meter reading is less then previous meter reading - END

    // For current range is less then previous range - START
    getRangeDetails(): any {
        Swal.fire({
            // title: 'Are you sure?',
            text:
                "dfsfsd",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(result => {
            if (result.value) {
               


            } else {
                this.addEconomicForm = this.formBuilder.group({
                    CustomerID: [this.customerID],
                    EnergyType: ["2"],
                    ReadingValue: [""],
                    LowReadingValue: [""],
                    Date: [new Date()],
                    AdditionalInfo: [""]
                });

                this.addElecForm = this.formBuilder.group({
                    CustomerID: [this.customerID],
                    EnergyType: ["2"],
                    ReadingValue: [""],
                    LowReadingValue: [""],
                    Date: [new Date()],
                    AdditionalInfo: [""]
                });

                this.addGasForm = this.formBuilder.group({
                    CustomerID: [this.customerID],
                    EnergyType: ["1"],
                    ReadingValue: [""],
                    LowReadingValue: [""],
                    Date: [new Date()],
                    AdditionalInfo: [""]
                });
            }
        });
    }
    // For current range is less then previous range - END



    // Dual fule with economy meter - START
    addgaesMeter(): any {
        
        let preReadingOfGas: any;
        let preReadingOfLowElc: any;
        let preReadingOfNormalElec: any;

        // get Range of pervious meter reading
        const pLowRange = this.previousMeterReadingData.ElectricityPreviousLowUnitDifference;
        const pnrmlRange = this.previousMeterReadingData.ElectricityUnitDifference;
        const pGasRange = this.previousMeterReadingData.GasUnitDifference;

        // check all values are null or not 
        if (!!this.otpforreadingofgas && !!this.otpforlowreadingofelectricity && !!this.otpforhighreadingofelectricity) {

            // convert all the values into numbers
            const otpforhighreadingofelectricity = Number(this.otpforhighreadingofelectricity);
            const otpforlowreadingofelectricity = Number(this.otpforlowreadingofelectricity);
            const otpforgas = Number(this.otpforreadingofgas);

            if (!!this.prevDataGas && !!this.prevDataElec && !!this.prevDataLowElec) {
                preReadingOfGas = this.prevDataGas;
                preReadingOfLowElc = this.prevDataLowElec;
                preReadingOfNormalElec = this.prevDataElec;
            } else {
                preReadingOfGas = 0;
                preReadingOfLowElc = 0;
                preReadingOfNormalElec = 0;
            }

            // check entered gas value length is min 4 and mx 5 and for elec minmum length is 5 and max 5 or not
            if ((this.otpforreadingofgas.length == 4 || this.otpforreadingofgas.length == 5) && this.otpforlowreadingofelectricity.length == 5 && this.otpforhighreadingofelectricity.length == 5) {

                // check that values are not zero
                if (this.otpforreadingofgas != "0000" && this.otpforreadingofgas != "00000" && this.otpforlowreadingofelectricity != "00000" && this.otpforhighreadingofelectricity != "00000") {

                    // check pervious value is zero or null or undefined
                    if (preReadingOfGas != 0 || preReadingOfLowElc != 0 || preReadingOfNormalElec != 0) {

                        
                        if (!!this.prevDataGas && !!this.prevDataElec && !!this.prevDataLowElec) {
                            this.lowMeterRange = otpforlowreadingofelectricity - this.prevDataLowElec;
                            this.nrmlMeterRange = otpforhighreadingofelectricity - this.prevDataElec;
                            this.gasMeterRange = otpforgas - this.prevDataGas;
                        }
                        // let a: any;
                        // a = this.comparingValus(Number(this.otpforreadingofgas), Number(preReadingOfGas));
                        // let b: any = this.comparingValus(Number(this.otpforhighreadingofelectricity), Number(preReadingOfNormalElec));
                        // let c: any = this.comparingValus(Number(this.otpforlowreadingofelectricity), Number(preReadingOfLowElc));
                       
                       if ( this.comparingValus(Number(this.otpforreadingofgas), Number(preReadingOfGas) )) {
                            this.isShowGasMeter = true;
                            this.isShowGasRange = false;
                       } else {
                           if (this.comparingValus(this.gasMeterRange , pGasRange) ) {
                                this.isShowGasRange = true;
                                this.isShowGasMeter = false;
                           }
                       }

                        if (this.comparingValus(Number(this.otpforhighreadingofelectricity), Number(preReadingOfNormalElec))) {
                            this.isShowNormalMeter = true;
                            this.isShowNormalRange = false; 
                        } else {
                            if (this.comparingValus(this.nrmlMeterRange, pnrmlRange)) {
                                this.isShowNormalRange = true;
                                this.isShowNormalMeter = false;
                            }
                        }

                        if (this.comparingValus(Number(this.otpforlowreadingofelectricity), Number(preReadingOfLowElc))) {
                            this.isShowLowMeter = true;
                            this.isShowLowRange = false;
                        } else {
                            if (this.comparingValus(this.lowMeterRange, pLowRange)) {
                                this.isShowLowRange = true;
                                this.isShowLowMeter = false;
                            }
                        }

                        if (!this.isShowGasMeter && !this.isShowNormalMeter && !this.isShowLowMeter) {
                            
                    if (this.isShowGasRange == true || this.isShowNormalRange == true || this.isShowLowRange) {
                        Swal.fire({
                            // title: 'Are you sure?',
                            text:
                                "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirm"
                        }).then(result => {
                            if (result.value) {
                                this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                    disableClose: true,
                                    panelClass: 'range-reason',
                                    data: {
                                        IsgasLessMeter: this.isShowGasRange,
                                        IselcLowLessMeter: this.isShowLowRange,
                                        IselcNrmlLessMeter: this.isShowNormalRange
                                    }
                                });
                                this.dialogRef2.afterClosed().subscribe(response => {
                                    
                                    if (!!response) {
                                        this.gasReason = response.reasons.gasReason;
                                        this.elecLowReason = response.reasons.elecLowReason;
                                        this.elecNrmlReason = response.reasons.elecNrmlReason;

                                        this.saveMeterREading();
                                    }
                                });
                            }
                        });
                    } else {
                        this.saveMeterREading();
                    }
                        } else  {

                        if (this.isShowGasMeter || this.isShowNormalMeter || this.isShowLowMeter) {
                            Swal.fire({
                                // title: 'Are you sure?',
                                text:
                                    "The meter reading you have entered is lower than the reading previously provided. Is this reading correct?",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm"
                            }).then(result => {
                                if (result.value) {
                                    this.dialogRef1 = this.dialog.open(GetUserQuestionFormDialogComponent, {
                                        disableClose: true,
                                        panelClass: 'GetUserReason',
                                        data: {
                                            IsgasLessMeter: this.isShowGasMeter,
                                            IselcLowLessMeter: this.isShowLowMeter,
                                            IselcNrmlLessMeter: this.isShowNormalMeter
                                        }
                                    });
                                    this.dialogRef1.afterClosed().subscribe(response1 => {
                                        
                                        if (!!response1) {
                                            if (!!response1.reasons.gasReason) {
                                                this.gasReason = response1.reasons.gasReason;
                                            }
                                            if ( !!response1.reasons.elecLowReason) {
                                                this.elecLowReason = response1.reasons.elecLowReason;
                                            }
                                            if (!!response1.reasons.elecNrmlReason) {
                                                this.elecNrmlReason = response1.reasons.elecNrmlReason;

                                            }

                                            if (this.isShowGasRange == true || this.isShowNormalRange == true || this.isShowLowRange) {
                                                Swal.fire({
                                                    // title: 'Are you sure?',
                                                    text:
                                                        "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Confirm"
                                                }).then(result => {
                                                    if (result.value) {
                                                        this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                                            disableClose: true,
                                                            panelClass: 'range-reason',
                                                            data: {
                                                                IsgasLessMeter: this.isShowGasRange,
                                                                IselcLowLessMeter: this.isShowLowRange,
                                                                IselcNrmlLessMeter: this.isShowNormalRange
                                                            }
                                                        });
                                                        this.dialogRef2.afterClosed().subscribe(response => {
                                                            
                                                            if (!!response) {
                                                                if (!!response.reasons.gasReason) {
                                                                    this.gasReason = response.reasons.gasReason;
                                                                }
                                                                if ( !!response.reasons.elecLowReason) {
                                                                    this.elecLowReason = response.reasons.elecLowReason;
                                                                }
                                                                if (!!response.reasons.elecNrmlReason) {
                                                                    this.elecNrmlReason = response.reasons.elecNrmlReason;
                    
                                                                }
                    
                                                                this.saveMeterREading();
                                                                
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                this.saveMeterREading();
                                            }

                                        }
                                    });
                                }
                            });
                    } 

                }


                    } else {
                        // else of check whether previous value is zero or not 
                        this.saveMeterREading();
                    }

                } else {
                    // else of zero condition
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "All digit should not be zero."
                    });
                }
            } else {
                // else of length condition
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail:
                        "Gas meter reading must be 4 or 5 digits and Electricity meter reading must be 5 digits."
                });
            }
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "Error",
                detail: "Please enter meter reading value."
            });
        }
    }
    // Dual fule with economy meter - END



    //get vakl

    comparingValus = (previousVal, currentValue) => {
        if (currentValue >= previousVal) {
            return true;
        } else {
            return false;
        }
    }


    // Dual fule without economy meter - START

    addgasElecMeter(): any {
        
        let preReadingOfGas: any;
        let preReadingOfNormalElec: any;

        // get Range of pervious meter reading
        const pnrmlRange = this.previousMeterReadingData.ElectricityUnitDifference;
        const pGasRange = this.previousMeterReadingData.GasUnitDifference;

        // check all values are null or not 
        if (!!this.otpforreadingofgas && !!this.otpforhighreadingofelectricity) {

            // convert all the values into numbers
            const otpforhighreadingofelectricity = Number(this.otpforhighreadingofelectricity);
            const otpforgas = Number(this.otpforreadingofgas);

            if (!!this.prevDataGas && !!this.prevDataElec) {
                preReadingOfGas = this.prevDataGas;
                preReadingOfNormalElec = this.prevDataElec;
            } else {
                preReadingOfGas = 0;
                preReadingOfNormalElec = 0;
            }

            // check entered gas value length is min 4 and mx 5 and for elec minmum length is 5 and max 5 or not
            if ((this.otpforreadingofgas.length == 4 || this.otpforreadingofgas.length == 5) && this.otpforhighreadingofelectricity.length == 5) {

                // check that values are not zero
                if (this.otpforreadingofgas != "0000" && this.otpforreadingofgas != "00000" && this.otpforhighreadingofelectricity != "00000") {

                    // check pervious value is zero or null or undefined
                    if (preReadingOfGas != 0 || preReadingOfNormalElec != 0) {

                        if (!!this.prevDataGas && !!this.prevDataElec ) {
                            this.nrmlMeterRange = otpforhighreadingofelectricity - this.prevDataElec;
                            this.gasMeterRange = otpforgas - this.prevDataGas;
                        }
                        if ( this.comparingValus(Number(this.otpforreadingofgas), Number(preReadingOfGas) )) {
                            this.isShowGasMeter = true;
                            this.isShowGasRange = false;
                       } else {
                           if (this.comparingValus(this.gasMeterRange , pGasRange) ) {
                                this.isShowGasRange = true;
                                this.isShowGasMeter = false;
                           }
                       }

                        if (this.comparingValus(Number(this.otpforhighreadingofelectricity), Number(preReadingOfNormalElec))) {
                            this.isShowNormalMeter = true;
                            this.isShowNormalRange = false; 
                        } else {
                            if (this.comparingValus(this.nrmlMeterRange, pnrmlRange)) {
                                this.isShowNormalRange = true;
                                this.isShowNormalMeter = false;
                            }
                        }

                       

                        if (!this.isShowGasMeter && !this.isShowNormalMeter) {
                            
                    if (this.isShowGasRange == true || this.isShowNormalRange == true) {
                        Swal.fire({
                            // title: 'Are you sure?',
                            text:
                                "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirm"
                        }).then(result => {
                            if (result.value) {
                                this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                    disableClose: true,
                                    panelClass: 'range-reason',
                                    data: {
                                        IsgasLessMeter: this.isShowGasRange,
                                        IselcNrmlLessMeter: this.isShowNormalRange
                                    }
                                });
                                this.dialogRef2.afterClosed().subscribe(response => {
                                    
                                    if (!!response) {
                                        this.gasReason = response.reasons.gasReason;
                                        this.elecNrmlReason = response.reasons.elecNrmlReason;

                                        this.saveMeterREading();
                                    }
                                });
                            }
                        });
                    } else {
                        this.saveMeterREading();
                    }
                        } else  {

                        if (this.isShowGasMeter || this.isShowNormalMeter) {
                            Swal.fire({
                                // title: 'Are you sure?',
                                text:
                                    "The meter reading you have entered is lower than the reading previously provided. Is this reading correct?",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm"
                            }).then(result => {
                                if (result.value) {
                                    this.dialogRef1 = this.dialog.open(GetUserQuestionFormDialogComponent, {
                                        disableClose: true,
                                        panelClass: 'GetUserReason',
                                        data: {
                                            IsgasLessMeter: this.isShowGasMeter,
                                            IselcNrmlLessMeter: this.isShowNormalMeter
                                        }
                                    });
                                    this.dialogRef1.afterClosed().subscribe(response1 => {
                                        
                                        if (!!response1) {
                                            if (!!response1.reasons.gasReason) {
                                                this.gasReason = response1.reasons.gasReason;
                                            }
                                           
                                            if (!!response1.reasons.elecNrmlReason) {
                                                this.elecNrmlReason = response1.reasons.elecNrmlReason;

                                            }

                                            if (this.isShowGasRange == true || this.isShowNormalRange == true) {
                                                Swal.fire({
                                                    // title: 'Are you sure?',
                                                    text:
                                                        "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Confirm"
                                                }).then(result => {
                                                    if (result.value) {
                                                        this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                                            disableClose: true,
                                                            panelClass: 'range-reason',
                                                            data: {
                                                                IsgasLessMeter: this.isShowGasRange,
                                                                IselcNrmlLessMeter: this.isShowNormalRange
                                                            }
                                                        });
                                                        this.dialogRef2.afterClosed().subscribe(response => {
                                                            
                                                            if (!!response) {
                                                                if (!!response.reasons.gasReason) {
                                                                    this.gasReason = response.reasons.gasReason;
                                                                }
                                                                
                                                                if (!!response.reasons.elecNrmlReason) {
                                                                    this.elecNrmlReason = response.reasons.elecNrmlReason;
                    
                                                                }
                    
                                                                this.saveMeterREading();
                                                                
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                this.saveMeterREading();
                                            }

                                        }
                                    });
                                }
                            });
                    } 

                }
                       
                    } else {
                        // else of check whether previous value is zero or not 
                        this.saveMeterREading();
                    }

                } else {
                    // else of zero condition
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "All digit should not be zero."
                    });
                }
            } else {
                // else of length condition
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail:
                        "Gas meter reading must be 4 or 5 digits and Electricity meter reading must be 5 digits."
                });
            }
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "Error",
                detail: "Please enter meter reading value."
            });
        }
    }

    // Dual fule without economy meter - END



    // Economy meter reading - START
    addEconomicMeter(): any {
        
        let preReadingOfLowElc: any;
        let preReadingOfNormalElec: any;

        // get Range of pervious meter reading
        const pLowRange = this.previousMeterReadingData.ElectricityPreviousLowUnitDifference;
        const pnrmlRange = this.previousMeterReadingData.ElectricityUnitDifference;

        // check all values are null or not 
        if (!!this.otpforlowreadingofelectricity && !!this.otpforhighreadingofelectricity) {

            // convert all the values into numbers
            const otpforhighreadingofelectricity = Number(this.otpforhighreadingofelectricity);
            const otpforlowreadingofelectricity = Number(this.otpforlowreadingofelectricity);

            if (!!this.prevDataElec && !!this.prevDataLowElec) {
                preReadingOfLowElc = this.prevDataLowElec;
                preReadingOfNormalElec = this.prevDataElec;
            } else {
                preReadingOfLowElc = 0;
                preReadingOfNormalElec = 0;
            }

            // check entered gas value length is min 4 and mx 5 and for elec minmum length is 5 and max 5 or not
            if (this.otpforlowreadingofelectricity.length == 5 && this.otpforhighreadingofelectricity.length == 5) {

                // check that values are not zero
                if (this.otpforlowreadingofelectricity != "00000" && this.otpforhighreadingofelectricity != "00000") {

                    // check pervious value is zero or null or undefined
                    if (preReadingOfLowElc != 0 || preReadingOfNormalElec != 0) {

                        if ( !!this.prevDataElec && !!this.prevDataLowElec) {
                            this.lowMeterRange = otpforlowreadingofelectricity - this.prevDataLowElec;
                            this.nrmlMeterRange = otpforhighreadingofelectricity - this.prevDataElec;
                        }

                        if (this.comparingValus(Number(this.otpforhighreadingofelectricity), Number(preReadingOfNormalElec))) {
                            this.isShowNormalMeter = true;
                            this.isShowNormalRange = false; 
                        } else {
                            if (this.comparingValus(this.nrmlMeterRange, pnrmlRange)) {
                                this.isShowNormalRange = true;
                                this.isShowNormalMeter = false;
                            }
                        }

                        if (this.comparingValus(Number(this.otpforlowreadingofelectricity), Number(preReadingOfLowElc))) {
                            this.isShowLowMeter = true;
                            this.isShowLowRange = false;
                        } else {
                            if (this.comparingValus(this.lowMeterRange, pLowRange)) {
                                this.isShowLowRange = true;
                                this.isShowLowMeter = false;
                            }
                        }

                        if (!this.isShowNormalMeter && !this.isShowLowMeter) {
                            
                    if ( this.isShowNormalRange == true || this.isShowLowRange) {
                        Swal.fire({
                            // title: 'Are you sure?',
                            text:
                                "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirm"
                        }).then(result => {
                            if (result.value) {
                                this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                    disableClose: true,
                                    panelClass: 'range-reason',
                                    data: {
                                        IselcLowLessMeter: this.isShowLowRange,
                                        IselcNrmlLessMeter: this.isShowNormalRange
                                    }
                                });
                                this.dialogRef2.afterClosed().subscribe(response => {
                                    
                                    if (!!response) {
                                        this.elecLowReason = response.reasons.elecLowReason;
                                        this.elecNrmlReason = response.reasons.elecNrmlReason;

                                        this.saveMeterREading();
                                    }
                                });
                            }
                        });
                    } else {
                        this.saveMeterREading();
                    }
                        } else  {

                        if ( this.isShowNormalMeter || this.isShowLowMeter) {
                            Swal.fire({
                                // title: 'Are you sure?',
                                text:
                                    "The meter reading you have entered is lower than the reading previously provided. Is this reading correct?",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm"
                            }).then(result => {
                                if (result.value) {
                                    this.dialogRef1 = this.dialog.open(GetUserQuestionFormDialogComponent, {
                                        disableClose: true,
                                        panelClass: 'GetUserReason',
                                        data: {
                                            IselcLowLessMeter: this.isShowLowMeter,
                                            IselcNrmlLessMeter: this.isShowNormalMeter
                                        }
                                    });
                                    this.dialogRef1.afterClosed().subscribe(response1 => {
                                        
                                        if (!!response1) {
                                           
                                            if ( !!response1.reasons.elecLowReason) {
                                                this.elecLowReason = response1.reasons.elecLowReason;
                                            }
                                            if (!!response1.reasons.elecNrmlReason) {
                                                this.elecNrmlReason = response1.reasons.elecNrmlReason;

                                            }

                                            if (this.isShowNormalRange == true || this.isShowLowRange) {
                                                Swal.fire({
                                                    // title: 'Are you sure?',
                                                    text:
                                                        "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Confirm"
                                                }).then(result => {
                                                    if (result.value) {
                                                        this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                                            disableClose: true,
                                                            panelClass: 'range-reason',
                                                            data: {
                                                                IselcLowLessMeter: this.isShowLowRange,
                                                                IselcNrmlLessMeter: this.isShowNormalRange
                                                            }
                                                        });
                                                        this.dialogRef2.afterClosed().subscribe(response => {
                                                            
                                                            if (!!response) {
                                                               
                                                                if ( !!response.reasons.elecLowReason) {
                                                                    this.elecLowReason = response.reasons.elecLowReason;
                                                                }
                                                                if (!!response.reasons.elecNrmlReason) {
                                                                    this.elecNrmlReason = response.reasons.elecNrmlReason;
                    
                                                                }
                    
                                                                this.saveMeterREading();
                                                                
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                this.saveMeterREading();
                                            }

                                        }
                                    });
                                }
                            });
                    } 

                }


                      
                    } else {
                        // else of check whether previous value is zero or not 
                        this.saveMeterREading();
                    }

                } else {
                    // else of zero condition
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "All digit should not be zero."
                    });
                }
            } else {
                // else of length condition
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail:
                        "Electricity meter reading must be 5 digits."
                });
            }
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "Error",
                detail: "Please enter meter reading value."
            });
        }
    }
    // Economy meter reading - END



    // Electricity meter reading - START
    addElcMeter(): any {
        
        let preReadingOfNormalElec: any;

        // get Range of pervious meter reading
        const pnrmlRange = this.previousMeterReadingData.ElectricityUnitDifference;

        // check all values are null or not 
        if (!!this.otpforhighreadingofelectricity) {

            // convert all the values into numbers
            const otpforhighreadingofelectricity = Number(this.otpforhighreadingofelectricity);

            if (!!this.prevDataElec) {
                preReadingOfNormalElec = this.prevDataElec;
            } else {
                preReadingOfNormalElec = 0;
            }

            // check entered gas value length is min 4 and mx 5 and for elec minmum length is 5 and max 5 or not
            if (this.otpforhighreadingofelectricity.length == 5) {

                // check that values are not zero
                if (this.otpforhighreadingofelectricity != "00000") {

                    // check pervious value is zero or null or undefined
                    if (preReadingOfNormalElec != 0) {

                        if (!!this.prevDataElec) {
                            this.nrmlMeterRange = otpforhighreadingofelectricity - Number(this.prevDataElec);
                        }

                        if (this.comparingValus(Number(this.otpforhighreadingofelectricity), Number(preReadingOfNormalElec))) {
                            this.isShowNormalMeter = true;
                            this.isShowNormalRange = false; 
                        } else {
                            if (this.comparingValus(this.nrmlMeterRange, pnrmlRange)) {
                                this.isShowNormalRange = true;
                                this.isShowNormalMeter = false;
                            }
                        }

                       

                        if (!this.isShowNormalMeter) {
                            
                    if ( this.isShowNormalRange == true) {
                        Swal.fire({
                            // title: 'Are you sure?',
                            text:
                                "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirm"
                        }).then(result => {
                            if (result.value) {
                                this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                    disableClose: true,
                                    panelClass: 'range-reason',
                                    data: {
                                        IselcNrmlLessMeter: this.isShowNormalRange
                                    }
                                });
                                this.dialogRef2.afterClosed().subscribe(response => {
                                    
                                    if (!!response) {
                                        this.elecNrmlReason = response.reasons.elecNrmlReason;

                                        this.saveMeterREading();
                                    }
                                });
                            }
                        });
                    } else {
                        this.saveMeterREading();
                    }
                        } else  {

                        if (this.isShowNormalMeter) {
                            Swal.fire({
                                // title: 'Are you sure?',
                                text:
                                    "The meter reading you have entered is lower than the reading previously provided. Is this reading correct?",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm"
                            }).then(result => {
                                if (result.value) {
                                    this.dialogRef1 = this.dialog.open(GetUserQuestionFormDialogComponent, {
                                        disableClose: true,
                                        panelClass: 'GetUserReason',
                                        data: {
                                            IselcNrmlLessMeter: this.isShowNormalMeter
                                        }
                                    });
                                    this.dialogRef1.afterClosed().subscribe(response1 => {
                                        
                                        if (!!response1) {
                                          
                                            if (!!response1.reasons.elecNrmlReason) {
                                                this.elecNrmlReason = response1.reasons.elecNrmlReason;

                                            }

                                            if (this.isShowNormalRange == true) {
                                                Swal.fire({
                                                    // title: 'Are you sure?',
                                                    text:
                                                        "Your Electricity Usage / Gas Usage for lower than previous month. Are you sure its correct?",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Confirm"
                                                }).then(result => {
                                                    if (result.value) {
                                                        this.dialogRef2 = this.dialog.open(RangeReasonFormDialogComponent, {
                                                            disableClose: true,
                                                            panelClass: 'range-reason',
                                                            data: {
                                                                IselcNrmlLessMeter: this.isShowNormalRange
                                                            }
                                                        });
                                                        this.dialogRef2.afterClosed().subscribe(response => {
                                                            
                                                            if (!!response) {
                                                               
                                                                
                                                                if (!!response.reasons.elecNrmlReason) {
                                                                    this.elecNrmlReason = response.reasons.elecNrmlReason;
                    
                                                                }
                    
                                                                this.saveMeterREading();
                                                                
                                                            }
                                                        });
                                                    }
                                                });
                                            } else {
                                                this.saveMeterREading();
                                            }

                                        }
                                    });
                                }
                            });
                    } 

                }
                    } else {
                        // else of check whether previous value is zero or not 
                        this.saveMeterREading();
                    }

                } else {
                    // else of zero condition
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "All digit should not be zero."
                    });
                }
            } else {
                // else of length condition
                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail:
                        "Electricity meter reading must be 5 digits."
                });
            }
        } else {
            this.messageService.add({
                severity: "warn",
                summary: "Error",
                detail: "Please enter meter reading value."
            });
        }
    }
    // Electricity meter reading - END

    saveMeterREading(): any {
        if (this.userEnergyType == "1") {
            const data = new MeterReadingClass.MeterReading();
            Object.assign(data, this.addGasForm.value);
            data.ReadingValue = this.otpforreadingofgas;
            data.AdditionalInfo = this.gasReason;
            data.Date = new Date(data.Date).toLocaleString("en-US", {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
            this._addMeterReading.addMeterReading(data).subscribe(result => {
                if (result.status_code == 0) {
                    const elecData = new MeterReadingClass.MeterReading();
                    if (this.isEconomicMeter == true) {
                        Object.assign(elecData, this.addEconomicForm.value);
                        elecData.LowReadingValue = this.otpforlowreadingofelectricity;
                        elecData.ReadingValue = this.otpforhighreadingofelectricity;
                        elecData.Date = new Date(
                            elecData.Date
                        ).toLocaleString("en-US", {
                            timeZone: Intl.DateTimeFormat().resolvedOptions()
                                .timeZone
                        });
                        elecData.Low_AdditionalInfo = this.elecLowReason;
                        elecData.AdditionalInfo = this.elecNrmlReason;
                    } else {
                        Object.assign(elecData, this.addElecForm.value);
                        elecData.ReadingValue = this.otpforhighreadingofelectricity;
                        elecData.Date = new Date(
                            elecData.Date
                        ).toLocaleString("en-US", {
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                        });
                        elecData.AdditionalInfo = this.elecNrmlReason;
                    }
                    this._addMeterReading.addMeterReading(elecData).subscribe(response => {
                        if (response.status_code == 0) {
                            this.dialogRef.close({ data: response });
                            this.messageService.add({
                                severity: "success",
                                summary: "success",
                                detail: "Meter Reading added successfully."
                            });
                        } else {
                            this.messageService.add({
                                severity: "warn",
                                summary: "Error",
                                detail: "Error in adding meter reading."
                            });
                        }
                    });
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in adding meter reading."
                    });
                }
            });
        } else {
            const elecData = new MeterReadingClass.MeterReading();
            if (this.isEconomicMeter == true) {
                Object.assign(elecData, this.addEconomicForm.value);
                elecData.Date = new Date(elecData.Date).toLocaleString(
                    "en-US",
                    {
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                );
                elecData.ReadingValue = this.otpforhighreadingofelectricity;
                elecData.LowReadingValue = this.otpforlowreadingofelectricity;
                elecData.Low_AdditionalInfo = this.elecLowReason;
                elecData.AdditionalInfo = this.elecNrmlReason;
            } else {
                Object.assign(elecData, this.addElecForm.value);
                elecData.Date = new Date(elecData.Date).toLocaleString(
                    "en-US",
                    {
                        timeZone: Intl.DateTimeFormat().resolvedOptions()
                            .timeZone
                    }
                );
                elecData.ReadingValue = this.otpforhighreadingofelectricity;
                elecData.AdditionalInfo = this.elecNrmlReason;
            }
            this._addMeterReading.addMeterReading(elecData).subscribe(response => {
                if (response.status_code == 0) {
                    this.dialogRef.close({ data: response });
                    this.messageService.add({
                        severity: "success",
                        summary: "success",
                        detail: "Meter Reading added successfully."
                    });
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail: "Error in adding meter reading."
                    });
                }
            });
        }
    }

    ReadingTypeChange(event): any {
        this.type = event.value;
    }

    onOtpChangeforlowreadingofelectricity(otp): any {
        this.otpforlowreadingofelectricity = otp;
    }

    onOtpChangeforhighreadingofelectricity(otp): any {
        this.otpforhighreadingofelectricity = otp;

    }

    onOtpChangeforgasreading(otp): any {
        this
            .otpforreadingofgas = otp;
    }
}
