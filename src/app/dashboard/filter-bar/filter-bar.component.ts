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
  //@Output() signupOrder = new EventEmitter<string>();

  ngOnInit(): void {
    this.filterForm = this.formbuilder.group({
      kindergardenFilter: [''],
      NameOrder: ['']
      //SignupOrder: ['']
    })

    this.backendService.getChildren();
  }

  onSubmit() {
    const selectedKindergardenFilter = this.filterForm.value.kindergardenFilter;
    const selectedOrder = this.filterForm.value.NameOrder;

    var selectedIsOrderByName = false;
    if (selectedOrder === "name") {
      selectedIsOrderByName = true;
    }
    //const selectedSignupOrder = this.filterForm.value.SignupOrder;

    console.log(this.filterForm.value.NameOrder);
    this.kindergartenIDFilter.emit(selectedKindergardenFilter);
    this.isOrderByName.emit(selectedIsOrderByName);
    //this.signupOrder.emit(selectedSignupOrder);

    this.backendService.getChildren(selectedKindergardenFilter, 0, selectedIsOrderByName);
  }
}
