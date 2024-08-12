import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from 'src/app/shared/address-form/address-form.component';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent {

  calculoFrete(address:any){
    console.log(address);
  }
}
