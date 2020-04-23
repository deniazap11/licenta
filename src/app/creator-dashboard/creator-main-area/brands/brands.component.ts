import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.css"],
})
export class BrandsComponent implements OnInit {
  brands: DatabaseUser[] = [];

  displayedColumns: string[] = ["name", "email"];
  dataSource: MatTableDataSource<DatabaseUser>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient) {
    this.getCreators();
    this.dataSource = new MatTableDataSource(this.brands);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCreators() {
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/users.json"
      )
      .pipe(
        map((responseData) => {
          const usersArray: DatabaseUser[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              usersArray.push({ ...responseData[key], id: key });
            }
          }
          return usersArray;
        })
      )
      .subscribe((users) => {
        var j = 0;
        for (const i in users) {
          if (users[i].userType == "brand") {
            this.brands[j] = users[i];
            j++;
          }
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
