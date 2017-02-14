import { DashboardComponent } from "./dashboard.component";
import { SearchUserComponent } from "./search-user/search-user.component";
import { SearchGroupComponent } from "./search-group/search-group.component";
import { ParamSettingsComponent } from "./param-settings/param-settings.component";
import { VulnTriggersComponent } from "./vuln-triggers/vuln-triggers.component";
import { SvApprovalComponent } from "./sv-approval/sv-approval.component";
import { GlobalParmMakerqComponent } from "./global-parm-makerq/global-parm-makerq.component";
import { GlobalParmCheckerqComponent } from "./global-parm-checkerq/global-parm-checkerq.component";
import { GroupMaintenanceComponent } from "./group-maintenance/group-maintenance.component";
import { UserMaintenanceComponent } from "./user-maintenance/user-maintenance.component";
import { UserAccessMakerqComponent } from "./user-access-makerq/user-access-makerq.component";
import { UserAccessCheckerqComponent } from "./user-access-checkerq/user-access-checkerq.component";
import { ProductMaintenanceComponent } from "./product-maintenance/product-maintenance.component";
import { ProductTypePipe, ProductNamePipe, RiskRatingPipe } from "./product-maintenance/productType.pipe";
import { ProductAddNewComponent } from "./product-maintenance/product-additional-forms/product-addnew.component";
import { ProductListingComponent } from "./product-maintenance/product-listing/product-listing.component";
import { HolidayMaintenanceComponent } from "./holiday-maintenance/holiday-maintenance.component";
import { HolidayMakerqComponent } from "./holiday-makerq/holiday-makerq.component";
import { HolidayCheckerqComponent } from "./holiday-checkerq/holiday-checkerq.component";
import { ReportsComponent } from "./reports/reports.component";
import { GroupMaintenanceModule } from "./group-maintenance/group-maintenance.module";
import { UserMaintenanceModule } from './user-maintenance/user-maintenance.module';
import { GlobalCheckerMakerComponent } from "./global-checker-maker/global-checker-maker.component";
import { GlobalMakerqComponent } from "./global-checker-maker/global-makerq/global-makerq.component";
import { GlobalCheckerqComponent } from "./global-checker-maker/global-checkerq/global-checkerq.component";
import { ProductProvidersComponent } from "./product-providers/product-providers.component";
import { InsuranceTabComponent } from "./product-providers/insurance-tab/insurance-tab.component";
import { UnitTrustTabComponent } from "./product-providers/unit-trust-tab/unit-trust-tab.component";
import { ClientProspectDetailsComponent } from './search-user/client-prospect-details/client-prospect-details.component';
import { CreateProspectIndivdualComponent } from './search-user/create-prospect/create-prospect-individual/create-prospect-individual.component';
import { CreateProspectNonIndivdualComponent } from './search-user/create-prospect/create-prospect-non-individual/create-prospect-non-individual.component';
import { CreateProspectComponent } from './search-user/create-prospect/create-prospect.component';
import { SearchClientProspectComponent } from './search-user/search-client-prospect/search-client-prospect.component';


export const DashboardModule = [
  DashboardComponent,
  SearchUserComponent,
  SearchGroupComponent,
  ParamSettingsComponent,
  VulnTriggersComponent,
  SvApprovalComponent,
  GlobalParmMakerqComponent,
  GlobalParmCheckerqComponent,
  GroupMaintenanceComponent,
  UserMaintenanceComponent,
  UserAccessMakerqComponent,
  UserAccessCheckerqComponent,
  ProductMaintenanceComponent,
  ProductTypePipe,
  ProductNamePipe,
  RiskRatingPipe,
  ProductAddNewComponent,
  ProductListingComponent,
  HolidayMaintenanceComponent,
  HolidayMakerqComponent,
  HolidayCheckerqComponent,
  ReportsComponent,
  GroupMaintenanceModule,
  UserMaintenanceModule,
  GlobalCheckerMakerComponent,
  GlobalMakerqComponent,
  GlobalCheckerqComponent,
  ProductProvidersComponent,
  InsuranceTabComponent,
  UnitTrustTabComponent,
  SearchClientProspectComponent,
  CreateProspectIndivdualComponent,
  CreateProspectNonIndivdualComponent,
  CreateProspectComponent,
  ClientProspectDetailsComponent

]
