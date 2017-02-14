import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductMaintenanceComponent } from '../product-maintenance.component';
import { UserAccessService } from '../../../_services/user-access.service';
import { UTProductMainteanceService } from '../../../_services/utproduct-maintaince.service';
import { UTProductMaintenanceModel } from '../../../_models/utproduct-maintenance.model';
import { InsuranceProductMaintenanceModel } from '../../../_models/insuranceproduct-maintenance';
import { SDProductMaintenanceModel } from '../../../_models/sdproduct-maintenance';
import { DCIProductMaintenanceModel } from '../../../_models/dciproduct-maintenance';
import { SPProductMaintenanceModel } from '../../../_models/spproduct-maintenance';
import { BondsProductMaintenanceModel } from '../../../_models/bondsproduct-maintenance';
import { ProductMainteanceService } from '../../../_services/product-maintaince.service';
import { ToolBarService } from '../../../_services/toolbar-actions.service';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { ProductMaintenanceModel } from '../../../_models/product-maintenance.model';
import { ProductProhibitedCountryModel } from '../../../_models/product-prohibited-country';
import { ProductFinancialModel } from '../../../_models/product-financial-object';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';


@Component({
    selector: 'app-addNew-maintenance',
    templateUrl: './product-addnew.component.html',
    styleUrls: ['./product-addnew.component.css'],
    providers: [FormBuilder]
})

export class ProductAddNewComponent implements OnInit, AfterViewInit {
    private subscription: Subscription;
    private newProductType: string;
    public productTypeArray: Array<any>;
    private premiumType: string;
    private premiumTypeArray: Array<any>;
    private productStatusArray: Array<any>;
    private insuranceType: string;
    private insuranceTypeArray: Array<any>;
    private insuranceCategory: string;
    private insuranceCategoryTypeArray: Array<any>;
    private fundType: string;
    private fundTypeTypeArray: Array<any>;
    private fundCategory: string;
    private assetClass: string;
    private fundCategoryTypeArray: Array<any>;
    private mpAssetClassTypeArray: Array<any>;
    private riskRating: string;
    private riskRatingTypeArray: Array<any>;
    private insuranceGIO: string;
    private insuranceGIOTypeArray: Array<any>;
    @Input()
    private country: string;
    private defaultCountry: string;
    private countryTypeArray: Array<any>;
    private sector: string;
    private sectorTypeArray: Array<any>;
    private capitalExposure: string;
    private capitalExposureTypeArray: Array<any>;
    private dividend: string;
    private dividendTypeArray: Array<any>;
    private defaultCountryList: Array<any>;
    @Input()
    private countryTypeUIArray: Array<any>;
    utNewForm: FormGroup;
    private error: string;
    private successMsg: string;
    private infoMsg: string;
    private globalDisableField: string = 'false';
    private statusDisableOrEnableFlg: string = 'false';
    private disableRecord: boolean = false;
    private hideApproveReject: boolean = true;
    private productId: string;
    private productStatus: string;
    private EditDisable: string = 'false';
    private ctr = 0;
    @ViewChild('submitButton') submitButton: ElementRef;
    @Input() productList: ProductMaintenanceModel[];

