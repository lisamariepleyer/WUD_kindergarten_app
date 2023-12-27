import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public currentPage: number = 0;
  public showAddData = false;
  kindergartenIDFilter = 0;
  isOrderByName = false;

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }

  toggleSetFilter(kindergartenIDFilter: number) {
    this.kindergartenIDFilter = kindergartenIDFilter;
  }

  toggleSetOrder(isOrderByName: boolean) {
    this.isOrderByName = isOrderByName;
  }

}
