import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from 'src/app/shared/store.service';


@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private formbuilder: FormBuilder,
    public storeService: StoreService) {
  }
  public filterForm: any;
  @Output() kindergartenIDFilter = new EventEmitter<number>();
  @Output() isOrderByName = new EventEmitter<boolean>();
  @Output() isOrderBySignupDate = new EventEmitter<boolean>();
  @Output() signupOrder = new EventEmitter<string>();
  signupOrderDefault = "asc";

  get showSignupOrderField(): boolean {
    return this.filterForm.get('NameOrder').value === 'signupdate';
  }

  ngOnInit(): void {
    this.filterForm = this.formbuilder.group({
      kindergardenFilter: [''],
      NameOrder: [''],
      SignupOrder: ['']
    })

    this.backendService.getChildren();
  }

  onSubmit() {
    const selectedKindergardenFilter = this.filterForm.value.kindergardenFilter;
    const selectedOrder = this.filterForm.value.NameOrder;
    const selectedSignupOrder = this.filterForm.value.SignupOrder;

    var selectedIsOrderByName = false;
    var selectedIsOrderBySignupDate = false;
    if (selectedOrder === "name") {
      selectedIsOrderByName = true;
      selectedIsOrderBySignupDate = false;
    }
    if (selectedOrder === "signupdate") {
      selectedIsOrderByName = false;
      selectedIsOrderBySignupDate = true;
    }

    this.kindergartenIDFilter.emit(selectedKindergardenFilter);
    this.isOrderByName.emit(selectedIsOrderByName);
    this.isOrderBySignupDate.emit(selectedIsOrderBySignupDate);
    this.signupOrder.emit(selectedSignupOrder);

    this.backendService.getChildren(selectedKindergardenFilter, 0, selectedIsOrderByName, selectedIsOrderBySignupDate, selectedSignupOrder);
  }
}