    constructor(private userAccessService: UserAccessService,
        private productModel: ProductMaintenanceModel,
        private utProductService: UTProductMainteanceService,
        private productService: ProductMainteanceService,
        private toolBarService: ToolBarService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private productMaintenance: ProductMaintenanceComponent, fb: FormBuilder) {
    }
    ngOnInit() {
        this.route
            .params
            .subscribe(params => {
                this.productId = params['id'];
                this.productStatus = params['stat'];
                this.EditDisable = params['edit'];

                this.productModel.utProduct = new UTProductMaintenanceModel();
                this.productModel.insProduct = new InsuranceProductMaintenanceModel();
                this.productModel.sdProduct = new SDProductMaintenanceModel();
                this.productModel.spProduct = new SPProductMaintenanceModel();
                this.productModel.dciProduct = new DCIProductMaintenanceModel();
                this.productModel.bondProduct = new BondsProductMaintenanceModel();
                this.productModel.prodFinObjDTO = new ProductFinancialModel();
                this.productModel.prohibitedCountries = [];


                //0 = edit; else new
                if (this.productStatus !== '0') {
                    console.log(JSON.stringify(this.newProductType));
                    console.log(" **********ProductType*********" + this.newProductType);
                    this.getProductTypesList();
                    this.getAllDropdownValues();
                    this.getProductTypeByProductPkId(this.productId);

                } else {
                    this.newProductType = this.productId;
                    this.productModel.parentProductDetId = null;
                    this.getProductTypesList();
                    this.getAllDropdownValues();
                    this.hideApproveReject = true;
                    this.setActiveTab(this.newProductType);
                }
                console.log(this.productId + '-' + this.productStatus + '-' + this.globalDisableField + '-' + this.EditDisable + '-' + this.hideApproveReject);
            });


        this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
            if (res.module === 'product-maintaince' || res.module === 'UT' || res.module === 'INS'
                || res.module === 'SD' || res.module === 'Bonds' || res.module === 'SP' || res.module === 'Equit-Linked Notes' || res.module === 'DCI') {
                this.mapActions(res.option);
            }
        });
    }

    disableOrEnableFields(): boolean {
        if (this.EditDisable === 'false' && this.globalDisableField === 'false') {
            return false;
        } else if (this.globalDisableField === 'true') {
            return true;
        } else if (this.EditDisable === 'true' || this.globalDisableField === 'false') {
            return true;
        }
    }

    setProductEnumRefCodes() {

        this.productModel.productType = this.newProductType;
        this.productModel.productTypeCd = 1003;
        this.productModel.premiumTypeCd = 1005;
        this.productModel.prodSegmentCd = 1019;
        this.productModel.workflowStatus = "SUBMITTED";

        if (this.newProductType === 'UT') {
            this.productModel.utProduct.divTypeCd = 1004;
            this.productModel.utProduct.fundTypeCdL = 1008;
            this.productModel.utProduct.utFundCategoryCd = 1026;
            this.productModel.utProduct.capExposureCd = 1023;
            this.productModel.utProduct.sectorCd = 1022;
            this.productModel.utProduct.investmentTypeCd = 1024;
            this.productModel.utProduct.mpAssetClassCd = 1009;

            console.log('setProductEnumRefCodes.prodModel => ' + JSON.stringify(this.productModel));
        } else if (this.newProductType === 'INS') {
            this.productModel.insProduct.insTypeCd = 1010;
            this.productModel.insProduct.premiumTypeCd = 1005;
            this.productModel.insProduct.gioIndCd = 1011;
            this.productModel.insProduct.insCategoryCd = "1020";
        }
        else if (this.newProductType === 'SD') {
            this.productModel.prodFinObjDTO = new ProductFinancialModel();
        }
        else if (this.newProductType === 'DCI') {
            this.productModel.prodFinObjDTO = new ProductFinancialModel();
        }
        else if (this.newProductType === 'SP') {
            this.productModel.prodFinObjDTO = new ProductFinancialModel();
        } else if (this.newProductType === 'Bonds') {
            this.productModel.prodFinObjDTO = new ProductFinancialModel();
        }

    }

    clearFields() {

        this.productModel = new ProductMaintenanceModel();
        this.productModel.utProduct = new UTProductMaintenanceModel();
        this.productModel.insProduct = new InsuranceProductMaintenanceModel();
        this.productModel.sdProduct = new SDProductMaintenanceModel();
        this.productModel.spProduct = new SPProductMaintenanceModel();
        this.productModel.dciProduct = new DCIProductMaintenanceModel();
        this.productModel.bondProduct = new BondsProductMaintenanceModel();
        this.productModel.prodFinObjDTO = new ProductFinancialModel();
        this.productModel.prohibitedCountries = [];
        // this.disableField = false;
    }

    getProductTypeByProductPkId(productId) {
        this.productService.getProductTypeByProductPkId(productId).subscribe(
            result => {
                //this.updateMessages(null, null, "Product Type is : " + result.data );
                console.log("******productType*******" + result.data);
                this.newProductType = result.data;
                this.getAllProductData(this.productId, this.productStatus);
                //for Approval case should disable the all fields
                // if (this.EditDisable === 'true') {
                //    // this.EditDisable === 'false';
                //    this.globalDisableField = 'false';
                // }else{
                //     this.globalDisableField = 'true';
                // }
                if (this.globalDisableField === 'true') {
                    this.EditDisable = 'true';
                }else if(this.EditDisable === 'true'){
                      this.EditDisable = 'true';
                }               
                 console.log("globalDisableField===> "+this.globalDisableField);
                 console.log("EditDisable===> "+this.EditDisable);

            }, err => {
                this.updateMessages(null, 'Failed to process the request.', null);
            }
        );
    }
    getAllProductData(productId: string, status: string) {

        switch (this.newProductType) {
            case 'UT':
                this.productService.getUTProductData(productId, status).subscribe(
                    result => {
                        console.log('UT result =>' + JSON.stringify(result));
                        this.productModel = result.data;
                        this.globalDisableField = result.disableRecord + '';
                        this.hideApproveReject = result.hideApprove;
                        console.log('EDIT? => ' + this.globalDisableField + ', HIDEBUTTONS? => ' + this.hideApproveReject);
                        this.newProductType = this.productModel.productType;
                        this.productModel.utProduct = result.data.utProduct;
                        this.productModel.prodFinObjDTO = result.data.prodFinObjDTO;
                        this.productModel.prohibitedCountries = result.data.prohibitedCountries;
                        this.productModel.parentProductDetId = Number(this.productId);
                        this.productModel.productPkId = null;
                        this.formatDates();
                        this.setActiveTab(this.newProductType);
                    }, err => {
                        console.log(err);
                    }
                );
            case 'INS': {
                this.productService.getInsuranceProductData(productId, status).subscribe(
                    result => {
                        console.log('INS result =>' + JSON.stringify(result));
                        if (result.data !== null) {
                            this.productModel = result.data;
                            this.globalDisableField = result.disableRecord + '';
                            this.hideApproveReject = result.hideApprove;
                            console.log('EDIT? => ' + this.globalDisableField + ', HIDEBUTTONS? => ' + this.hideApproveReject);
                            this.newProductType = this.productModel.productType;
                            this.productModel.prodFinObjDTO = result.data.prodFinObjDTO;
                            this.productModel.prohibitedCountries = result.data.prohibitedCountries;
                            this.productModel.parentProductDetId = Number(this.productId);
                            this.productModel.productPkId = null;
                            this.formatDates();
                            this.setActiveTab(this.newProductType);
                        } else {
                            this.updateMessages(null, result.txnMessage, null);
                        }
                    }, err => {
                        console.log(err);
                    }
                );
            } case 'SD': {
                this.productService.getSDProductData(productId, status).subscribe(
                    result => {
                        console.log('SD result =>' + JSON.stringify(result));
                        this.productModel = result.data;
                        this.globalDisableField = result.disableRecord + '';
                        this.hideApproveReject = result.hideApprove;
                        console.log('EDIT? => ' + this.globalDisableField + ', HIDEBUTTONS? => ' + this.hideApproveReject);
                        this.newProductType = this.productModel.productType;

                        this.productModel.sdProduct = result.data.sdProduct;
                        this.productModel.prodFinObjDTO = result.data.prodFinObjDTO;
                        this.productModel.prohibitedCountries = result.data.prohibitedCountries;
                        this.productModel.parentProductDetId = Number(this.productId);
                        this.productModel.productPkId = null;

                        this.formatDates();
                        this.setActiveTab(this.newProductType);
                    }, err => {
                        console.log(err);
                    }
                );
            }
            case 'Bonds': {
                this.productService.getBondsProductData(productId, status).subscribe(
                    result => {
                        console.log('Bonds result =>' + JSON.stringify(result));
                        this.productModel = result.data;
                        this.globalDisableField = result.disableRecord + '';
                        this.hideApproveReject = result.hideApprove;
                        console.log('EDIT? => ' + this.globalDisableField + ', HIDEBUTTONS? => ' + this.hideApproveReject);
                        this.newProductType = this.productModel.productType;

                        this.productModel.bondProduct = result.data.bondProduct;
                        this.productModel.prodFinObjDTO = result.data.prodFinObjDTO;
                        this.productModel.prohibitedCountries = result.data.prohibitedCountries;
                        this.productModel.parentProductDetId = Number(this.productId);
                        this.productModel.productPkId = null;

                        this.formatDates();
                        this.setActiveTab(this.newProductType);
                    }, err => {
                        console.log(err);
                    }
                );
            }

            case 'DCI': {

                this.productService.getDciProductData(productId, status).subscribe(
                    result => {
                        console.log('DCI result =>' + JSON.stringify(result));
                        this.productModel = result.data;
                        this.globalDisableField = result.disableRecord + '';
                        this.hideApproveReject = result.hideApprove;
                        console.log('EDIT? => ' + this.globalDisableField + ', HIDEBUTTONS? => ' + this.hideApproveReject);
                        this.newProductType = this.productModel.productType;

                        this.productModel.dciProduct = result.data.dciProduct;
                        this.productModel.prodFinObjDTO = result.data.prodFinObjDTO;
                        this.productModel.prohibitedCountries = result.data.prohibitedCountries;
                        this.productModel.parentProductDetId = Number(this.productId);
                        this.productModel.productPkId = null;

                        this.formatDates();
                        this.setActiveTab(this.newProductType);
                    }, err => {
                        console.log(err);
                    }
                );
            }

            case 'SP': {

                this.productService.getSPProductData(productId, status).subscribe(
                    result => {
                        console.log('SP result =>' + JSON.stringify(result));
                        this.productModel = result.data;
                        this.globalDisableField = result.disableRecord + '';
                        this.hideApproveReject = result.hideApprove;
                        console.log('EDIT? => ' + this.globalDisableField + ', HIDEBUTTONS? => ' + this.hideApproveReject);
                        this.newProductType = this.productModel.productType;
                        this.productModel.spProduct = result.data.spProduct;
                        this.productModel.prodFinObjDTO = result.data.prodFinObjDTO;
                        this.productModel.prohibitedCountries = result.data.prohibitedCountries;
                        this.productModel.parentProductDetId = Number(this.productId);
                        this.productModel.productPkId = null;

                        this.formatDates();
                        this.setActiveTab(this.newProductType);
                    }, err => {
                        console.log(err);
                    }
                );
            }

        }

    }

    onApporveRejectCheck(stat: string) {

        this.productService.updateAllProductsStatus(this.productId, stat, this.newProductType).subscribe(
            result => {

                this.getAllProductData(this.productId, stat);

                this.updateMessages(null, null, "Product " + stat + " successfully");

                // if (stat === 'REJECTED') {                    
                //     // this.productModel.sdProduct = new SDProductMaintenanceModel();
                //     // this.productModel = new ProductMaintenanceModel();
                //     this.getAllProductData(this.productId, 'REJECTED');
                // } else {
                //     this.getAllProductData(this.productId, 'APPROVED');
                // }
            }, err => {
                this.updateMessages(null, 'Failed to process the ' + stat + ' request.', null);
            }
        );

    }
    unlockData() {
        this.productService.unlockData(this.productId).subscribe(
            result => {
                this.updateMessages(null, null, "Product " + this.productId + "is unlocked ");
            }, err => {
                this.updateMessages(null, 'Failed to process the unlock request.', null);
            }
        );
    }

    goBack(): void {
        this.location.back();
    }

    mapActions(option: string) {
        this.ctr = 1;
        switch (option) {
            case 'add':
                break;
            case 'save':

                if (this.newProductType === 'UT') {

                    this.productModel.utProduct.fundId = this.productModel.productId;
                    this.productModel.insProduct = null;
                    this.productModel.sdProduct = null;
                    this.productModel.spProduct = null;
                    this.productModel.dciProduct = null;
                    this.productModel.bondProduct = null;

                    console.log('defaultCountryList => ' + JSON.stringify(this.defaultCountryList))

                    this.mapProhibitedCountries();
                    this.productModel.utProduct.productPkId = null;
                    //new creation
                    this.setProductEnumRefCodes();
                    //
                    console.log('*********UT_PRODUCT_SAVING********' + JSON.stringify(this.productModel));
                    console.log('*********newProductType***********' + JSON.stringify(this.newProductType));
                    this.createAndUpdateforAllProducts(this.productModel);

                    console.log("******** UT Record Created*********");

                } else if (this.newProductType === 'INS') {

                    this.productModel.insProduct.creationDt = this.productModel.insProduct.productCreationDt;

                    this.setProductEnumRefCodes();
                    this.mapProhibitedCountries();
                    this.productModel.utProduct = null;
                    this.productModel.sdProduct = null;
                    this.productModel.spProduct = null;
                    this.productModel.dciProduct = null;
                    this.productModel.bondProduct = null;
                    this.productModel.insProduct.productPkId = null;
                    this.productModel.prodFinObjDTO.productPkId = null
                    console.log('SAVING INS.....................' + JSON.stringify(this.productModel));
                    this.createAndUpdateforAllProducts(this.productModel);

                } else if (this.newProductType === 'SD') {

                    this.mapProhibitedCountries();
                    this.productModel.sdProduct.productPkId = null;
                    this.productModel.prodFinObjDTO.productPkId = null;
                    this.productModel.utProduct = null;
                    this.productModel.sdProduct = null;
                    this.productModel.spProduct = null;
                    this.productModel.dciProduct = null;
                    this.productModel.bondProduct = null;

                    //new creation
                    this.setProductEnumRefCodes();
                    //
                    console.log('*********UT_PRODUCT_SAVING********' + JSON.stringify(this.productModel));
                    console.log('*********newProductType***********' + JSON.stringify(this.newProductType));
                    this.createAndUpdateforAllProducts(this.productModel);
                    console.log("******** SD Record Created*********");
                }
                else if (this.newProductType === 'SP') {

                    this.mapProhibitedCountries();
                    this.productModel.spProduct.productPkId = null;
                    this.productModel.utProduct = null;
                    this.productModel.sdProduct = null;
                    this.productModel.insProduct = null;
                    this.productModel.bondProduct = null;
                    this.productModel.dciProduct = null;
                    //new creation
                    this.setProductEnumRefCodes();
                    //
                    console.log('*********SP_PRODUCT_SAVING********' + JSON.stringify(this.productModel));
                    console.log('*********newProductType***********' + JSON.stringify(this.newProductType));

                    this.createAndUpdateforAllProducts(this.productModel);
                    console.log("******** SP Record Created*********");
                }
                else if (this.newProductType === 'DCI') {

                    this.mapProhibitedCountries();
                    this.productModel.dciProduct.productPkId = null;

                    this.productModel.utProduct = null;
                    this.productModel.sdProduct = null;
                    this.productModel.spProduct = null;
                    this.productModel.bondProduct = null;
                    this.productModel.insProduct = null;
                    //new creation
                    this.setProductEnumRefCodes();
                    //
                    console.log('*********DCI_PRODUCT_SAVING********' + JSON.stringify(this.productModel));
                    console.log('*********newProductType***********' + JSON.stringify(this.newProductType));
                    this.createAndUpdateforAllProducts(this.productModel);
                    console.log("******** DCI Record Created*********");
                }
                else if (this.newProductType === 'Bonds') {
                    this.mapProhibitedCountries();
                    this.productModel.bondProduct.productPkId = null;

                    this.productModel.utProduct = null;
                    this.productModel.sdProduct = null;
                    this.productModel.spProduct = null;
                    this.productModel.dciProduct = null;
                    this.productModel.insProduct = null;
                    //new creation
                    this.setProductEnumRefCodes();
                    //
                    console.log('*********Bonds_PRODUCT_SAVING********' + JSON.stringify(this.productModel));
                    console.log('*********newProductType***********' + JSON.stringify(this.newProductType));
                    this.createAndUpdateforAllProducts(this.productModel);
                    console.log("******** Bonds Record Created*********");
                }
                break;
            case 'delete':
                break;
        }
    }

    createAndUpdateforAllProducts(productModel: ProductMaintenanceModel) {

        this.productService.createProductsByStatus(this.newProductType, productModel).subscribe(
            result => {
                if (this.EditDisable == 'true') {
                    this.updateMessages(null, null, "Product of " + this.productModel.productId + " updated successfully");

                } else {
                    this.updateMessages(null, null, "Product of " + this.productModel.productId + " created successfully");
                    this.ctr = 0;
                }
            }, err => {
                this.updateMessages(null, 'Failed to process the request.', null);
                this.ctr = 0;
            }
        );
    }

    updateMessages(infoMsg: string, error: string, successMsg: string) {
        this.hideAlerts();
        this.infoMsg = infoMsg;
        this.error = error;
        this.successMsg = successMsg;
    }

    hideAlerts() {
        this.infoMsg = null;
        this.error = null;
        this.successMsg = null;
    }

    formatDates() {
        if (this.newProductType === 'UT') {
            if (this.productModel.creationDt != null) {
                this.productModel.creationDt = this.productModel.creationDt.substring(0, 10);
                console.log(this.productModel.creationDt);
            } if (this.productModel.productLastUpdateDt != null) {
                this.productModel.productLastUpdateDt = this.productModel.productLastUpdateDt.substring(0, 10);
            }
            if (this.productModel.utProduct.latestQuotationDt != null) {
                this.productModel.utProduct.latestQuotationDt = this.productModel.utProduct.latestQuotationDt.substring(0, 10);
            }
            if (this.productModel.utProduct.creationDt != null) {
                this.productModel.utProduct.creationDt = this.productModel.utProduct.creationDt.substring(0, 10);
            }
            if (this.productModel.utProduct.fundCreationDate != null) {
                this.productModel.utProduct.fundCreationDate = this.productModel.utProduct.fundCreationDate.substring(0, 10);
            }
            if (this.productModel.utProduct.lastSubDt != null) {
                this.productModel.utProduct.lastSubDt = this.productModel.utProduct.lastSubDt.substring(0, 10);
            }
            if (this.productModel.utProduct.latestTradeDt != null) {
                this.productModel.utProduct.latestTradeDt = this.productModel.utProduct.latestTradeDt.substring(0, 10);
            }
            if (this.productModel.utProduct.offerEndDt != null) {
                this.productModel.utProduct.offerEndDt = this.productModel.utProduct.offerEndDt.substring(0, 10);
            }
            if (this.productModel.utProduct.offerStartDt != null) {
                this.productModel.utProduct.offerStartDt = this.productModel.utProduct.offerStartDt.substring(0, 10);
            }
            if (this.productModel.utProduct.productLastUpdateDt != null) {
                this.productModel.utProduct.productLastUpdateDt = this.productModel.utProduct.productLastUpdateDt.substring(0, 10);
            }
            if (this.productModel.utProduct.tenureEndDt != null) {
                this.productModel.utProduct.tenureEndDt = this.productModel.utProduct.tenureEndDt.substring(0, 10);
            }
            if (this.productModel.utProduct.tenureStartDt != null) {
                this.productModel.utProduct.tenureStartDt = this.productModel.utProduct.tenureStartDt.substring(0, 10);
            }
            if (this.productModel.utProduct.fundLastUpdateDate != null) {
                this.productModel.utProduct.fundLastUpdateDate = this.productModel.utProduct.fundLastUpdateDate.substring(0, 10);
            }
        } else if (this.newProductType === 'SD') {
            if (this.productModel.sdProduct.offerEndDt != null) {
                this.productModel.sdProduct.offerEndDt = this.productModel.sdProduct.offerEndDt.substring(0, 10);
            }
            if (this.productModel.sdProduct.offerStartDt != null) {
                this.productModel.sdProduct.offerStartDt = this.productModel.sdProduct.offerStartDt.substring(0, 10);
            }
            if (this.productModel.sdProduct.dealStartDt != null) {
                this.productModel.sdProduct.dealStartDt = this.productModel.sdProduct.dealStartDt.substring(0, 10);
            }
            if (this.productModel.sdProduct.dealEndDt != null) {
                this.productModel.sdProduct.dealEndDt = this.productModel.sdProduct.dealEndDt.substring(0, 10);
            }
        }
        else if (this.newProductType === 'Bonds') {
            if (this.productModel.bondProduct.maturityDate != null) {
                this.productModel.bondProduct.maturityDate = this.productModel.bondProduct.maturityDate.substring(0, 10);
            }
        } else if (this.newProductType === 'DCI') {

            if (this.productModel.dciProduct.dealEndDt != null) {
                this.productModel.dciProduct.dealEndDt = this.productModel.dciProduct.dealEndDt.substring(0, 10);
            }
            if (this.productModel.dciProduct.dealStartDt != null) {
                this.productModel.dciProduct.dealStartDt = this.productModel.dciProduct.dealStartDt.substring(0, 10);
            }
        } else if (this.newProductType === 'SP') {
            if (this.productModel.spProduct.offerEndDt != null) {
                this.productModel.spProduct.offerEndDt = this.productModel.spProduct.offerEndDt.substring(0, 10);
            }
            if (this.productModel.spProduct.offerStartDt != null) {
                this.productModel.spProduct.offerStartDt = this.productModel.spProduct.offerStartDt.substring(0, 10);
            }
        }
        else if (this.newProductType == 'INS') {
            if (this.productModel.insProduct.creationDt != null) {
                this.productModel.insProduct.creationDt = this.productModel.insProduct.creationDt.substring(0, 10);
            }
            if (this.productModel.insProduct.productCreationDt != null) {
                this.productModel.insProduct.productCreationDt = this.productModel.insProduct.productCreationDt.substring(0, 10);
            }
            if (this.productModel.insProduct.productLastUpdateDt != null) {
                this.productModel.insProduct.productLastUpdateDt = this.productModel.insProduct.productLastUpdateDt.substring(0, 10);
            }
        }


        //        else if (this.newProductType == 'INS') {
        //            if (this.productModel.insProduct.creationDt != null) {
        //                this.productModel.insProduct.creationDt = this.productModel.insProduct.creationDt.substring(0, 10);
        //            }
        //            if (this.productModel.insProduct.productLastUpdateDt != null) {
        //                this.productModel.insProduct.productLastUpdateDt = this.productModel.insProduct.productLastUpdateDt.substring(0, 10);
        //            }
        //        }
        //        else if (this.newProductType == 'SD') {
        //            if (this.productModel.sdProduct.offerEndDt != null) {
        //                this.productModel.sdProduct.offerEndDt = this.productModel.sdProduct.offerEndDt.substring(0, 10);
        //            }
        //            if (this.productModel.sdProduct.offerStartDt != null) {
        //                this.productModel.sdProduct.offerStartDt = this.productModel.sdProduct.offerStartDt.substring(0, 10);
        //            }
        //            if (this.productModel.sdProduct.dealStartDt != null) {
        //                this.productModel.sdProduct.dealStartDt = this.productModel.sdProduct.dealStartDt.substring(0, 10);
        //            }
        //
        //            if (this.productModel.sdProduct.dealEndDt != null) {
        //                this.productModel.sdProduct.dealEndDt = this.productModel.sdProduct.dealEndDt.substring(0, 10);
        //            }
        //        } else if (this.newProductType == 'ELN/SP') {
        //            if (this.productModel.spProduct.offerEndDt != null) {
        //                this.productModel.spProduct.offerEndDt = this.productModel.spProduct.offerEndDt.substring(0, 10);
        //            }
        //            if (this.productModel.spProduct.offerStartDt != null) {
        //                this.productModel.spProduct.offerStartDt = this.productModel.spProduct.offerStartDt.substring(0, 10);
        //            }
        //        } else if (this.newProductType == 'Bonds') {
        //            if (this.productModel.bondsProduct.maturityDate != null) {
        //                this.productModel.bondsProduct.maturityDate = this.productModel.bondsProduct.maturityDate.substring(0, 10);
        //            }
        //        } else if (this.newProductType == 'DCI') {
        //            if (this.productModel.dciProduct.dealEndDt != null) {
        //                this.productModel.dciProduct.dealEndDt = this.productModel.dciProduct.dealEndDt.substring(0, 10);
        //            }
        //            if (this.productModel.dciProduct.dealStartDt != null) {
        //                this.productModel.dciProduct.dealStartDt = this.productModel.dciProduct.dealStartDt.substring(0, 10);
        //            }
        //        }
    }

    validateForm() {
        console.log('validateForm');
        this.submitButton.nativeElement.click();
    }

    updateToolBarBehavior() {
        this.toolBarService.setToolBarBehavior({ disable: this.disableRecord });
    }
    getDefaultCountryList() {
        this.defaultCountryList = [];
        this.countryTypeUIArray = [];
        for (let i = 0; i < this.countryTypeArray.length; i++) {
            if (this.countryTypeArray[i].descCode === 'US' || this.countryTypeArray[i].descCode === 'DE' || this.countryTypeArray[i].descCode === 'CA') {
                this.defaultCountryList.push(this.countryTypeArray[i]);

            } else {
                this.countryTypeUIArray.push(this.countryTypeArray[i]);

            }
        }
    }
    getAddittionOfProducts() {
        for (let i = 0; i < this.countryTypeUIArray.length; i++) {
            if (this.countryTypeUIArray[i].descCode === this.country) {
                this.defaultCountryList.push(this.countryTypeUIArray[i]);
                var index = this.countryTypeUIArray.indexOf(this.country);
                this.countryTypeUIArray.splice(index, 1);

                console.log(this.defaultCountryList);
                console.log(this.countryTypeUIArray);
            }
        }
        // var index = this.countryTypeUIArray.indexOf(this.country);
        // this.countryTypeUIArray.splice(index, 1);
        //this.countryTypeUIArray.slice(this.countryTypeUIArray[indexVal]);
    }

    getRemovalOfProducts() {
        for (let i = 0; i < this.defaultCountryList.length; i++) {
            if (this.defaultCountryList[i].descCode === this.country) {
                this.countryTypeUIArray.push(this.defaultCountryList[i]);
                var index = this.defaultCountryList.indexOf(this.country);
                this.defaultCountryList.splice(index, 1);
                console.log(this.defaultCountryList);
                console.log(this.countryTypeArray);
            }
        }
    }

    mapProhibitedCountries() {
        this.productModel.prohibitedCountries = [];
        for (let i = 0; i <= this.defaultCountryList.length - 1; i++) {
            let obj: Object = {
                "countryCd": 1021,
                "countryId": this.defaultCountryList[i].descCode,
                "productPkId": null,
                "prohibitedCountryId": null
            }
            this.productModel.prohibitedCountries.push(obj);
        }
    }

    onChangeOfDefaultCountryType(changedDefaultCountry: string) {
        this.defaultCountry = changedDefaultCountry;
        console.log(changedDefaultCountry);
        console.log(this.defaultCountry);
    }
    getProductTypesList() {
        this.productService.getProductTypes().subscribe(
            result => {
                this.productTypeArray = result.data['1003'];
                console.log("RESPONSE=>" + JSON.stringify(result));
            }, err => {
                alert('Failed');
            }
        );
    }

    getAllDropdownValues() {
        this.productService.getAllDropDownValues().subscribe(
            result => {
                //dividend type 
                this.dividendTypeArray = result.data['1004'];
                //Premium Type
                this.premiumTypeArray = result.data['1005'];
                //RiskRating
                this.riskRatingTypeArray = result.data['1006'];
                //Fund Type
                this.fundTypeTypeArray = result.data['1008'];
                //Fund Category
                this.fundCategoryTypeArray = result.data['1026'];
                //Mp Asset Class
                this.mpAssetClassTypeArray = result.data['1009'];
                //Insurance Type
                this.insuranceTypeArray = result.data['1010'];
                //Insurance GIO  
                this.insuranceGIOTypeArray = result.data['1011'];
                //InsuranceCategory  
                this.insuranceCategoryTypeArray = result.data['1020'];
                //InsuranceCategory  
                this.countryTypeArray = result.data['1021'];
                this.getDefaultCountryList();
                //sector 
                this.sectorTypeArray = result.data['1022'];
                //capital Exposure 
                this.capitalExposureTypeArray = result.data['1023'];

                console.log("countryTypeArray=>" + JSON.stringify(this.countryTypeArray));

            }, err => {
                alert('Failed');
            }
        );
    }
    ngAfterViewInit() {

    }
    setActiveTab(tab: string) {
        this.toolBarService.notfyToolBar({ module: tab });
    }
    onChangeProductType(changedProductType: string) {
        this.newProductType = changedProductType;
        //this.ngAfterViewInit();
        console.log(changedProductType);
        console.log(this.newProductType);
    }
    onChangePremiumType(changedPremiumType: string) {
        this.premiumType = changedPremiumType;
        console.log(changedPremiumType);
        console.log(this.premiumType);
    }

    onChangeInsuranceType(changedInsuranceType: string) {
        this.insuranceType = changedInsuranceType;
        console.log(changedInsuranceType);
        console.log(this.insuranceType);
    }

    onChangeFundType(changedFundtype: string) {
        this.fundType = changedFundtype;
        console.log(changedFundtype);
        console.log(this.fundType);
    }

    onChangeFundCategoryType(changedFundCategory: string) {
        this.fundCategory = changedFundCategory;
        console.log(changedFundCategory);
        console.log(this.fundCategory);
    }
    onChangeMpAssetClass(changedAssetClass: string) {
        this.assetClass = changedAssetClass;
        console.log(this.assetClass);
        console.log(changedAssetClass);
    }
    onChangeRiskRatingType(changedRsikRating: string) {
        this.riskRating = changedRsikRating;
        console.log(changedRsikRating);
        console.log(this.riskRating);
    }
    onChangeInsuranceGIOType(changedInsuranceGIO: string) {
        this.insuranceGIO = changedInsuranceGIO;
        console.log(changedInsuranceGIO);
        console.log(this.insuranceGIO);
    }
    onChangeInsuranceCategoryType(changedInsuranceCategory: string) {
        this.insuranceCategory = changedInsuranceCategory;
        console.log(changedInsuranceCategory);
        console.log(this.insuranceCategory);
    }
    onChangeSectorType(changedSector: string) {
        this.sector = changedSector;
        console.log(changedSector);
        console.log(this.sector);
    }
    onChangeCapitalExposureType(changedCapitalExposure: string) {
        this.capitalExposure = changedCapitalExposure;
        console.log(changedCapitalExposure);
        console.log(this.capitalExposure);
    }
    onChangeDividendType(changedDividendType: string) {
        this.dividend = changedDividendType;
        console.log(changedDividendType);
        console.log(this.dividend);
    }
    onClickCountryType(changedCountrytype: string) {
        this.country = changedCountrytype;
        console.log(changedCountrytype);
        console.log(this.country);
    }
    onChangeCountryType(changedCountrytype: string) {
        this.country = changedCountrytype;
        console.log(changedCountrytype);
        console.log(this.country);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        console.log('onDestroy');
    }
}