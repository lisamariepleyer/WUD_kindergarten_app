import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { ConfigService } from "../../shared/config.service";
import { StoreService } from 'src/app/shared/store.service';
import { PageEvent } from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {Kindergarden} from "../../shared/interfaces/Kindergarden";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  isLoading = false;

  constructor(private http: HttpClient,
              public storeService: StoreService,
              private backendService: BackendService,
              private configService: ConfigService) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  @Input('kindergartenIDFilter') kindergartenIDFilter = 0;
  @Input('isOrderByName') isOrderByName = false;
  @Input('isOrderBySignupDate') isOrderBySignupDate = false;
  @Input('signupOrder') signupOrder = "asc";

  ngOnInit(): void {
    this.backendService.getChildren(this.kindergartenIDFilter, this.currentPage,
      this.isOrderByName,
      this.isOrderBySignupDate, this.signupOrder);

    this.initiateSpinner();
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
    this.initiateSpinner();

    this.backendService.deleteChildData(childId,
      this.kindergartenIDFilter, this.currentPage,
      this.isOrderByName,
      this.isOrderBySignupDate, this.signupOrder);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.configService.setChildrenPerPage(event.pageSize);
    this.selectPageEvent.emit(this.currentPage);

    this.backendService.getChildren(this.kindergartenIDFilter, this.currentPage,
      this.isOrderByName,
      this.isOrderBySignupDate, this.signupOrder);
  }

  initiateSpinner() {
    this.isLoading = true;
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.isLoading = false;
    });
  }

  protected readonly CHILDREN_PER_PAGE = this.configService.getChildrenPerPage();
}
