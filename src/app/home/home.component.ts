import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user/user.service";
import { Router } from "@angular/router";

@Component({
    selector: "Home",
    providers: [UserService],
    templateUrl: "./home.component.html",
    styleUrls: ['./home-common.css' , 'home.css']
})
export class HomeComponent implements OnInit {

    news: string;

    constructor(private userService: UserService, private router: Router) {

    }

    ngOnInit() {
        this.extractData();
    }

    extractData() {
        this.userService.getContentNews()
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                console.log(error);
            });
    }

    private onGetDataSuccess(res) {
        this.news = res[0].news;
    }

    public backToLogin(){
        this.router.navigate(['/login']);
    }
}
