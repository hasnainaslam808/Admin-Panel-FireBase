import { Injectable } from '@angular/core';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { Product } from './model/product';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {


  constructor(private afs:AngularFirestore) { }



  // add student

  addProduct(product:Product){
    product.id = this.afs.createId();
    return this.afs.collection('/product').add(product);
  }


  // get all students
  getAllProduct(){
    return this.afs.collection('/product').snapshotChanges();
  }

  // delete student

  deleteProduct(product:Product){
  return this.afs.doc('/product/'+product.id).delete();
  }

  //update student

  updateProducts(product:Product){
this.deleteProduct(product);
this.addProduct(product);

  }

  updateProduct(product: Product) {
    return this.afs.doc('/product/' + product.id).update(product);
  }
  
}
