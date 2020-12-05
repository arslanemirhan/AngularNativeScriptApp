import { StylesCompileDependency } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Login",
    templateUrl: "./login.component.html",
    styleUrls: ['./login-common.css' , 'login.css']
})
export class LoginComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onTap() {
        console.log("EEEEEE")
    }
}
