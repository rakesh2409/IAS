import { UTProductMaintenanceModel } from './utproduct-maintenance.model';
import { InsuranceProductMaintenanceModel} from './insuranceproduct-maintenance';
import { ProductFinancialModel } from './product-financial-object';
import { SDProductMaintenanceModel } from './sdproduct-maintenance';
import { SPProductMaintenanceModel} from './spproduct-maintenance';
import { DCIProductMaintenanceModel } from './dciproduct-maintenance';
import { ProductProhibitedCountryModel } from './product-prohibited-country';
import { BondsProductMaintenanceModel } from './bondsproduct-maintenance';


export class ProductMaintenanceModel {     
    
     aiProductInd: boolean=false;

     benFeature: string='benFeature';

      minEntryAge: number=5;

      maxEntryAge: number=9;

     changeSourceInd: boolean=false;

     createDtm: string='2017-02-06';

     creationDt: string='2017-02-06';

     createdBy: number=2;

     tradeCurrency: string='USD';

     factsheetUrl: string='factURL';

     houseViewInd: boolean=false;

     lastUpDateDtm: string='2017-02-06';

     lastUpDatedBy: string='0101010';

     limitationsRisks: string='limitRisk';

     parentProductDetId: number=null;

     premiumType: string='R';

     productHighlightUrl: string='url';

     sevenDayCancInd: boolean=false;    

     productId: string='productId';

     productName: string='productname';

     productLastUpdateDt: string='2017-02-06';

     productProvider: string='ric';

     productStatus: boolean=false;

     productTypeCd: number=null;

     premiumTypeCd: number=null;

     premTypeDesc: string='premDesc';

     prodStatusDesc: string='prodStatusDesc';

     productTypeDesc: string='typeDesc';

     prodCategories: string='Global Bond';

     prodSegmentCd: number=null;
     
     prodRetailInd: boolean=true;
     
     prodRetailDesc: boolean=false;
     
     prodPremierInd: boolean=false;
     
     prodPremierDesc: boolean=false;
     
     prodPrivateInd: boolean=false;
     
     prodPrivateDesc: boolean=false;        

     batchRecordType: number=null;
    
     productType: string=null;

     prospectusUrl: string='prospectURl'; 

     riskRating: number=5;

     tenure: number=4;

     version: number=null;

     workflowStatus: string=null;

     //productPkId: string=null;
     
     utProduct: UTProductMaintenanceModel;
     
     insProduct: InsuranceProductMaintenanceModel;
     
     sdProduct: SDProductMaintenanceModel;   
     
     spProduct: SPProductMaintenanceModel;
     
     dciProduct: DCIProductMaintenanceModel;

     bondProduct: BondsProductMaintenanceModel;

     prodFinObjDTO: ProductFinancialModel;

     prohibitedCountries:Array<any>;  
     
     productPkId: number = null;

     disableRecord: boolean = false;
     
     hideApprove: boolean = true;
    
}