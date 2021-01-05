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
    selector: "range-reason",
    templateUrl: "./range-reason.component.html",
    styleUrls: ["./range-reason.component.scss"],
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
export class RangeReasonFormDialogComponent implements OnInit {
   
    IsgasLessMeter: any;
    IselcLowLessMeter: any;
    IselcNrmlLessMeter: any;

    gasReason: any;
    elecLowReason: any;
    elecNrmlReason: any;

    IsGasReason: any;
    ISElecLowReason: any;
    ISElecNrmlReason: any;
    constructor(
        public dialogRef: MatDialogRef<RangeReasonFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        public _addMeterReading: MeterReadingService,
        public messageService: MessageService,
        public dialog: MatDialog
    ) {
        
        this.IsgasLessMeter =  data.IsgasLessMeter;
        this.IselcLowLessMeter = data.IselcLowLessMeter;
        this.IselcNrmlLessMeter = data.IselcNrmlLessMeter;
        dialogRef.disableClose = true;
    }

    ngOnInit(): any {
    }

    AddReason(): any {
        
        let data: any;
        if (this.IsgasLessMeter == true && this.IselcLowLessMeter == true && this.IselcNrmlLessMeter == true ) {
            if (!!this.gasReason && !!this.elecLowReason && !!this.elecNrmlReason) {
                data = {
                    gasReason: this.gasReason,
                    elecLowReason: this.elecLowReason,
                    elecNrmlReason: this.elecNrmlReason
                };
                this.dialogRef.close({ reasons : data });   
            } else {

                this.messageService.add({
                    severity: "warn",
                    summary: "Error",
                    detail:
                        "Please enter valid reason."
                });

            }
        } else {
            if (this.IsgasLessMeter == true) {
                if (!!this.gasReason) {
                    this.IsGasReason = true;
                } else {
                    this.messageService.add({
                        severity: "warn",
                        summary: "Error",
                        detail:
                            "Please enter valid reason."
                    });
                    this.IsGasReason = false;
                }
            } else {
                this.IsGasReason = true;
            }
                if (this.IselcLowLessMeter == true) {
                    if (!!this.elecLowReason) {
                        this.ISElecLowReason = true;
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail:
                                "Please enter valid reason."
                        });

                        this.ISElecLowReason = false;
                    }
                } else {
                    this.ISElecLowReason = true;
                }

                if (this.IselcNrmlLessMeter == true) {
                    if (!!this.elecNrmlReason) {
                        this.ISElecNrmlReason = true;
                    } else {
                        this.messageService.add({
                            severity: "warn",
                            summary: "Error",
                            detail:
                                "Please enter valid reason."
                        });

                        this.ISElecNrmlReason = false;
                    }
                } else {
                    this.ISElecNrmlReason = true;
                }


                if (this.IsGasReason == true && this.ISElecNrmlReason == true && this.ISElecLowReason == true)  {
                    data = {
                        gasReason: this.gasReason,
                        elecNrmlReason: this.elecNrmlReason,
                        elecLowReason: this.elecLowReason
                    };
                    this.dialogRef.close({ reasons : data });
                }
        }
    }
   
}
