import { Component, OnInit, } from '@angular/core';
import { ProductMaintenanceService } from '../../../_services/product-maintenance.service';
import { ProductAddNewComponent } from '../product-additional-forms/product-addnew.component';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
import { ProductTypes } from '../product-types';
import { Products } from '../products';
import { ProductMaintenanceModel } from '../../../_models/product-maintenance.model';
import { Router, RouterModule,ActivatedRoute  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})

export class ProductListingComponent implements OnInit {
  selectedProductType: ProductTypes = new ProductTypes('Select');
  productTypes: ProductTypes[] = [];
  productTypeIndicator: string;
  productList: Products[] = [];
  private subscription: Subscription;
  private activeRowIndex: number;
  public navAddButton: boolean=false;
  public navEdit: boolean=false;
  public prodType: string;
  public newBackProdType: string;
  private disableRecord: boolean = true;
  private addittionOfSave: string;
  filterByProductID: string;
  filterByProductName: string;
  filterByRiskRating: number;

  constructor(
    private productService: ProductMaintenanceService,
    private toolBarService: ToolBarService,
    private productModel: ProductMaintenanceModel,
    private route: Router,
    private routerNew: ActivatedRoute
  ) { }
     ngOnInit() {
        this.routerNew
            .params
            .subscribe(params => {
                this.newBackProdType = params['prodType'];
                     console.log(this.newBackProdType);
            });

            this.prodType="UT";

       this.productTypeIndicator = "Product Type Indicator";
       this.getProductType();
        this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
            if (res.module === 'product-maintaince') {
                this.mapActions(res.option);
            }
        });

     }

     getProductType() {
       this.productService.getProductType()
        .subscribe((item) => {
          this.productTypes = item.data['1003'];
       })
     }

     onSelect(changeProductType: string) {
        this.prodType=changeProductType;
        this.productService.getProducts()
       .subscribe((item) => {
         this.productList = item.data;
         this.filterByProductID = '';
         this.filterByProductName = '';
         this.filterByRiskRating = null;
         this.ngAfterViewInit();
       })
     }

  selectedProductRow(prodId: string, prodStatus: string,prodType:string) {
      this.navEdit=true;
      this.prodType=prodType;
      console.log(prodId);
      console.log(prodStatus);
      console.log(this.navEdit);
      this.disableRecord = false;

      this.updateToolBarBehavior();
     // this.route.navigate(['/dashboard/prod-maintenance/product-additional-forms/'+this.prodType+'/'+null+'/'+prodId+'/'+prodStatus+'/'+this.navEdit]);
      this.route.navigate(['/dashboard/prod-maintenance/product-additional-forms/' + prodId + '/' + prodStatus + '/' + this.navEdit ]);
  }
  ngAfterViewInit() {
   // this.setActiveTab(this.prodType);
    this.setActiveTab("product-maintaince");
    //this.clickAddNew();
  }

   updateToolBarBehavior() {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }

  clickAddNew() {
       //this.router.navigate(['/dashboard/checker-maker/global-checker']);
       this.updateToolBarBehavior();
       this.onSelect(this.prodType);
       this.navEdit=false;
       this.addittionOfSave="addittionOfSave"
       //this.route.navigate(['/dashboard/prod-maintenance/product-additional-forms/'+this.prodType+'/'+this.productTypes+'/'+null+'/'+null+'/'+this.navEdit]);
       this.route.navigate(['/dashboard/prod-maintenance/product-additional-forms/' +  '/' + this.prodType + '/0' + '/' + this.navEdit ]);
  }

  mapActions(option: string) {
      switch (option) {
          case 'add':
             //this.AddProduct(this.productModel);
              this.clickAddNew();
              break;
          case 'save':
              //this.saveEditedProduct(this.productModel);
              break;
          case 'delete':
              break;
      }
    }

  setActiveTab(tab: string) {
    this.toolBarService.notfyToolBar({ module: tab });
  }
}
