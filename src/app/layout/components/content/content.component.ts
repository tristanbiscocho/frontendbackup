import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LoaderService } from 'app/main/services/loader.service';
import { CRM_URL } from 'app/main/services/config';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
    showLoader: any;
    currentUser: any;
    isShowMessage: any;
    display:boolean = false;
    /**
     * Constructor
     */
    constructor(private _loaderService: LoaderService) {
    }

    ngOnInit(): any {
        this._loaderService.IsCustomer.subscribe((val: boolean) => {
            this.isShowMessage = val;
            const currentuserdata = localStorage.getItem('UserDetail');
            if (!!currentuserdata) {
                this.currentUser = JSON.parse(localStorage.getItem('UserDetail'));
                if(this.currentUser.RoleType == 2)
                {
                    this.display = true;
                }
                else
                {
                    this.display = false;
                }
            }
            if (this.isShowMessage == true) {
                //this.curentuser part is commited because of hide tiledesk part
                // if (!!this.currentUser) {
                //     if (this.currentUser.RoleType == 2) {
                //         window['tiledeskSettings'] =
                //         {
                //             "projectid": "5e099379e5ffe00017744eba",
                //         };
                //         (function (d, s, id) {
                            
                //             let js,
                //                 fjs = d.getElementsByTagName(s)[0];
                //             if (!!fjs) {
                //                 if (d.getElementById(id)) return;
                //                 js = d.createElement(s); js.id = id; // js.async=!0;
                //                 js.src = "https://widget.tiledesk.com/v3/launch.js";
                //                 fjs.parentNode.insertBefore(js, fjs);
                //             }

                //         }(document, 'script', 'tiledesk-jssdk'));
                //     }
                //     $("#tiledeskdiv").show();
                // }
            } else {
                
                // window['tiledeskSettings'] =
                // {
                //     "projectid": "5e099379e5ffe00017744eba",
                // };
                // (function (d, s, id) {
                //     
                //     let js,
                //         fjs = d.getElementsByTagName(s)[50];
                //     if (!!fjs) {
                //         if (d.getElementById(id)) return;
                //         js = d.createElement(s); js.id = id; // js.async=!0;
                //         js.src = "https://widget.tiledesk.com/v3/launch.js";
                //         fjs.parentNode.insertBefore(js, fjs);
                //     }

                // }(document, 'script', 'tiledesk-jssdk'));

                // var d = document.getElementById("chat21-container");

                // d.classList.remove("active");
                $("#tiledeskdiv").hide();
            }
        });



    }

    // navigate()
    // {
        
    //     if(this.currentUser && this.currentUser.RoleType == 2)
    //     {
    //         var url = CRM_URL +'/index.php/login?username='+this.currentUser.UserName+'&password='+this.currentUser.CrmToken;
    //         window.open(url)
    //     }
    //     else
    //     {
    //         var url = CRM_URL;
    //         window.open(url)
    //     }
        
    // }

    ngAfterViewInit() {
        this._loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}
