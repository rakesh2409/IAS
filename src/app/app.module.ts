import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { LoginComponent } from './login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { UserMaintenanceService } from './_services/user-maintenance.service';
import { UTProductMainteanceService } from './_services/utproduct-maintaince.service';
import { ProductMaintenanceService } from './_services/product-maintenance.service';
import { ProductMainteanceService } from './_services/product-maintaince.service';
import { UserAccessService } from './_services/user-access.service';
import { CheckerMakerService } from './_services/checker-maker.service';
import { ParamSettingsService } from './_services/param-settings.service';
import { ToolBarService } from './_services/toolbar-actions.service';
import { GroupService } from './_services/group-service';
import { VulnTriggerService } from './_services/vuln-triggers.service';
import { SvApprovalService } from './_services/sv-approval.service';
import { Logger } from './_services/logger.service';
import { TopnavComponent } from './shared/topnav/topnav.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { ErrorComponent } from './error/error.component';
import { APP_CONFIG, AppConfig } from './app.config';
import { TopnavService } from './shared/topnav/topnav-service';
import { Router, RouterModule} from '@angular/router';
import { UserMaintenanceModel } from './_models/user-maintenance.model';
import { UTProductMaintenanceModel } from './_models/utproduct-maintenance.model';
import { ProductMaintenanceModel } from './_models/product-maintenance.model';
import { ProductProhibitedCountryModel } from './_models/product-prohibited-country';
import { ProductFinancialModel } from './_models/product-financial-object';
import { ModuleHeadingComponent } from './shared/module-heading/module-heading.component';
import { MyFilterPipe } from  './dashboard/product-providers/pipe';
import { ProductProviderService } from './_services/product-provider.service';
import { ProductProviderModel } from './_models/product-provider.model';
import { ClientModel } from './_models/client.model';
import { ClientEnumReferenceService } from './_services/client-enum-ref.service';
import { ClientDetailsService } from './_services/client-details.service';
import { HolidayMaintenanceService } from './_services/holiday-maintenance.service';
 //For calendar only
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarUtilsModule } from './dashboard/holiday-maintenance/calendar-utils/module';
import { Ng2PaginationModule } from 'ng2-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardModule,
    TopnavComponent,
    SidebarComponent,
    ToolbarComponent,
    ErrorComponent,
    ModuleHeadingComponent,
    MyFilterPipe
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    CalendarUtilsModule,
    Ng2PaginationModule
  ],
  providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        ProductMaintenanceService,
        ProductMainteanceService,
        GroupService,
        UserAccessService,
        ToolBarService,
        UserMaintenanceService,
        ProductProviderService,
        UTProductMainteanceService,
        CheckerMakerService,
        TopnavService,
        RouterModule,
        Logger,
        ParamSettingsService,
        UserMaintenanceModel,
        VulnTriggerService,
        SvApprovalService,
        ClientModel,
        ClientEnumReferenceService,
        HolidayMaintenanceService,
        ClientDetailsService,
        UTProductMaintenanceModel,
        ProductMaintenanceModel,
        ProductFinancialModel,
        ProductProhibitedCountryModel,
        ProductProviderModel,
        { provide: APP_CONFIG, useValue: AppConfig },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ErrorComponent,FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
