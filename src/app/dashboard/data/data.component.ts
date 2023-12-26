import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { ConfigService } from "../../shared/config.service";
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService,
              private backendService: BackendService,
              private configService: ConfigService) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;

  ngOnInit(): void {
    this.backendService.getChildren(0, this.currentPage);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.configService.setChildrenPerPage(event.pageSize);
    this.selectPageEvent.emit(this.currentPage);
    this.backendService.getChildren(0, this.currentPage);
  }

  protected readonly CHILDREN_PER_PAGE = this.configService.getChildrenPerPage();
}
