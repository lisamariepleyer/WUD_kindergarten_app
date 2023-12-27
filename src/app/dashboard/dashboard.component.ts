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

  receiveMessage(newPageCount: number) {
    this.currentPage = newPageCount;
  }

  toggleButtonClicked(showAddData: boolean) {
    this.showAddData = showAddData;
  }

  onSetFilter(kigaID: number) {
    this.kindergartenIDFilter = kigaID;
  }

}
