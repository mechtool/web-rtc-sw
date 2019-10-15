import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {AppContextService} from "../../services/app-context.service";
import {ColorThemeService} from "../../services/color-theme.service";

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnDestroy {
    
    public callModel;
    public subscribers = [];
    public messageContacts = [];

    constructor(
	public appContext: AppContextService,
	public colorThemeService : ColorThemeService,
    ) {
        this.callModel = window.localStorage.getItem('callModel');
	this.subscribers.push(this.appContext.messageContacts.subscribe(contacts => {
	    this.messageContacts = contacts.map(cont => {
	    return {contact : cont , options : {menu : 1}};
		})
	}));
    }
    ngOnDestroy(){
	this.subscribers.forEach(sub => sub.unsubscribe());
    }
    
    onDeleteItem($event){
	this.appContext.messageContacts.next(this.messageContacts.filter(cont => {
	    return !(cont === $event);
	}).map(cont => cont.contact));
    }
}
