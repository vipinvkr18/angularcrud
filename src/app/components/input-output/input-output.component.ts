import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.css']
})
export class InputOutputComponent implements OnInit {
  @Input("name") name:string;
  @Output("showMessage") showMessage = new EventEmitter();
  myForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }
 
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: [null,[Validators.required]]
    })
  }
  submit(form){
    if(form.valid){
      this.showMessage.emit(`Hi ${form.get("name").value}`)
    }  
  }
}
