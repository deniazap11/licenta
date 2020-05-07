import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {
  transform(campaigns: any, searchText: any): any {
    if (searchText == null) return campaigns;

    return campaigns.filter(function (campaigns) {
      return (
        campaigns.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      );
    });
  }
}
