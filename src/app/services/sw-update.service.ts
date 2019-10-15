import { Injectable } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class SwUpdateService {
    
    public update;
    constructor(private swUpdate: SwUpdate) {}
    //Инициализация
    initialize(){
        this.update = window.localStorage.getItem('update');
	//Подписка на событие доступности новой версии (производит проверку новой версии при запуске приложения)
	this.update !== '2' && this.swUpdate.available.subscribe(event => {
	    console.log('Новая версия приложения доступна на сервере!');
	    if(this.update === '1') this.promptUser();
	    else if(this.update === '0') this.swUpdate.activateUpdate().then(() => document.location.reload());
	});
    
    }
    
    //Принудительная проверка новой версии на сервере
    public checkForUpdate(){
	this.swUpdate.checkForUpdate().then(res => {
	debugger;
	})
    }
    
    //
    private promptUser(): void {
	console.log('Запуск обновления на новую версию.');
	//Запустить оповещение пользьзователя для подсказки обновления
	
	//Активизация обновления и перезагрузка документа (можно поместить кнопку
	// в интерфейсе и обновлять тогда, когда пользователю это нужно)
	this.swUpdate.activateUpdate().then(() => document.location.reload());
}
}
