import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding} from '@angular/core';
import * as firebase from 'firebase/app';
import {environment} from "../environments/environment";
import {AuthFirebaseService} from "./services/auth-firebase.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ColorThemeService} from "./services/color-theme.service";
import {routerTransition, sideNavListTrigger} from "./animations/animations";
import {AppContextService} from "./services/app-context.service";

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
//Регистрация русской локали
registerLocaleData(localeRu, 'ru');

firebase.initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-root',
    templateUrl : './app.component.html',
    styleUrls : ['./app.component.css'],
    animations : [sideNavListTrigger, routerTransition] ,
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    
    @HostBinding('class') public appColorClass ;
    
    constructor(
	public authFirebaseService : AuthFirebaseService,
	public iconRegistry : MatIconRegistry,
	public sanitizer : DomSanitizer,
	public changeRef : ChangeDetectorRef,
	public appContext : AppContextService,
    ){
        this.appContext.appChangeRef = this.changeRef;
        //Здесь пользователь еще не определен
	//Запуск сервисов, относящихся ко всему приложению
	this.authFirebaseService.initialize();  //*
	//Подписка на получения изменений цветовой темы приложения
	this.appContext.appColorClass.subscribe(colorTheme => {
	    this.appColorClass = colorTheme;
	    this.changeRef.markForCheck();
	}) ;
	//регистрация иконки в реестре иконок
	[
	    {name : 'mail', link : '/assets/social/mail.svg'},
	    {name : 'phone', link : '/assets/social/phone.svg'},
	    {name : 'settings', link: '/assets/app-shell/settings-outline.svg'},
	    {name : 'notifications', link: '/assets/app-shell/notifications-24px.svg'},
	    {name : 'person_add', link: '/assets/app-shell/account-plus-outline.svg'},
	    {name : 'person_off', link: '/assets/app-shell/account-off-outline.svg'},
	].forEach(item => {
	    this.iconRegistry.addSvgIcon(item.name, this.sanitizer.bypassSecurityTrustResourceUrl(item.link));
	}) ;
    }
    getState(outlet){
	return outlet.activatedRouteData.type;
    }
    
}
