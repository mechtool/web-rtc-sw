export class SettingContext{
     public type : number;
     public text : string;
     public icon : string;
     public options : any[];
     public label : string;
     public optionName : string;
     public value : any;
     public radioGroup : any[];
     public listener : Function;
}
export class NotificationContext{
    public color : string;
    public text : string;
    public type : string;
    public disabled : boolean;
    public listener : Function;
    
}
export class User{
    public uid : string;
    public photoURL : string;
    public phoneNumber : string;
    public displayName : string;
    public email : string;
}

export class Contact extends User{
    
    public name : string;
    public imgColor?: string;
    public pushSubscription?: any;
    public statusColor ;
    
    constructor(user) {
        super();
	this.name = user.name || '';
	this.displayName = user.displayName || '';
	this.phoneNumber = user.phoneNumber || '';
	this.photoURL = user.photoURL || '/assets/app-shell/user.svg';
	this.uid = user.uid;
	this.email = user.email || '';
	this.imgColor = user.imgColor || (this.photoURL == '/assets/app-shell/user.svg' ? Contact.getRandomColor() : 'transparent');
	this.pushSubscription = user.pushSubscription || '';
	this.statusColor = user.statusColor || '#8d8d8d' ;
    }
    
    static getRandomColor() {
	return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }
}

