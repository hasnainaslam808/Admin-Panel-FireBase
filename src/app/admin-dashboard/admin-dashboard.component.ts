import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../shared/utility.service';
import { Product } from '../shared/model/product';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  title = 'admin-panel';
message:any;
  imgArray: string[] =[]
  loading: boolean = false;

  setproduct: boolean = false;
  setProduct() {
    this.setproduct = !this.setproduct;
  }

  isUpdateMode: boolean = false;
  productList: Product[] = [];
  productObj: Product = {
    id: '',
    prodName: '',
    prodDes: '',
    prodPrice: '',
    prodMaterial: '',
    prodDemension: '',
    prodIncludes: '',
    prodUrl: [],
  };
  id: string = '';
  prodName: string = '';
  prodDes: string = '';
  prodPrice: string = '';
  prodMaterial: string = '';
  prodDemension: string = '';
  prodIncludes: string = '';
  prodUrl:string[] = [];
  constructor(private utility: UtilityService, private firestorage: AngularFireStorage,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.utility.requestPermission();
    this.utility.receiveMessage();
    this.message = this.utility.currentMessage;
    this.getAllProduct();
  }


  // get all students 
  getAllProduct() {
    this.utility.getAllProduct().subscribe(res => {
      this.productList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      this.toastr.error('Error Fetching Dats')
    })
  }



  // delete student


  deleteProduct(product: Product) {
    if (window.confirm('Are you sure want to delete this product' + product.prodName + '?')) {
      this.utility.deleteProduct(product);
    }
  }

  //add student
  addProduct() {
    if (this.prodDemension == '' || this.prodDes == '' || this.prodIncludes == '' || this.prodMaterial == '' || this.prodPrice == '' || this.prodName == '' ) {
      this.toastr.warning('Please enter all fields');
      return;
    }

    if (this.id) {

      this.updateProduct();
    } else {

      this.productObj.id = '';
      this.productObj.prodName = this.prodName;
      this.productObj.prodDes = this.prodDes;
      this.productObj.prodDemension = this.prodDemension;
      this.productObj.prodIncludes = this.prodIncludes;
      this.productObj.prodMaterial = this.prodMaterial;
      this.productObj.prodPrice = this.prodPrice;
      this.productObj.prodUrl = this.imgArray;

      this.utility.addProduct(this.productObj);
    }

    this.resetForm();
  }

  // reset form

  resetForm() {
    this.id = '',
      this.prodName = '',
      this.prodDes = '',
      this.prodDemension = '',
      this.prodIncludes = '',
      this.prodMaterial = '',
      this.prodPrice = '',
      this.imgArray = [],
      this.prodUrl=[],


      this.isUpdateMode = false;
  }




  updateProductForm(product: Product) {

    this.id = product.id;

    this.prodName = product.prodName;
    this.prodDes = product.prodDes;
    this.prodDemension = product.prodDemension;
    this.prodIncludes = product.prodIncludes;
    this.prodMaterial = product.prodMaterial;
    this.prodPrice = product.prodPrice;
    this.prodUrl = product.prodUrl;


    this.isUpdateMode = true;
    this.setproduct = true;
  }
  updateProduct() {
    if (this.id) {
      const updatedProduct: Product = {
        id: this.id,
        prodName: this.prodName,
        prodDes: this.prodDes,
        prodDemension: this.prodDemension,
        prodIncludes: this.prodIncludes,
        prodMaterial: this.prodMaterial,
        prodPrice: this.prodPrice,
        prodUrl: this.imgArray,
      };


      this.utility.updateProduct(updatedProduct);
      this.resetForm();
    }
  }


  async onFileChange(event: any) {
    const file = event.target.files[0];
    this.loading = true;
    if (this.imgArray.length < 4) {
      if (file) {
        const path = `product/${file.name}`;
        const uploadImg = await this.firestorage.upload(path, file);
        const imageUrl = await uploadImg.ref.getDownloadURL();
  
        this.imgArray.push(imageUrl); // Add the new URL to the array
        this.loading = false;
        console.log(this.imgArray);
      }
    } else {
      this.toastr.warning('You can upload a maximum of 4 images.');
      this.loading = false;
    }
  }
}
