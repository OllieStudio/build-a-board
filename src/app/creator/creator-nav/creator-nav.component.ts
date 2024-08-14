import { Component } from '@angular/core';
import { GameDataService } from '../services/gamedata.service';
import { AuthService } from '@ollieestudio/fire-lib';
import { Usuario } from 'src/app/services/interfaces/usuario';

@Component({
  selector: 'app-creator-nav',
  templateUrl: './creator-nav.component.html',
  styleUrls: ['./creator-nav.component.css']
})
export class CreatorNavComponent {
  constructor(public gameservice:GameDataService, private auth:AuthService<Usuario>) { }

  logout(){
    this.auth.logOut();
    this.gameservice.router.navigateByUrl('/home');
    this.gameservice.game = null;
  }

}
