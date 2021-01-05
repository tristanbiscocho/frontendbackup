import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
    selector: "app-support",
    templateUrl: "./support.component.html",
    styleUrls: ["./support.component.scss"],
})
export class SupportComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        window["tiledeskSettings"] = {
            projectid: "5e099379e5ffe00017744eba",
        };
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id; //js.async=!0;
            js.src = "https://widget.tiledesk.com/v3/launch.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "tiledesk-jssdk");
    }
}
