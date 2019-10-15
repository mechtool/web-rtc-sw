//Сервис установки настроек по-умолчанию
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsDefaultService {

  constructor() { }
  
  initialize(){
      //Установка некоторых настроек по - умолчанию
      //Установка настройки использования библиотеки оповещений
    let appColorClass =  window.localStorage.getItem('appColorClass'),
    	callModel = window.localStorage.getItem('callModel'),
	update = window.localStorage.getItem('callModel');
    window.localStorage.setItem('appColorClass', (/undefined|null/.test(appColorClass) ? 'second-theme' : appColorClass));
      window.localStorage.setItem('callModel',  (/undefined|null/.test(callModel)  ? '0' : callModel));
      window.localStorage.setItem('update',  (/undefined|null/.test(update)  ? '0' : update));
  }
}
