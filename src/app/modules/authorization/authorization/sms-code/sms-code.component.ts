import { Component, OnInit } from '@angular/core';
import {AuthorizationPageComponent} from "../authorization-page/authorization-page.component";
import {FormControl, Validators} from "@angular/forms";
import { Router} from "@angular/router";

@Component({
  selector: 'app-sms-code',
  templateUrl: './sms-code.component.html',
  styleUrls: ['./sms-code.component.css']
})
export class SmsCodeComponent implements OnInit {
    
    public cursor;
    public activeStage;
    public smsCodeError : boolean | string = 'Sms код направлен на указанный номер.';
    public errors = {"auth/invalid-verification-code" : "Неверный код подтверждения.", "auth/missing-verification-code" : "Отсутствует код подтверждения."};
    public codeSmsControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]);
    constructor(
        public router : Router,
        private authComp : AuthorizationPageComponent) {}
    
    onClickPhoneCodeButton(){
	this.authComp.confirmation.confirm(this.codeSmsControl.value).then(res => {
	     //Код подтверждения верный, произойдет инициализация пользователя приложения "см. app.component this.appContext.user.subscribe()"
	    this.smsCodeError = 'Код подтверждения верный.';
	    
	}).catch(err => {
	    this.smsCodeError = this.errors[err.code] || 'Ошибка кода подтверждения.';
	}).finally(()=> {
	    this.authComp.confirmation = undefined;
	})
    }
    onCancelButton(){
	this.codeSmsControl.valid && this.router.navigateByUrl('/authorization').then();
    
}
    
  ngOnInit() {
  }

}
