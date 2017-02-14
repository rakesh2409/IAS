import { Routes } from '@angular/router';

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
import { ProductListingComponent } from "./product-maintenance/product-listing/product-listing.component";
import { ProductAddNewComponent } from "./product-maintenance/product-additional-forms/product-addnew.component";
import { HolidayMakerqComponent } from "./holiday-makerq/holiday-makerq.component";
import { HolidayMaintenanceComponent} from "./holiday-maintenance/holiday-maintenance.component";
import { HolidayCheckerqComponent } from "./holiday-checkerq/holiday-checkerq.component";
import { ReportsComponent } from "./reports/reports.component";
import { GlobalCheckerMakerComponent } from "./global-checker-maker/global-checker-maker.component";
import { GlobalMakerqComponent } from "./global-checker-maker/global-makerq/global-makerq.component";
import { GlobalCheckerqComponent } from "./global-checker-maker/global-checkerq/global-checkerq.component";
import { ProductProvidersComponent } from "./product-providers/product-providers.component";
import { ClientProspectDetailsComponent } from "./search-user/client-prospect-details/client-prospect-details.component";
import { CreateProspectIndivdualComponent } from "./search-user/create-prospect/create-prospect-individual/create-prospect-individual.component";
import { CreateProspectNonIndivdualComponent } from "./search-user/create-prospect/create-prospect-non-individual/create-prospect-non-individual.component";
import { CreateProspectComponent } from "./search-user/create-prospect/create-prospect.component";
import { SearchClientProspectComponent } from "./search-user/search-client-prospect/search-client-prospect.component";


export const DashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
             // Search User/Group
             {path : '', redirectTo: 'search-user', pathMatch: 'full'},
             {path: 'search-user', component: SearchUserComponent,
                //Client -TEMPORARY
                children: [
                  { path: '', redirectTo: 'search-client-prospect', pathMatch: 'full' },
                  { path: 'search-client-prospect', component: SearchClientProspectComponent },
                  { path: 'client-prospect-details/:id', component: ClientProspectDetailsComponent },
                 // { path: 'client-prospect-details', component: ClientProspectDetailsComponent },
                  {
                    path: 'create-prospect', component: CreateProspectComponent,
                    children: [
                      { path: 'create-prospect-individual', component: CreateProspectIndivdualComponent },
                      { path: 'create-prospect-non-individual', component: CreateProspectNonIndivdualComponent },
                    ]
                  },
                ]
              },
             {path : 'search-group', component : SearchGroupComponent},
             // Global Param Settings
             {path : 'param-setting/:id', component : ParamSettingsComponent},
             {path : 'vuln-triggers/:id', component : VulnTriggersComponent},
             {path : 'sv-approval/:id', component : SvApprovalComponent},
             {path : 'global-param-maker', component : GlobalParmMakerqComponent},
             {path : 'global-param-checker', component : GlobalParmCheckerqComponent},
             // User Access Maintenance
             {path : 'group-maintenance/:id',  component : GroupMaintenanceComponent},
             {path : 'user-maintenance/:id', component : UserMaintenanceComponent},
             {path : 'useraccess-maker', component : UserAccessMakerqComponent},
             {path : 'useraccess-checker', component : UserAccessCheckerqComponent},
             // Product Library
             {path : 'prod-maintenance', component : ProductMaintenanceComponent,
                children: [
                  {path : '', redirectTo: 'product-listing', pathMatch: 'full'},
                  {path : 'product-listing', component: ProductListingComponent},
                  { path: 'product-listing/:prodType', component: ProductListingComponent },
                  { path: 'product-additional-forms/:id/:stat/:edit', component: ProductAddNewComponent }
                //    { path: 'product-additional-forms/:prodType/:prodTypes/:id/:stat/:edit', component: ProductAddNewComponent }
                ]
              },
             // Holiday Table
             {path : 'holiday-maintenance/:id', component : HolidayMaintenanceComponent},
             {path : 'holiday-maker', component : HolidayMakerqComponent},
             {path : 'holiday-checker', component : HolidayCheckerqComponent},
             // Reports
             {path : 'reports', component : ReportsComponent},
             //Global Checker and Maker
             {path : 'checker-maker', component : GlobalCheckerMakerComponent,
                 children: [
                   { path: 'global-maker', component : GlobalMakerqComponent },
                   { path: 'global-checker', component : GlobalCheckerqComponent }
                 ]
             },
             //Product Providers
             {path: 'product-providers/:id', component : ProductProvidersComponent }
             

        ]
    }
];
