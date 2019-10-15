import {Component} from '@angular/core';
import {AppContextService} from "../../../services/app-context.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../../Classes/MainClasses";
import {find, map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.css']
})
export class PhoneControlComponent {
    
    constructor(
	public appContext : AppContextService
    ) {}
    public states = [
	{class : 'us', code : '+1', src : '/assets/flags-24/002-flag.png'},
	{class : 'arm', code : '+374', src : '/assets/flags-24/007-armenia.png'},
	{class : 'ru', code : '+7', src : '/assets/flags-24/001-russia.png'},
	{class : 'kz', code : '+7', src : '/assets/flags-24/006-kazakhstan.png'},
	{class : 'geo', code : '+995', src : '/assets/flags-24/009-georgia.png' },
	{class : 'de', code : '+49', src : '/assets/flags-24/004-germany.png'},
	{class : 'uk', code : '+380', src : '/assets/flags-24/003-ukraine.png'},
	{class : 'bel', code : '+375', src : '/assets/flags-24/005-belarus.png'},
	{class : 'est' , code : '+372', src : '/assets/flags-24/008-estonia.png'},
    ] ;
    
    public selected = this.states.find((el) => {
	return el.class === window.navigator.language.substring(0, window.navigator.language.indexOf('-'));
    });
    public phoneGroup = new FormGroup({
	codeControl: new FormControl(this.selected, [Validators.required]),
	phoneControl: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    });
    
    onAddContact(){//Формирует из введенных данных телефона экземпляр контакта,
        //если этот экземпляр не существует в списке контактов пользователя. Выбирает существующий контакт
	//из списка контактов пользователя.
	let contact : Contact,
	    phone = this.phoneGroup.value,
	    val = this.appContext.messageContacts.value;
	    this.appContext.contacts.forEach((conts : Contact[]) =>  {
		 for(let i = 0; i < conts.length; i++){
		     let cont = conts[i];
		     if(cont.phoneNumber.indexOf(phone.codeControl.code + phone.phoneControl) >= 0){
		         contact = cont;
		         break;
		     }
		 }
	    });
	val.push(contact || new Contact({phoneNumber : (phone.codeControl.code + phone.phoneControl)}));
	this.appContext.messageContacts.next(val);
	this.phoneGroup.patchValue({phoneControl :  ''});
    }
}
