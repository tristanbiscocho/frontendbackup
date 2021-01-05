import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from 'app/main/services/auth';
import { Router } from '@angular/router';
import { CRM_URL } from 'app/main/services/config';



@Component({
    selector   : 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls  : ['./dashboard.component.scss']
})
export class DashboardComponent
{
    currentUser: any;
    userName:any;
    crmtoken:any;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService:AuthService,
        private router:Router
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
            this.crmtoken = this.currentUser.CrmToken;
            
        }
     
        this._authService.getPrefferedName().subscribe((userPrefferName) =>
          {
            this.userName = userPrefferName;
            
          }
          );

     
    }

    navigate()
    {
        
        var url = CRM_URL +'/index.php/login?username='+this.currentUser.UserName+'&password='+this.currentUser.CrmToken;
        window.open(url)
    }
}
