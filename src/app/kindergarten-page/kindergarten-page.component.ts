import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {BackendService} from "../shared/backend.service";
import {ConfigService} from "../shared/config.service";
import {Typ} from "../shared/interfaces/Kindergarden";

@Component({
  selector: 'app-kindergarten-page',
  templateUrl: './kindergarten-page.component.html',
  styleUrls: ['./kindergarten-page.component.scss']
})
export class KindergartenPageComponent {

  constructor(public storeService: StoreService,
              private backendService: BackendService,
              private configService: ConfigService) {}

  ngOnInit(): void {
    this.backendService.getKindergardens();
  }
  public panelOpenState = true;

  getKindergartenType(type: number) {
    var nameOfType = Typ[type];
    return nameOfType;
  }
}
