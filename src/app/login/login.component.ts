import { Component, OnInit, ElementRef,ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { Page } from "tns-core-modules/ui/page";
import { Frame } from "tns-core-modules/ui/frame";
import {TextField} from "tns-core-modules/ui/text-field";

import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";

@Component({
    selector: "Login",
    providers : [UserService],
    templateUrl: "./login.component.html",
    styleUrls: ['./login-common.css' , 'login.css']
})
export class LoginComponent implements OnInit {

    public user: User;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
    }

    public ngOnInit() {

    }

    public submit(){
        this.login();
    }

    private login(){
        const tfUsername = <TextField>Frame.topmost().currentPage.getViewById("username");
        const tfPassword = <TextField>Frame.topmost().currentPage.getViewById("password");
        this.user.username = tfUsername.text;
        this.user.password = tfPassword.text;
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(['/home']),
                (error) => alert('Unfortunately not find your account')
            );
    }
}
