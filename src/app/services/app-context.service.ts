import {ChangeDetectorRef, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NotificationsComponent} from "../modules/general/notifications/notifications.component";
import {SwPushNotificationService} from "./sw-push-notification.service";
import {Contact} from "../Classes/MainClasses";

@Injectable({
  providedIn: 'root'
})
export class AppContextService {
    //переменная для открытого ключа приложения
    public apiKey;
    //Верификатор рекапчи
    public recaptchaVerifier;
    //Объект подтверждения при аутентификации
    public confirmation : any;
    //аппаратные средства : видеокамера, микрофон, динамики
    public hardware : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    //коллекция контактов сообщения
    public messageContacts : BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
    //Коллекция сообщений, получаемая с сервера при сиарте приложения
    public messages : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    //Коллекция всех пользователей приложения
    public appUsers : BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
    //Коллекция контактов для текущего пользователя
    public contacts : BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
    //Основной класс цветовой схемы приложения
    public appColorClass : BehaviorSubject<string> = new BehaviorSubject(/null|undefined/.test(window.localStorage.getItem('appColorClass')) ? 'second-theme' : window.localStorage.getItem('appColorClass') );
    //Все уведомления приложения
    public announcements  : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    //Детектор изменений компонента приложения
    public appChangeRef : ChangeDetectorRef;
    //Пользователь приложения
    public user : BehaviorSubject< Contact | null> = new BehaviorSubject(null);
    public beforeInstallPromptEvent : BehaviorSubject<any>= new BehaviorSubject(undefined);
    public installScreenButton = new BehaviorSubject(true);
    public notificationComp : NotificationsComponent;
    public swPushService : SwPushNotificationService;
    public online : BehaviorSubject<boolean> = new BehaviorSubject(false);

 constructor() {
      //Получение от браузера все аппаратные средства
      this.getHardware();
  }
  
    getHardware(){
      //Функция получает все устройства ввода/вывода и формирует набор доступных аппаратных средств приложения
      //получаем все устройства ввода/вывода в os
      navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
	  let devices = [];
	  //получаем все устройства/фильтруем повторяющиеся по маркеру
	  deviceInfos.map(dev => {
	      return {kind : dev.kind, label : dev.label.substring(dev.label.indexOf('-') + 1).trim()}
	  }).filter(dev => {devices.some(d => {
		   return d.label.indexOf(dev.label) >= 0;
	       }) || devices.push(dev);
	  }) ;
	  this.hardware.next(devices);
    }).catch(err => {});
    }
}
