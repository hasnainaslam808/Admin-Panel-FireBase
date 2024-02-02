import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from './model/product';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import{getMessaging,getToken,onMessage} from'firebase/messaging';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  ngOnInit(): void {
   
  }
 currentMessage = new BehaviorSubject<any>(null);
 message:any = null;
  token={
  tokennid:""
 }
  constructor(private afs: AngularFirestore, private afm: AngularFireMessaging) { 
    this.afm.messages.subscribe((_messaging:any) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }

  requestPermission() {



    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log(currentToken);
           this.token.tokennid = currentToken;
            this.addToken();
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });


  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

  receiveMessage() {
    this.afm.messages.subscribe((payload: any)=>{
      console.log("received message", payload);
      this.currentMessage.next(payload)

    })
  }

  // add student

  addProduct(product: Product) {
    product.id = this.afs.createId();
    return this.afs.collection('/product').add(product);

  }
//add token
  addToken() {
     return this.afs.collection('/token').add(this.token);
  }


  // get all students
  getAllProduct() {
    return this.afs.collection('/product').snapshotChanges();
  }

  // delete student

  deleteProduct(product: Product) {
    return this.afs.doc('/product/' + product.id).delete();
  }

  //update student

  updateProducts(product: Product) {
    this.deleteProduct(product);
    this.addProduct(product);

  }

  updateProduct(product: Product) {
    return this.afs.doc('/product/' + product.id).update(product);
  }






 
  // requestPermission() {
  
  // }
 
}