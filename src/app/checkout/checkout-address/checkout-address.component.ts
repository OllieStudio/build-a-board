import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from 'src/app/shared/address-form/address-form.component';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent {

  constructor(private gameservice:GameDataService, private router:Router){
    
  }
  
  calculoFrete(address:any){
    this.gameservice.game.adress = address;
    this.gameservice.addDataToGame(this.gameservice.game)
  }

  next(){
    this.router.navigate(['/creator/checkout/final']);
  }
}
