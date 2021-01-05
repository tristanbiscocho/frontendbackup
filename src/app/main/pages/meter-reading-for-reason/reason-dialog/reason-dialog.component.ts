import { Component, ViewEncapsulation, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/components/common/messageservice";

import * as _ from "lodash";

@Component({
    selector: "reason-dialog",
    templateUrl: "./reason-dialog.component.html",
    styleUrls: ["./reason-dialog.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ReasonDialogComponent implements OnInit {
    Data: any;
    dialogTitle: string;

    constructor(
        public dialogRef: MatDialogRef<ReasonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        this.Data = data.data;
    }

    ngOnInit(): any {}
}
