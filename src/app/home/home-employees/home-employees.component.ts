import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { interval } from "rxjs";

@Component({
  selector: "app-home-employees",
  templateUrl: "./home-employees.component.html",
  styleUrls: ["./home-employees.component.scss"],
})
export class HomeEmployeesComponent implements OnInit {
  private employees = [];
  private employee = null;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getStaticData();
    this.displayEmployees();
  }

  private getStaticData = () => {
    const employeesSelector = (state) => {
      return state.home.employees;
    };

    let employees$ = this.store.select(employeesSelector);

    employees$.subscribe((employees) => {
      this.employees = employees;
    });
  };

  private displayEmployees = () => {
    let employeeInterval = interval(6000);
    let index = 0;

    this.employee = this.employees[0];

    employeeInterval.subscribe(() => {
      this.employee = this.employees[index++];
      if (index == this.employees.length) {
        index = 0;
      }
    });
  };
}
