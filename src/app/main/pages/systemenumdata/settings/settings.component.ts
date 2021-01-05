import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SystemEnumDataComponent } from '../systemenumdata.component';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'system-filter',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],

})
export class SystemEnumDataSidenavComponent implements OnInit, OnDestroy {
    board: any;
    view = 'main';
    onBoardChanged: Subscription;
    public systemdata: any;
    systemEnum: any;
    public systemEumalldata: any;
    constructor(public sytemenumdata: SystemEnumDataComponent, private formBuilder: FormBuilder) {
        const data = this.sytemenumdata;

    }

    getsystemenumdatabyid(systemEnum): any {
        const systemdata = [];
        this.sytemenumdata.FilteredRows = [];
        if (this.sytemenumdata.SystemEnumListValues != undefined) {
            for (let entry of this.sytemenumdata.SystemEnumListValues) {
                if (entry.ListID == systemEnum) {
                    systemdata.push(entry);
                    this.sytemenumdata.FilteredRows = systemdata;
                }

            }
            if (this.sytemenumdata.rows.length < 0) {
                this.sytemenumdata.rows = [];
            }
        }


    }



    ngOnInit(): any {

    }

    toggleCardCover(): any {
        this.board.settings.cardCoverImages = !this.board.settings.cardCoverImages;
    }

    toggleSubcription(): any {
    }

    ngOnDestroy(): any {

    }
}
