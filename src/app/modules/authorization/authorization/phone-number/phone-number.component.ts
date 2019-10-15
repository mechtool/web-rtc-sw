import {Component, NgZone} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthFirebaseService} from "../../../../services/auth-firebase.service";
import {Router} from "@angular/router";
import {AuthorizationPageComponent} from "../authorization-page/authorization-page.component";

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent  {
    
    public phoneBlockClass = true;
    public phoneCodeError : boolean | string = false;
    public phoneButtonText = 'Проверить номер';
    public cursor = 'pointer';
    public activeStage = false;
    public errors = {"auth/captcha-check-failed":"Проверка рекапчи отрицательна." , "auth/invalid-phone-number" : "Некорректный номер телефона.", "auth/missing-phone-number" : "Отсутствует номер телефона.", "auth/quota-exceeded" : "Превышена квота.", "auth/user-disabled" : "Пользователь неактивен.", "auth/operation-not-allowed" : "Опрерация не разрешена."};
    
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
    
    constructor(
        public authFirebase : AuthFirebaseService,
	public authComp : AuthorizationPageComponent,
	private router : Router,
	private ngZone : NgZone) {
        
        this.phoneGroup.statusChanges.subscribe(res => {
	    if(this.phoneGroup.status === 'VALID') {
		this.authComp.recaptchaVerifier = this.authComp.recaptchaVerifier || new this.authFirebase.firebase.auth.RecaptchaVerifier('phone-ready', {
		    'size': 'invisible',
		    'callback': this.onClickPhoneButton,
		    'expired-callback': function (err) {
		        console.log('Timeout : ')
		    }
		}) ;
		this.authComp.recaptchaVerifier.render()
		    .then(res => {
		        console.log('***');
		    })
		    .catch(err=> {
		        console.error(err);
		        this.phoneCodeError = this.errors[err.code] || 'Ошибка работы рекапчи.'
		    });
	    }})
	}
    onClickPhoneButton(){
	this.phoneGroup.valid && this.authFirebase.auth.signInWithPhoneNumber(this.phoneGroup.get('codeControl').value.code + this.phoneGroup.get('phoneControl').value, this.authComp.recaptchaVerifier).then((confirmation) => {
	    //Sms отправлено. Выдать оповещение пользователю о необходимости
	    // ввести код из полученного сообщения в форму проверки sms кода
	    // confirmationResult.confirm(code).
	    this.authComp.confirmation = confirmation;
	    this.ngZone.run(() => {this.router.navigateByUrl('/authorization/sms-code').then(res => {
	        this.authComp.recaptchaVerifier.clear();
	    }).catch(err => console.error(err))});
	}).catch(function (err) {
	    console.error(err);
	    this.phoneCodeError = this.errors[err.code] || 'Ошибка входа в приложение.' ;
	    //sms не отправлено
	})

    }
    
    onCancelButton(){
        //Переход на страницу выбора провайдера
	this.router.navigateByUrl('/authorization').then();
    }

}
