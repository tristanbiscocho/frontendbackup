import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { LoaderService } from 'app/main/services/loader.service';
import { CRM_URL } from 'app/main/services/config';
@Component({
    selector     : 'vertical-layout-1',
    templateUrl  : './layout-1.component.html',
    styleUrls    : ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    showLoader: any;
    currentUser: any;
    isShowMessage: any;
    display:boolean = false;
    helpdisplay:boolean;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _loaderService: LoaderService
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
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
        // Set the defaults
        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
                // this.helpdisplay = true;
            });

          
         
            this._loaderService.IsCustomer.subscribe((val: boolean) => {
                this.isShowMessage = val;
                const currentuserdata = localStorage.getItem('UserDetail');
                // this._loaderService.isHelp(false)
                if (!!currentuserdata) {
                    this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
                    if (this.currentUser.RoleType == 2)
                    {
                        this.display = true;
                    }
                    else
                    {
                        this.display = false;
                    }
                }
                if (this.isShowMessage == true) {
         
                } else {
         
                    $("#tiledeskdiv").hide();
                }
            });
    
    }
    ngAfterViewInit() {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
      }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    
    navigate()
    {
        if(this.currentUser && this.currentUser.RoleType == 2)
        {
            var url = CRM_URL +'/index.php/login?username='+this.currentUser.UserName+'&password='+this.currentUser.CrmToken;
            window.open(url)
        }
        else
        {
            var url = CRM_URL;
            window.open(url)
        }
        
    }
}
