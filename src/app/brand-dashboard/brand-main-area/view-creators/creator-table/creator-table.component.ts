import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { DatabaseUser } from "src/app/auth/DatabaseUser.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-creator-table",
  templateUrl: "./creator-table.component.html",
  styleUrls: ["./creator-table.component.css"]
})
export class CreatorTableComponent implements OnInit {
  creators: DatabaseUser[] = [];

  displayedColumns: string[] = ["name", "email"];
  dataSource: MatTableDataSource<DatabaseUser>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {
    this.getCreators();

    this.dataSource = new MatTableDataSource(this.creators);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.ref.detectChanges();
  }

  getCreators() {
    this.http
      .get<{ [key: string]: DatabaseUser }>(
        "https://project-b7a57.firebaseio.com/users.json"
      )
      .pipe(
        map(responseData => {
          const usersArray: DatabaseUser[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              usersArray.push({ ...responseData[key], id: key });
            }
          }
          return usersArray;
        })
      )
      .subscribe(users => {
        var j = 0;
        for (const i in users) {
          if (users[i].userType == "creator") {
            this.creators[j] = users[i];
            j++;
          }
        }
      });
  }

  applyFilter(event: Event) {
    const input = document.getElementById("filter-input");
    const inputValue = (<HTMLInputElement>(
      document.getElementById("filter-input")
    )).value;
    const filter = inputValue.toUpperCase();
    const table = document.getElementById("creator-table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        var txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
