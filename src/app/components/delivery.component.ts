import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryOrder } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit{

  form!: FormGroup // for binding in html,this is similar to data-th-object
  
  @Output()
  sendForm = new Subject<DeliveryOrder>

  itemArray!: FormArray

  // fb: FormBuilder
  // constructor(fb:FormBuilder){
  //   this.fb = fb
  // }

  // include "private" or "public" means declare a variable and assign to it the value
  // when using autowired service, dont use it in constructor as the service may not be ready yet
  constructor(public fb:FormBuilder){
    this.fb = fb
  }

  ngOnInit(): void {
    // this method is called when the component is created for initialization
    this.form = this.createForm()
  }

  // this form consists of form-controls and form-array
  // every control needs to have a name
  private createForm() : FormGroup {
    this.itemArray = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]), // must have value inside .control()
      address: this.fb.control<string>('abc', [Validators.required]),
      email: this.fb.control<string>('fred@gmail.com',[Validators.required, Validators.email]),
      deliveryDate: this.fb.control<string>('',[Validators.required]),
      session: this.fb.control<string>('PM',[Validators.required]),
      insurance: this.fb.control<boolean>(false),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('no comments'),
      items:this.itemArray
    })
  }

  processDelivery(){
    // const delivery:DeliveryOrder = this.form.value
    const delivery:DeliveryOrder = this.form.value as DeliveryOrder
    console.info('>>> delivery: ', delivery)
    this.sendForm.next(delivery)
    this.form.reset()
  }

  hasError(cn: string):boolean{
    return !!(this.form.get(cn)?.invalid && this.form.get(cn)?.dirty)
  }

  isFormInvalid():boolean{
    const dd = new Date(this.form.get('deliveryDate')?.value)
    const today = new Date()
    return this.form.invalid || (dd<today)

  }

  private createOrderItem(): FormGroup{
    return this.fb.group({
      item:this.fb.control<string>('',[Validators.required]),
      quantity:this.fb.control<number>(1,[Validators.required, Validators.min(1)]),
    })
  }

  addItem(){
    const orderItem = this.createOrderItem()
    this.itemArray.push(orderItem)
  }

  deleteItem(idx:number){
    this.itemArray.removeAt(idx)
  }

}
