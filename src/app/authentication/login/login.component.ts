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
  private loading = false;

  constructor(private loginService: LoginService) {
    this.loginData = new LoginModel();
  }

  ngOnInit() {}

  private login = () => {
    this.loginService.login(this.loginData, this.setLoading).subscribe();
  };

  public setLoading = (value) => {
    this.loading = value;
  };
}
