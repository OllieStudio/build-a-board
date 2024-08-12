import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatorComponent } from './creator/creator.component';
import { JogoComponent } from './creator/gameform/jogo/jogo.component';
import { RegrasComponent } from './creator/gameform/regras/regras.component';
import { ComponentesComponent } from './creator/gameform/componentes/componentes.component';
import { DesignComponent } from './creator/gameform/design/design.component';
import { JogoDadosComponent } from './creator/gameform/jogo/jogo-dados/jogo-dados.component';
import { JogoPartidaComponent } from './creator/gameform/jogo/jogo-players/jogo-partida.component';
import { JogoDificuldadeComponent } from './creator/gameform/jogo/jogo-dificuldade/jogo-dificuldade.component';
import { JogoTipoComponent } from './creator/gameform/jogo/jogo-tipo/jogo-tipo.component';
import { JogoPreviewComponent } from './creator/gameform/jogo/jogo-preview/jogo-preview.component';
import { JogoTemaComponent } from './creator/gameform/jogo/jogo-tema/jogo-tema.component';
import { RegrasObjetivoComponent } from './creator/gameform/regras/regras-objetivo/regras-objetivo.component';
import { RegrasPrepComponent } from './creator/gameform/regras/regras-prep/regras-prep.component';
import { RegrasBasicoComponent } from './creator/gameform/regras/regras-basico/regras-basico.component';
import { RegrasPartidaComponent } from './creator/gameform/regras/regras-partida/regras-partida.component';
import { RegrasConclusaoComponent } from './creator/gameform/regras/regras-conclusao/regras-conclusao.component';
import { RegrasPreviewComponent } from './creator/gameform/regras/regras-preview/regras-preview.component';
import { ComponentsComponent } from './creator/gameform/design/components/components.component';
import { CreateComponent } from './creator/gameform/design/create/create.component';
import { ElementsComponent } from './creator/gameform/design/elements/elements.component';
import { TextComponent } from './creator/gameform/design/text/text.component';
import { UploadsComponent } from './creator/gameform/design/uploads/uploads.component';
import { TestingComponent } from './testing/testing.component';
import { LoginComponent } from './login/login.component';
import { LoginButtonsComponent } from './login/login-buttons/login-buttons.component';
import { LoginEmailComponent } from './login/login-email/login-email.component';
import { HomeCreatorComponent } from './creator/home-creator/home-creator.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:HomeComponent},
  {path:'creator', component:CreatorComponent, children:[
    { path: '', component:HomeCreatorComponent},
    { path: 'sobre', component:JogoComponent, children:[
      { path: '', redirectTo: 'tipo', pathMatch: 'full' },
      { path: 'tipo', component:JogoTipoComponent },
      { path: 'dados', component:JogoDadosComponent },
      { path: 'tema', component:JogoTemaComponent },
      { path: 'partida', component:JogoPartidaComponent },
      { path: 'dificuldade', component:JogoDificuldadeComponent },
      { path: 'resumo', component:JogoPreviewComponent },
  ] },
  { path: 'regras', component:RegrasComponent,children:[
    { path: '', redirectTo: 'objetivo', pathMatch: 'full' },
    { path: 'objetivo', component:RegrasObjetivoComponent },
    { path: 'prepara', component:RegrasPrepComponent },
    { path: 'basico', component:RegrasBasicoComponent },
    { path: 'partida', component:RegrasPartidaComponent },
    { path: 'vencedor', component:RegrasConclusaoComponent },
    { path: 'resumo', component:RegrasPreviewComponent },
  ]  },
{ path: 'design', component:DesignComponent, children:[
    { path: 'components', component:ComponentsComponent,   },
    { path: 'uploads', component:UploadsComponent,  },
    { path: 'elements', component:ElementsComponent,   },
    { path: 'text', component:TextComponent,  },
    { path: 'create', component:CreateComponent,  },
] },
{ path: 'testing', component:TestingComponent },
    ]},
  {
    path: 'login', component:LoginComponent, children:[
      { path: '',  component:LoginButtonsComponent },
      { path: 'email', component:LoginEmailComponent },
    ] },
  {
    path: 'contato',
    loadChildren: () => import('./contato/contato.module').then(m => m.ContatoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
