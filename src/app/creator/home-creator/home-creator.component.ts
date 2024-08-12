import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@ollieestudio/fire-lib';
import { Usuario } from 'src/app/services/interfaces/usuario';
import { GameDataService } from '../services/gamedata.service';

@Component({
  selector: 'app-home-creator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-creator.component.html',
  styleUrls: ['./home-creator.component.css']
})
export class HomeCreatorComponent {
  user: any;
  games: any;

  constructor(private auth:AuthService<Usuario>, private gameservice:GameDataService){
    this.auth.stateObservable.subscribe(user=>{
      console.log(user);
      this.user = user;
      this.getProjects();
    })
  }

  getProjects() {
    this.gameservice.listProjects(this.user.uid).subscribe(data=>{
      console.log(data);
      this.games = data;
    })
  }
}
