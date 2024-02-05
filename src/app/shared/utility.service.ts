import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from './model/product';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import{getToken,onMessage} from'firebase/messaging';
import { environment } from 'src/environments/environment';
import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";


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
    // this.afm.messages.subscribe((_messaging:any) => {
    //   _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //   _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    // })
  }

  requestPermission() {



    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log(currentToken);
          //  this.token.tokennid = currentToken;
            // this.addToken();
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });


  }

  // listen() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     this.currentMessage.next(payload);
  //   });
  // }

  // receiveMessage() {
  //   this.afm.messages.subscribe((payload: any)=>{
  //     console.log("received message", payload);
  //     this.currentMessage.next(payload)

  //   })
  // }

  // add student

  addProduct(product: Product) {
    product.id = this.afs.createId();
    return this.afs.collection('/product').add(product);

  }
//add token
  // addToken() {
  //    return this.afs.collection('/token').add(this.token);
  // }
  // sendNotificationToAllUsers() {
  //   // Retrieve all user FCM tokens from your database
  //   const allUserTokens = ['USER1_FCM_TOKEN', 'USER2_FCM_TOKEN', /* ... */];
  
  //   // Create a notification message
  //   const message = {
  //     notification: {
  //       title: 'New Product',
  //       body: 'Check out the latest product in our store!'
  //     },
  //     tokens: ["eN-s0bjb1Z9nx_RDru0Ou3:APA91bGL9NCGH6ONcavEHKaPwVL-OEpMs6B7FH_RWdHawFL00wWDn_Nhq-y_1zf06v2gX1yfFKBH69DIBbcCCXGr18y6IyYayDroyxubfCIJTCT1qn1zr9x6aXTWETjEWRSLjGJdgHl1"]
  //   };
  // }

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