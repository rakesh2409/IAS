import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToolBarService } from '../../_services/toolbar-actions.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
  private subscription: Subscription;
  private currentModule: string;
  private disableToolBar: boolean = false;
  constructor(private toolBarService: ToolBarService) {}
  ngOnInit() {
    this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('module')) {
        this.currentModule = res.module;
      }
      if (res.hasOwnProperty('disable')) {
         this.disableToolBar = res.disable;
      }
    });
  }

  actionTrigger(action: string) {
    this.toolBarService.notifyCurrentModule({option: action, module: this.currentModule});
  }
}