import {ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AppContextService} from "../../../../services/app-context.service";
import {ColorThemeService} from "../../../../services/color-theme.service";

@Component({
  selector: 'app-video-message',
  templateUrl: './video-message.component.html',
  styleUrls: ['./video-message.component.css']
})
export class VideoMessageComponent implements OnDestroy {

    public localStream;
    
    @ViewChild('selfVideo', {read: ElementRef, static: false}) public selfVideo: ElementRef;
    
    constructor(
        public appContext: AppContextService,
	public changeRef : ChangeDetectorRef,
	public colorThemeService : ColorThemeService,
    ) {
	this.startLocalStream();
    }
    
    ngOnDestroy(){
          this.localStream.getTracks().forEach(tr => tr.stop());
    }
    
    async startLocalStream(){
/*	const hardware = this.appContext.hardware.value,
	    constraints = {
		audio: {deviceId: hardware.audioInputSelected.deviceInfo.deviceId ? {exact: hardware.audioInputSelected.deviceInfo.deviceId } : undefined},
		video: {deviceId: hardware.videoInputSelected.deviceInfo.deviceId  ? {exact: hardware.videoInputSelected.deviceInfo.deviceId } : undefined}
	    };*/
	try{
	    this.localStream = await navigator.mediaDevices.getUserMedia({audio : true, video : true});
	    this.selfVideo.nativeElement.srcObject = this.localStream;
	    this.changeRef.checkNoChanges();
	}catch(e) {
	
	}
    }
}
