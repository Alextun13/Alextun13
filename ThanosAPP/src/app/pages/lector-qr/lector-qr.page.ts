import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import  jsQR from 'jsQR';
import { Router } from '@angular/router';




@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.page.html',
  styleUrls: ['./lector-qr.page.scss'],
})
export class LectorQrPage implements OnInit {
  
  @ViewChild('video',{static:false})video!:ElementRef<HTMLVideoElement>;
  @ViewChild('canvas',{static:false})canvas!:ElementRef<HTMLVideoElement>;
  videoElement:any;
  canvasElement:any;
  canvasContext:any;
  escaneado=false;
  escaneando:boolean=false;
  videoStream:MediaStream| null=null;
  loading:HTMLIonLoadingElement | null = null;
  scanActive=false;
  qrResult:string='';


  constructor(public toastCtrl:ToastController,    private router: Router, private navCtrl: NavController, private loadingCtrl:LoadingController) { 
    this.qrResult='';
  }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
  }

  async IniciarScaner () {
    
    if(!this.escaneado){
      this.videoStream=await navigator.mediaDevices.getUserMedia({
        video:{
          facingMode:'environment'
        }
      });
    
      this.videoElement.srcObject=this.videoStream;
      this.videoElement.setAttribute('playsinline',true);
      this.videoElement.play();
      this.scanActive = true;
      this.loading = await this.loadingCtrl.create({})
      await this.loading.present()

      requestAnimationFrame(this.scan.bind(this));
    }
  };
  
//aquí vay culiao

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }

    this.canvasElement.height = this.videoElement.videoHeight;
    this.canvasElement.width = this.videoElement.videoWidth;

    this.canvasContext.drawImage(
      this.videoElement,
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });


    if (code && this.scanActive) {
      this.scanActive = false;
      this.qrResult = code.data;
      const datosEscaneados = this.qrResult.split(',');
      let registroJson=JSON.stringify(datosEscaneados)
      this.showQrToast(this.qrResult);
      localStorage.setItem('nuevaclase',registroJson)

      //this.storage.setvalue('Datos Qr', datosEscaneados);
      this.navCtrl.navigateForward('/asistencia');
    } else {
      if (this.scanActive) {
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  }

  async showQrToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: 'Se ha escaneado correctamente el código QR',
      position: 'top',
      duration: 15000,
      buttons: [
        {
          text: 'Ver detalles',
          handler: () => {
            const qrData = this.qrResult;

          }
        }
      ]
    });
    await toast.present();
  }

  stopScan(){
    this.scanActive=false;
  }

}
