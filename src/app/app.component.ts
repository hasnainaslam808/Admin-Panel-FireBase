import { Component } from '@angular/core';
import { Product } from './shared/model/product';
import { UtilityService } from './shared/utility.service';

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
    prodOrigin:'',
    prodMaterial:'',
    prodDemension:'',
    prodFinish:'',
    prodIncludes:'',
};
id:string='';
prodName:string='';
prodDes:string='';
prodPrice:string='';
prodOrigin:string='';
prodMaterial:string='';
prodDemension:string='';
prodFinish:string='';
prodIncludes:string='';
  constructor(private utility:UtilityService) { }

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
    if (this.prodDemension == '' || this.prodDes == '' || this.prodFinish == '' || this.prodIncludes == '' || this.prodMaterial == ''|| this.prodOrigin == ''|| this.prodPrice == ''|| this.prodName == '') {
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
      this.productObj.prodFinish = this.prodFinish;
      this.productObj.prodIncludes = this.prodIncludes;
      this.productObj.prodMaterial = this.prodMaterial;
      this.productObj.prodOrigin = this.prodOrigin;
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
    this.prodFinish='',
    this.prodIncludes='',
    this.prodMaterial='',
    this.prodOrigin='',
    this.prodPrice='',
  

    this.isUpdateMode = false;
  }




  updateProductForm(product: Product) {
 
    this.id = product.id;
    
   this.prodName = product.prodName;
      this.prodDes = product.prodDes;
      this.prodDemension = product.prodDemension;
      this.prodFinish = product.prodFinish;
      this.prodIncludes = product.prodIncludes;
      this.prodMaterial = product.prodMaterial;
      this.prodOrigin = product.prodOrigin;
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
        prodFinish: this.prodFinish,
        prodIncludes: this.prodIncludes,
        prodMaterial: this.prodMaterial,
        prodOrigin: this.prodOrigin,
        prodPrice: this.prodPrice,
      };
  

      this.utility.updateProduct(updatedProduct);
      this.resetForm();
    }
  }
  
}
