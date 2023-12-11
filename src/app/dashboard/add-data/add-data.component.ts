import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit{
  minDate: Date = new Date();
  maxDate: Date = new Date();

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService) {
  }
  public addChildForm: any;
  @Input() currentPage!: number;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required]
    })

    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear() - 7, 0, 1);
    this.maxDate = currentDate;
  }

  onSubmit() {
    if(this.addChildForm.valid) {
      console.log(this.currentPage);
      this.backendService.addChildData(this.addChildForm.value, this.currentPage)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Kind erfolgreich angemeldet!';
            this.errorMessage = '';
          },
          error: (error) => {
            this.errorMessage = 'Anmeldung fehlgeschlagen. Bitte erneut versuchen.';
            this.successMessage = '';
          }
        });
    }
  }
}
