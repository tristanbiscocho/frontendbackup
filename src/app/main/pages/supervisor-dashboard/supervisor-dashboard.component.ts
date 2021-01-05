import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { SupervisorService } from '../supervisor-list/supervisor-list.service';

@Component({
    selector   : 'supervisor-dashboard',
    templateUrl: './supervisor-dashboard.component.html',
    styleUrls  : ['./supervisor-dashboard.component.scss']
})
export class SupervisorDashboardComponent implements OnInit
{
    currentUser: any;
    counts: any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        public _superviseorService: SupervisorService
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: false
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        const currentuserdata = localStorage.getItem('UserDetail');
        if (!!currentuserdata){
            this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
        }
    }

    
    ngOnInit(): void {
        this.getCount(this.currentUser.CustomerId);
    }

    getCount(id): any {
        this._superviseorService.getSupervisorDashboardCount(id).subscribe(
            response => {
                if (response.status_code === 0) {
                    
                    this.counts = response.data;
                } else {
                    this.counts = [];
                }
            });
    }
}
