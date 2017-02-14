import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-module-heading',
  templateUrl: './module-heading.component.html',
  styleUrls: ['./module-heading.component.css']
})
export class ModuleHeadingComponent {
  @Input()
  moduleHeading: string;
  setModuleHeading(heading: string) {
    this.moduleHeading = heading;
  }

}
