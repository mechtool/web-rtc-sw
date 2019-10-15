import {Component} from '@angular/core';
import {AppContextService} from "../../services/app-context.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {DatabaseService} from "../../services/database.service";
import {Contact} from "../../Classes/MainClasses";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent  {
    
    public contactsLength;
    public appUsers: Contact[];
    
    constructor(
	public appContext: AppContextService,
	public database: DatabaseService,
    ) {
	//Подписка на получения контактов пользователя для отслеживания длинны массива
	this.appContext.contacts.subscribe(cont => {
	    this.contactsLength = cont.length;
	});
	//Подписка на получения пользователей приложения
	this.appContext.appUsers.subscribe(data => {
	    this.appUsers = data;
	});
    }
}
