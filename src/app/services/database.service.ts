import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import {Contact} from "../Classes/MainClasses";
import {AppContextService} from "./app-context.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

    public database = firebase.database();
  constructor(
      public appContext : AppContextService) { }
  
  checkConnection(){
      this.database.ref(".info/connected").on("value", (snap)=> {
	  this.appContext.online.next(snap.val())
      });
  }
    
    getApplicationUsers() : Observable<any> {
      //Получает всех пользователей приложения
	return new Observable((observer)=> {
	    this.database.ref('/users').on('value', (dataSnap)=>{
		observer.next(dataSnap.val());
	    })
	}).pipe(map(data =>{
	    //Фильтрация
	    return Object.values(data);
	}));
    }
  
  async sendSubscription(sub){
      let userRef = await this.database.ref('/users/' + this.appContext.user.value.uid);
      userRef && userRef.update({pushSubscription : sub})
  }
  
  getContacts(){
      if(this.appContext.user.value) return this.database.ref('/contacts' + this.appContext.user.value.uid).once('value') ;
  }
    
    getMessages(){
	if(this.appContext.user.value) return this.database.ref('/messages' + this.appContext.user.value.uid).once('value') ;
	
    }
  
  public checkCreateUser(user) :Promise<Contact | null>{
      //Производит проверку существования внутреннего пользователя базы данныз-
      //т.е. пользователя базы адаптированного под контакт
      return new Promise((res, rej) => {
          let ref = this.database.ref('/users/' + user.uid);
           ref.once('value').then(snap => {
	       let val = snap.val(), us = new Contact(user);
	       if(val) res(val);
	       else ref.set(us).then(r => {
	          res(us);
	       }).catch(err => rej(err)) ;
	   })
      })
      
  }
}
