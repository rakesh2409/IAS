import { Component, OnInit, Input } from '@angular/core';
import { CheckerMakerService } from '../../../_services/checker-maker.service';

@Component({
  selector: 'app-global-makerq',
  templateUrl: './global-makerq.component.html',
  styleUrls: ['./global-makerq.component.css']
})

export class GlobalMakerqComponent implements OnInit {
  private activeRowIndex: number;
  private makerData= [];
  @Input() checkerMakerData: Array<any>;
  constructor(private checkerMakerService: CheckerMakerService) { }

  ngOnInit() {
      this.checkerMakerService.getCheckerMakerQueue()
          .subscribe( response => {
              this.checkerMakerData = response.data;
              this.getMakerData();
          });
  }
  
  getMakerData() {
      for (let i=0; i<(this.checkerMakerData.length); i++){
          let data = this.checkerMakerData[i];
          if (data.makerFlag) {
              let temp:string = data.createDtm;
              data.createDtm = this.formatDate(data.createDtm)
              data.version = this.formatTime(temp)    
              this.makerData.push(data);
          } 
      }
  }
  
  amendRequest() {
      
  }
  
  formatDate(dtm: string) : string {
      return dtm.substring(0,10);
  }
  
  formatTime(dtm: string): string {
      return dtm.substring(11,19);
  }
  
  setActiveRow(index: number) {
      this.activeRowIndex = index;
  }

}
