import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { ConfigService } from './config.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private configService: ConfigService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getChildren(kindergartenID= 0, page = 0,
                     isOrderedByName = false,
                     isOrderedBySignupDate = false, orderBySignupDate = "asc") {

    var orderParam = ""
    if (isOrderedByName) {
      orderParam = "&_sort=kindergardenId,name&_order=asc,asc"
    }
    if (isOrderedBySignupDate) {
      orderParam = `&_sort=signupDate&_order=${orderBySignupDate}`
    }

    var kindergartenFilterParam = ""
    if (kindergartenID > 0) {
      kindergartenFilterParam = `&kindergardenId=${kindergartenID}`
    }

    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page + 1}&_limit=${this.configService.getChildrenPerPage()}${kindergartenFilterParam}${orderParam}`, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
    });
  }

  public getAllChildren() {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden`, { observe: 'response' }).subscribe(data => {
      this.storeService.allChildren = data.body!;
    });
  }

  public addChildData(child: Child, page:  number): Observable<any> {
    return this.http.post('http://localhost:5000/childs', child);
  }

  public deleteChildData(childId: string, page: number) {
    this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_=> {
      this.getChildren(page);
    })
  }
}
