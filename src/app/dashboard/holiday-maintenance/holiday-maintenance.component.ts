/*
 *  Reference: https://github.com/angular/angular-cli
 *  Customized by: Ricardo Ferrancullo III
 */
import { Component, ChangeDetectionStrategy, ViewChild, 
    TemplateRef, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToolBarService } from '../../_services/toolbar-actions.service';
import { ActivatedRoute } from  '@angular/router';
import { format, startOfDay, endOfDay, subDays, addDays, endOfMonth, 
    isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HolidayMaintenanceService } from '../../_services/holiday-maintenance.service';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';

@Component({
  selector: 'app-holiday-maintenance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './holiday-maintenance.component.html',
  styleUrls: ['./holiday-maintenance.component.css']
})
export class HolidayMaintenanceComponent implements OnInit, 
        AfterViewInit, OnDestroy {
  
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('showModal') showModal:ElementRef;
  private subscription: Subscription;
  private view: string = 'month';
  private isSingleEvent: boolean;
  private disableRecord = false;
  private hideApproveReject = true;
  private moduleName = 'holiday-calendar';
  private statusCode: string = 'APPROVED';
  private successMsg : string;
  private error: string;
  private infoMsg: string;
  private modalAction: string;
  colors: any = {
          red: {
            primary: '#ad2121',
            secondary: '#FAE3E3'
          },
          blue: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
          },
          yellow: {
            primary: '#e3bc08',
            secondary: '#FDF1BA'
          }
  };
  viewDate: Date = new Date();
  
  mappedEvent: Object = {
     "holidayId": null,
     "startDt": null,
     "endDt": null,
     "title": null,
     "currHolidayTempId": null,
     "activeInd": null,
     "createDtm": null,
     "createdBy": null,
     "lastUpDateDtm": null,
     "lastUpdatedBy": null,
     "version": null,
     "id": null
  }

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('EDIT', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      let conf = confirm('Do you really want to delete this holiday?');
      if (conf) {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.holidayService.deleteHoliday(event.id).subscribe(
            response => {
            if(response) {
                this.successMsg = "Holiday successfuly deleted.";
            }}, err => {
                this.error = err;
            });
      }    
    }
  }];

  refresh: Subject<any> = new Subject();
  calendarData: Array<any> = [];
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, 
          private toolBarService: ToolBarService,
          private holidayService: HolidayMaintenanceService,
          private route: ActivatedRoute) {}
  
  ngOnInit() {
      this.route
      .params
      .subscribe(params => {
          if (params['id'] === '1') {
              this.statusCode = 'SUBMITTED';
          }else{
              this.statusCode = 'APPROVED';
          }
      });        
      this.subscription = this.toolBarService.notifyObservable$.subscribe((res) => {
          if (res.module === this.moduleName) {
            this.mapActions(res.option);
            console.log(res.option);
          }
      });
  }
  
  ngAfterViewInit() {
      this.getAllHoliday(); 
      this.toolBarService.notfyToolBar({module: this.moduleName});
      this.refresh.next();
  }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
  
  getAllHoliday(){      
      this.holidayService.getHolidaysByStatus(this.statusCode).subscribe(result => {                
          this.calendarData = result.data;       
          console.log('Holiday table =>'+JSON.stringify(result));
          this.mapEvents();          
          this.disableRecord = result.disableRecord;
          this.hideApproveReject = result.hideApprove;
          if(result.messages) {
              this.infoMsg = result.messages[0];
          }
          this.updateToolBarBehavior();        
      });
  }
  
  updateToolBarBehavior(): void {
      this.toolBarService.setToolBarBehavior({disable:this.disableRecord});
  }
  
  mapEvents() {
    this.events = [];
    let i: number = 0;
    for (let holidays of this.calendarData){
        let obj: CalendarEvent = {
            'id': holidays.id,
            'start': new Date(holidays.startDt),
            'end': new Date(holidays.endDt),
            'title': holidays.title,
            'color': this.colors.yellow,
            'actions': this.actions
        }
        this.events.push(obj);
        this.calendarData[i].startDt =  format(new Date(holidays.startDt),'YYYY-MM-DD');
        this.calendarData[i].endDt = format(new Date(holidays.endDt),'YYYY-MM-DD');
        i++;
      }
  }
  
  clearMessages() {
      this.successMsg = null;
      this.error = null;
      this.infoMsg = null;
  }
  
  private mapActions(action: string): void {
      switch(action) {
      case 'save':
          this.clearMessages();
          this.holidayService.createHoliday(this.calendarData).subscribe(
                  result => {
                      if(result) {
                          this.successMsg = "Holiday creation was successful. Awaiting for Approval.";
                      }}, err => {
                          this.error = err;
                      });
          break;       
      case 'add':
          this.mappedEvent = {};
          this.modalAction = action;
          this.showModal.nativeElement.click();
          break
      }
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart; 
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }
  
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalAction = action;
    this.showModal.nativeElement.click();
    this.mappedEvent = this.mapEventsToModal(event);
    
  }
  
  mapEventsToModal(event: CalendarEvent): any {
      for (let i=0; i < this.calendarData.length; i++){
          if (this.calendarData[i].id === event.id){
              this.isSingleEvent = this.calendarData[i].startDt === this.calendarData[i].endDt;
              return this.calendarData[i];              
          }
      }
  }
  
  onUpdateRequest(stat: string): void {
      this.clearMessages();
      this.statusCode = 'APPROVED';
      this.getAllHoliday();
      this.holidayService.updateHolidayStatus(stat).subscribe(
          result => {
            if(result) {
                this.successMsg = "Update request for Holiday table successfully "+stat;

            }}, err => {
                this.error = err;
      });
  }

  onUpdateEvent(): void {
      this.mapEvents();
  }
  

  onAddEvent(): void {
      this.calendarData.push(this.mappedEvent);
      this.mapEvents();
      console.log(JSON.stringify(this.calendarData));    
  }
  
   
  formatDates(dt: string): Date {
      if (dt != null) {
          dt = dt.substring(0,10);
      }     
      return new Date(dt);
  }

}
