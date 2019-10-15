import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../../../Classes/MainClasses";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

    @Input() public context :  {contact : Contact, options : any};
    @Output() public onDelete : EventEmitter<any> = new EventEmitter<any>() ;
    constructor() { }

  ngOnInit() {
  }
  onDeleteItem(){
        this.onDelete.emit(this.context)
    }



}
