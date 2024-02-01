import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from './model/product';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
// import { MessagingService } from '@angular/fire/compat/messaging';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  currentMessage = new BehaviorSubject<any>(null);

  constructor(private afs: AngularFirestore, private afm: AngularFireMessaging) { 
    this.afm.messages.subscribe((_messaging:any) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    })
  }



  // add student

  addProduct(product: Product) {
    product.id = this.afs.createId();
    return this.afs.collection('/product').add(product);
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





  requestPermission() {

    this.afm.requestToken.subscribe((token) => {
      console.log(token);

    }, (err) => {
      console.log("unable to fetch",err.message);


    })
  }

  receiveMessage() {
    this.afm.messages.subscribe((payload: any)=>{
      console.log("received message", payload);
      this.currentMessage.next(payload)

    })
  }
}


