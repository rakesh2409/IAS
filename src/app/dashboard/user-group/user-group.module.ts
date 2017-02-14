import { UserGroupComponent } from "./user-group.component";
import { SearchUserComponent } from "./search-user/search-user.component";
import { SearchGroupComponent } from "./search-group/search-group.component";

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


const UserGroups = [
    UserGroupComponent,
    SearchUserComponent,
    SearchGroupComponent
]

@NgModule({
    imports: [RouterModule],
    declarations: [UserGroupModule],
    exports: [UserGroupComponent]
})

export class UserGroupModule {}