import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDataService } from 'src/app/creator/services/gamedata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.css']
})
export class CheckoutProductsComponent {
  products: any[];
  total: number;

  constructor(private gameservice:GameDataService, private router:Router){
    this.gameservice.getComponents().subscribe((data)=>{
      this.products = data.filter(item => item.price);
      this.total = this.products.reduce((acc, item) => acc + parseFloat(item.price)*(item.ammont || 1), 0);
    })
  }

  next(){
    this.router.navigate(['/creator/checkout/address']);
  }
}
