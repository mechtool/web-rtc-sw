import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AppContextService} from "../../../services/app-context.service";
import {Contact} from "../../../Classes/MainClasses";
import {SwUpdateService} from "../../../services/sw-update.service";
import {SettingsDefaultService} from "../../../services/settings-default.service";
import {ActivatedRoute} from "@angular/router";
import {DatabaseService} from "../../../services/database.service";
import {PermissionsService} from "../../../services/permissions.service";
import {StatusColorsService} from "../../../services/status-colors.service";
import {ColorThemeService} from "../../../services/color-theme.service";
import {routerTransition, sideNavListTrigger} from "../../../animations/animations";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
    animations : [sideNavListTrigger, routerTransition] ,
    changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ApplicationComponent implements OnDestroy {
    
    public interface;
    public iconColor;
    public subscribes = [];
    public appUser  = {contact : new Contact({name : 'Unknown'}), options : {menu : 0}};
    public buttons = [
	{text : 'Сообщения', icon : 'layers', tip : 'Сообщения', link : '/application/messages'},
	{text : 'Контакты', icon : 'people', tip : 'Контакты', link : '/application/contacts'}
	];
    public rightButtons = [
	{text : 'Оповещения', icon : 'notifications', tip : 'Оповещения', link : '/application/announcements', badge : this.appContext.announcements.value.length},
	{text : 'Настройки', icon : 'settings', tip : 'Настройки', link : '/application/settings'}
    ];
    @ViewChild('outletContainer', {read : ElementRef, static : true}) public outletContainer : ElementRef ;
    
    constructor(
	public swUpdateService : SwUpdateService,
	public settingsDefaultService : SettingsDefaultService,
	public route: ActivatedRoute,
	public database : DatabaseService,
	public permissionsService : PermissionsService ,
	public appContext : AppContextService,
	public statusColorsService : StatusColorsService,
	public colorThemeService : ColorThemeService,
	public changeRef : ChangeDetectorRef,
    ) {}
    
    ngOnInit() {
	this.subscribes.push(this.appContext.appColorClass.subscribe(colorTheme => {
	    if(!/null|undefined/.test(colorTheme)) {
		this.iconColor = this.colorThemeService.colorItems.filter(item => item.colorClass === colorTheme)[0].color;
	    }
	}) );
	//Получение данных через сервис Default-Resolver
	this.subscribes.push(this.route.data.subscribe(data => { //*
	    //todo Реализовать получение настроек пользователя с сервера, удалив везде сохранения настроек в LocalStorage
	    //Получение открытого ключа
	    this.appContext.apiKey = data.apiKey;
	    //Инициализация сервиса обновления приложения, необходимо запускать только тогда, когда
	    // открытый ключ уже приехал с сервера
	    this.swUpdateService.initialize(); //*
	    //Инициализация приложения только после получения серверного открытого ключа
	    this.initializeApp() ; //*
	}));
    }
    
    initializeApp(){
        //Подписка на получение уведомлений приложения и вывода их в бейдж
	//на интерфейсе приложения
	this.subscribes.push(this.appContext.announcements.subscribe(announs => {
	    this.rightButtons[0].badge = announs.filter(ann => {
	        //Если уведомление активно
	        return ann.active;
	     }).length;
	    this.changeRef.detectChanges();
	}) );
	
	setTimeout(()=> {
	     this.appContext.announcements.next([
		 {date : Date.now(), content : '<span style="color: red">Внимание!</span><span>Очень длинная строка для предстваления о длинной строке в приложении</span>', active : true}, 	   		{date : Date.now(), content : '1', active : true},
		 {date : Date.now(), content : '<span style="color: red">Внимание!</span>', active : true}, 	   		{date : Date.now(), content : '1', active : true},
		 {date : Date.now(), content : '<span style="color: red">Внимание!</span>', active : true}, 	   		{date : Date.now(), content : '1', active : true},
		 {date : Date.now(), content : '<span style="color: red">Внимание!</span>', active : true}, 	   		{date : Date.now(), content : '1', active : true},
		 {date : Date.now(), content : '<span style="color: red">Внимание!</span>', active : true}, 	   		{date : Date.now(), content : '1', active : true},
	         
	         ])
		 
	}, 10000) ;
	
	
	//Подписка на получение пользователя
	this.subscribes.push(this.appContext.user.subscribe(sub => {
	    if(sub) {
		this.appUser.contact = sub;
		this.changeRef.markForCheck();
		this.subscribes.push(this.appContext.online.subscribe(online => {
		    this.appUser.contact.statusColor = (online ? this.statusColorsService.statusColors.webrtc.perConnectionStates.connected : this.statusColorsService.statusColors.webrtc.perConnectionStates.disconnected);
		    this.changeRef.markForCheck();
		}));
	    }
	})) ;
	//Запуск сервиса установки настроек по-умолчанию
	this.settingsDefaultService.initialize();
	//Отслеживание состояния сети
	this.database.checkConnection();
	//Запуск проверок разрешение использования различных api
	this.permissionsService.checkPermissions();
    }
    
    
    
    getState(outlet){
	return outlet.activatedRouteData.type;
    }
    
    ngOnDestroy(){
	this.subscribes.forEach(sub => sub.unsubscribe()) ;
    }
}
