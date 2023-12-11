import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private CHILDREN_PER_PAGE: number = 2; // Default value

  getChildrenPerPage(): number {
    return this.CHILDREN_PER_PAGE;
  }

  setChildrenPerPage(value: number): void {
    this.CHILDREN_PER_PAGE = value;
  }
}
