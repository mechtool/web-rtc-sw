import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../../Classes/MainClasses";
import {FormControl, Validators} from "@angular/forms";
import {AppContextService} from "../../../services/app-context.service";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
    //Элемент формы, выбирающий контакты из списка контактов пользователя приложения,
    //полученного при старте системы appContext.
    @Input() public collection : BehaviorSubject<Contact[]>/* Contact[]*/ ;
    public resultCollection : Observable<Contact[]>;
    public contactControl = new FormControl('', [Validators.required]);
    
    constructor(public appContext : AppContextService) {}

  ngOnInit() {
  }
  
  onKeyup(){
        this.resultCollection = this.collection.pipe(map(conts => {
                   return conts.filter(cont => {
		       let phone = cont.phoneNumber,
			   name = cont.name || cont.displayName,
			   email = cont.email,
			   contactControl = this.contactControl.value.trim();
		       if(contactControl) return phone.indexOf(contactControl) == 0 || name.indexOf(contactControl) == 0 || email.indexOf(contactControl) == 0 ;
		       else return false;
		   })
	   }))
    } ;

}
