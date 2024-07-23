import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})

export class DestaquesComponent {
@Input() destaques:any[];

}
