import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardRoutes } from "./dashboard/dashboard.routes";


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path : 'login', component : LoginComponent},
    ...DashboardRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

       