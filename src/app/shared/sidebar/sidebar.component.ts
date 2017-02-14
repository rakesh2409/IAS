/**
 * Author: Ricardo Ferrancullo III
 */
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
declare var jQuery:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    @ViewChild('container') container;
    menu: Array<any>;
    data: Array<any>;
    components: Array<any>;
    menuSearch: string;
    constructor( private userservice: UserService) {}
    ngOnInit() {
      this.menu = JSON.parse(
        localStorage.getItem('menus')
      );
      this.mapAccessComponent();
    }
    
    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    mapAccessComponent()  {
        this.data = JSON.parse(localStorage.getItem('cache_components'));
        for (let x = 0; x < this.data.length; x++) {
            if (this.data[x].moduleCode === 'Menu') {
              this.components = this.data[x].component;
              for (let a = 0; a < this.components.length; a++) {
                for (let i = 0; i < this.menu.length; i++) {
                  if (this.menu[i].className === this.components[a].name) {
                      if (this.components[a].accessCode === 'HIDDEN') {
                          this.menu[i].className = 'hide';
                      }
                  }
                }
              }
              break;
            }
        }
    }
    
    searchMenu() {
        if(this.menuSearch !== ''){
            for (let i = 0; i < this.menu.length; i++) {
                if(this.menu[i].className !== 'hide') {
                    if(this.menu[i].subMenuList !== null) {
                       let subMenu = this.menu[i].subMenuList;
                       let subMenuLen = subMenu.length;
                       let ctr = 0;
                       for(let x = 0; x < subMenu.length; x++) {
                           if((subMenu[x].title !== null) 
                                   && (!(subMenu[x].title.toLowerCase().indexOf(this.menuSearch) !== -1))) {
                               ctr++;
                           }    
                       }
                       if(ctr === subMenuLen){
                           this.menu[i].className = 'hideForSearch';
                       } else {
                           this.menu[i].className = '';
                       }
                   }
               }
            }  
        }               
    }
    
    setDefaultMenu(){
        if(this.menuSearch === ''){
            for (let i = 0; i < this.menu.length; i++) {
                if(this.menu[i].className = 'hideForSearch'){
                    this.menu[i].className = "";
                }
            }
        }        
    }
}
