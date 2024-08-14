import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@ollieestudio/fire-lib';
import { Usuario } from 'src/app/services/interfaces/usuario';
import { GameDataService } from '../services/gamedata.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { Jogo } from 'src/app/services/interfaces/jogo';

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
  welcomeMessage: any;

  constructor(private auth:AuthService<Usuario>, private gemini:GoogleGeminiAIService, private gameservice:GameDataService){
    const sub = this.auth.stateObservable.subscribe(user=>{
      console.log(user);
      this.user = user;
      sub.unsubscribe();
      this.getProjects();
      this.getWelcomeMessage();
    })
  }

  getProjects() {
    this.gameservice.listProjects(this.user.uid).subscribe(data=>{
      console.log(data);
      this.games = data;
    })
  }

  getProject(id:string){
    this.gameservice.getGame(id).subscribe(data=>{
      this.gameservice.game = data.data();
      this.gameservice.router.navigateByUrl('/creator/sobre')
    })
  }

  deleteProject(id:string){
    this.gameservice.deleteProject(id);
    this.gameservice.router.navigateByUrl('/creator/sobre')
  }

  newProject(){
    this.gameservice.game = {} as Jogo;
    this.gameservice.router.navigateByUrl('/creator/sobre')
  }

  async getWelcomeMessage(){
    this.welcomeMessage = await this.gemini.improveText('criar uma frase de boas vindas criativa e engraçada, perguntando em que projeto vamos trabalhar hoje', ' generate a creative and fun phrase of maximum 10 words' )
  }


}
