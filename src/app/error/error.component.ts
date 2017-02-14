import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() errorMsg: string;
  @Input() successMsg: string;
  @Input() infoMsg: string;
  @Input() warningMsg: string;
  @Input() dangerMsg: string;
setErrorMsg(error :string){
 this.errorMsg = error;
}
}
