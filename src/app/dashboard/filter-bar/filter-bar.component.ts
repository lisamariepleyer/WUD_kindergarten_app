import {Component, Input, OnInit} from '@angular/core';
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

  ngOnInit(): void {
    this.filterForm = this.formbuilder.group({
      kindergardenFilter: ['']
    })

    this.backendService.getChildren();
  }

  onSubmit() {
    const kindergartenIDfilter = this.filterForm.value.kindergardenFilter;
    this.backendService.getChildren(kindergartenIDfilter, 0);
  }
}
