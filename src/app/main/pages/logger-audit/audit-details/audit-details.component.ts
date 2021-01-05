import {
    Component,
    ViewEncapsulation,
    OnInit,
    Inject,
    ChangeDetectorRef,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    FormControlName,
} from "@angular/forms";
import * as _ from "lodash";
import { MessageService } from "primeng/components/common/messageservice";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
import { NgxJsonViewerModule } from "ngx-json-viewer";
// tslint:disable-next-line:no-duplicate-imports
const moment = _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: "L",
    },
    display: {
        dateInput: "DD/MM/YYYY",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "DD/MM/YYYYY",
        monthYearA11yLabel: "MMM YYYY",
    },
};

@Component({
    selector: "audit-detailsg",
    templateUrl: "./audit-details.component.html",
    styleUrls: ["./audit-details.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class AuditTrailFormDialogComponent implements OnInit {
    dialogTitle: string;
    type: any;
    request: any;
    constructor(
        public dialogRef: MatDialogRef<AuditTrailFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private changeDetectorRefs: ChangeDetectorRef
    ) {
        this.request = JSON.parse(data.event);
    }

    ngOnInit(): any {}
}
