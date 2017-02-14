import { Routes } from '@angular/router';

import { SearchUserComponent } from "./search-user/search-user.component";
import { SearchGroupComponent } from "./search-group/search-group.component";
import { UserGroupComponent } from "./user-group.component";

export const UserGroupRoutes: Routes = [
    {
        path: 'usergroup',
        component: UserGroupComponent,
        children: [
            {path: '', redirectTo: 'search-user', pathMatch: 'full'},
            {path: 'search-user', component: SearchUserComponent},
            {path: 'search-group', component: SearchGroupComponent}
        ]
    }
];