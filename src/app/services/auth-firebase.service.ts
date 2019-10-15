import {Injectable, NgZone} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {DatabaseService} from "./database.service";
import {Router} from "@angular/router";
import {AppContextService} from "./app-context.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

    public firebase = firebase;
    public auth = firebase.auth();
  
    constructor(
      public appContext : AppContextService,
      public router :  Router,
      public ngZone : NgZone,
      public database : DatabaseService,
   ) {}
  
    initialize(){
	//Подписка на изменнения статуса идентификации пользователя
	this.auth.onAuthStateChanged(async (user : any)=> {//
	    //Если пользователь приложения существует, то нужно проверить/создать внутреннего пользователя приложения
	    if(user) {
		user = await this.database.checkCreateUser(user);
		//Изменение основного пользователя приложения, на которое подисываются клиенты во всем приложении
		user && this.appContext.user.next(user);
		//Получение всех пользователей приложения
		this.database.getApplicationUsers().subscribe(users => {
		    users && users.length && this.appContext.appUsers.next(users)
		});
		//Получение контактов пользователя
		this.database.getContacts().then(res => {
		    let contacts = res.val();
		    contacts && contacts.length && this.appContext.contacts.next(contacts)
		});
		//Получение всех сообщений пользователя
		this.database.getMessages().then(res => {
		    let messages = res.val();
		    messages && messages.length && this.appContext.messages.next(messages)
		})
	    }
	    //Запуск приложения
	    this.startApplication(user);
	});
    }
    
    startApplication(user){
        //Если пользователь идентифицирован, тогда запустить приложение, иначе открыть страницу авторизации
	this.ngZone.run(()=> this.router.navigateByUrl(user ? '/application' : '/authorization')).catch(err =>console.log(err));
    }
    
    onSingOut(){ //Функция выхода пользователя из системы аутентификации
	this.auth.signOut().then(resp => {
	console.log('Пользователь вышел из приложения.')
	}).catch(err => {
	console.log('Ошибка при выходе пользователя из приложения. Error code :' + err)
	})
  }
  

}
