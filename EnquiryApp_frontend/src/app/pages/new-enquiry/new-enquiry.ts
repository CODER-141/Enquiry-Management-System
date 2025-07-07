import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../service/master';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-new-enquiry',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './new-enquiry.html',
  styleUrl: './new-enquiry.css'
})
export class NewEnquiry {
  
  newEnquiryObj:any ={
    enquiryId:0,
    enquiryTypeId:0,
    enquiryStatusId:0,
    customerName:'',
    mobileNo:'',
    email:'',
    message:'',
    createdDate:new Date(),
    resolution:''
  };
  masterSrv = inject(Master);

  typeList:Observable<any> =new Observable<any>();
  statusList:Observable<any> =new Observable<any>();

  constructor(){
    this.typeList = this.masterSrv.getTypes();
    this.statusList =this.masterSrv.getStatus();
  }

  onsave(){
    debugger;
    this.masterSrv.createEnquiry(this.newEnquiryObj).subscribe((res:any)=>{
      debugger;
    },error=>{
      debugger;
    })
  }
}

