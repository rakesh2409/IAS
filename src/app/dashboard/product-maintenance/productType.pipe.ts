import { Pipe, PipeTransform } from '@angular/core';

//pipe filter for productId
@Pipe({
    name: 'productType',
    pure: false
})
export class ProductTypePipe implements PipeTransform {
  transform(items: Array<any>, productTypeDesc:string, args:any): Array<any> {
      if(!args) {
        return items.filter(item => item.productTypeDesc == productTypeDesc);
      } else {
        return items.filter(item => item.productId == args);
      }
  }
}

//pipe filter for productName
@Pipe({
    name: 'productName',
    pure: false
})
export class ProductNamePipe implements PipeTransform {
  transform(items: Array<any>, productTypeDesc:string, args:any): Array<any> {
      if(!args) {
        return items.filter(item => item.productTypeDesc == productTypeDesc);
      } else {
        return items.filter(item => item.productName == args);
      }
  }
}

//pipe filter for riskRating
@Pipe({
    name: 'riskRating',
    pure: false
})
export class RiskRatingPipe implements PipeTransform {
  transform(items: Array<any>, productTypeDesc:string, args:any): Array<any> {
      if(!args) {
        return items.filter(item => item.productTypeDesc == productTypeDesc);
      } else {
        return items.filter(item => item.riskRating == args);
      }
  }
}
