import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DatabaseService} from "./database.service";

@Injectable({
  providedIn: 'root'
})
export class ApiKeyResolveService implements Resolve<any>{

  constructor(
      private http : HttpClient,
      public database : DatabaseService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
	return this.http.get('/assets/pushApiKeys.json').toPromise();
    }
  
}
