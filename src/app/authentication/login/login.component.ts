import { Component, OnInit } from "@angular/core";
import { LoginModel } from "./login.model";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  private loginData: LoginModel;

  constructor(private loginService: LoginService) {
    this.loginData = new LoginModel();
  }

  ngOnInit() {}

  private login = () => {
    console.log("loginData", this.loginData);
    this.loginService.login(this.loginData).subscribe();
  };
}
