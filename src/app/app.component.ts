import { Component } from '@angular/core';
import { Product } from './shared/model/product';
import { UtilityService } from './shared/utility.service';
import{AngularFireStorage}from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-panel';
setproduct:boolean = false;
setProduct(){
this.setproduct=!this.setproduct;
}

  isUpdateMode: boolean = false;
productList: Product[]=[];
productObj:Product={
  id: '',
  prodName:'',
    prodDes:'',
    prodPrice:'',
    prodMaterial:'',
    prodDemension:'',
    prodIncludes:'',
  

};
id:string='';
prodName:string='';
prodDes:string='';
prodPrice:string='';
prodMaterial:string='';
prodDemension:string='';
prodIncludes:string='';
  constructor(private utility:UtilityService,private firestorage:AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllProduct();
  }


// get all students 
  getAllProduct(){
    this.utility.getAllProduct().subscribe(res =>{
      this.productList = res.map((e:any)=>{
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err =>{
      alert('Error Fetching Dats')
    })
  }



  // delete student


  deleteProduct(product:Product){
    if(window.confirm('Are you sure want to delete this product'+product.prodName+'?')){
    this.utility.deleteProduct(product);
    }
  }

  //add student
  addProduct() {
    if (this.prodDemension == '' || this.prodDes == ''  || this.prodIncludes == '' || this.prodMaterial == ''|| this.prodPrice == ''|| this.prodName == '') {
      alert('Please enter all fields');
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

      this.utility.addProduct(this.productObj);
    }
  
    this.resetForm();
  }
  
  // reset form

  resetForm(){
    this.id='',
    this.prodName='',
    this.prodDes='',
    this.prodDemension='',
    this.prodIncludes='',
    this.prodMaterial='',
    this.prodPrice='',
  

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


    this.isUpdateMode = true;
  this.setproduct=true;
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
      };
  

      this.utility.updateProduct(updatedProduct);
      this.resetForm();
    }
  }


  async onFileChange(event:any) {
  const file = event.target.files[0];
  if (file)
{
const path = `product/${file.name}`;
const uploadImg = await this.firestorage.upload(path, file)

}
}
}