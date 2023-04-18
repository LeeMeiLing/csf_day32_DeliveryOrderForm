import { Component } from '@angular/core';
import { DeliveryOrder } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'day32';

  orderList: DeliveryOrder[] = []

  processOrder(d : DeliveryOrder){
    this.orderList.unshift(d) // add order to the front
  }

}
