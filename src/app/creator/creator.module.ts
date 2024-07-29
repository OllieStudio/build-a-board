import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreatorComponent } from './creator.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ComponentesComponent } from './gameform/componentes/componentes.component';
import { ItemdisplayComponent } from './gameform/componentes/itemdisplay/itemdisplay.component';
import { DesignComponent } from './gameform/design/design.component';
import { FinishComponent } from './gameform/finish/finish.component';
import { JogoComponent } from './gameform/jogo/jogo.component';
import { RegrasComponent } from './gameform/regras/regras.component';
import { BannerComponent } from './ui/banner/banner.component';
import { ComponentlistComponent } from './ui/componentlist/componentlist.component';
import { ListitemComponent } from './ui/listitem/listitem.component';
import { NumericstepperComponent } from './ui/numericstepper/numericstepper.component';
import { RadioimageComponent } from './ui/radioimage/radioimage.component';
import { RangeComponent } from './ui/range/range.component';
import { RatingComponent } from './ui/rating/rating.component';
import { SwitchComponent } from './ui/switch/switch.component';
import { NgxWigModule } from 'ngx-wig';
import { NgPipesModule } from 'ng-pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService, FormService, DatabaseService, AngularFirestoreModule } from '@ollieestudio/fire-lib';
import { AppRoutingModule } from '../app-routing.module';
import { CreatorNavComponent } from './creator-nav/creator-nav.component';
import { JogoNavComponent } from './gameform/jogo/jogo-nav/jogo-nav.component';
import { JogoDadosComponent } from './gameform/jogo/jogo-dados/jogo-dados.component';
import { JogoPartidaComponent } from './gameform/jogo/jogo-players/jogo-partida.component';
import { JogoDificuldadeComponent } from './gameform/jogo/jogo-dificuldade/jogo-dificuldade.component';
import { JogoPreviewComponent } from './gameform/jogo/jogo-preview/jogo-preview.component';
import { JogoTipoComponent } from './gameform/jogo/jogo-tipo/jogo-tipo.component';
import { JogoTemaComponent } from './gameform/jogo/jogo-tema/jogo-tema.component';
import { StepperModule } from './shared/stepper/stepper.module';
import { FileuploadModule } from './shared/fileupload/fileupload.module';
import { RatingLabelPipe } from './pipes/rating-label.pipe';
import { RangeLabelPipe } from './pipes/range-label.pipe';
import { RegrasObjetivoComponent } from './gameform/regras/regras-objetivo/regras-objetivo.component';
import { RegrasPrepComponent } from './gameform/regras/regras-prep/regras-prep.component';
import { RegrasBasicoComponent } from './gameform/regras/regras-basico/regras-basico.component';
import { RegrasPartidaComponent } from './gameform/regras/regras-partida/regras-partida.component';
import { RegrasConclusaoComponent } from './gameform/regras/regras-conclusao/regras-conclusao.component';
import { RegrasNavComponent } from './gameform/regras/regras-nav/regras-nav.component';
import { RegrasPreviewComponent } from './gameform/regras/regras-preview/regras-preview.component';
import { CanvasComponent } from './gameform/design/canvas/canvas.component';
import { DrawerComponent } from './gameform/design/drawer/drawer.component';
import { MenuComponent } from './gameform/design/menu/menu.component';
import { ToolboxModule } from './shared/toolbox/toolbox.module';
import { ComponentsComponent } from './gameform/design/components/components.component';
import { SearchbarComponent } from './shared/searchbar/searchbar.component';
import { ZoomComponent } from './ui/zoom/zoom.component';
import { HistoryService } from './services/history.service';
import { ModifiersPanelComponent } from './gameform/design/modifiers/modifiers-panel/modifiers-panel.component';
import { UploadsComponent } from './gameform/design/uploads/uploads.component';



@NgModule({
  declarations: [
    CreatorComponent,
    BannerComponent,
    JogoComponent,
    ComponentesComponent,
    RegrasComponent,
    DesignComponent,
    FinishComponent,
    RangeComponent,
    RadioimageComponent,
    ListitemComponent,
    SwitchComponent,
    RatingComponent,
    ComponentlistComponent,
    ItemdisplayComponent,
    NumericstepperComponent,
    CreatorNavComponent,
    JogoNavComponent,
    JogoDadosComponent,
    JogoPartidaComponent,
    JogoDificuldadeComponent,
    JogoPreviewComponent,
    JogoTipoComponent,
    JogoTemaComponent,
    RatingLabelPipe,
    RangeLabelPipe,
    RegrasObjetivoComponent,
    RegrasPrepComponent,
    RegrasBasicoComponent,
    RegrasPartidaComponent,
    RegrasConclusaoComponent,
    RegrasNavComponent,
    RegrasPreviewComponent,
    CanvasComponent,
    DrawerComponent,
    MenuComponent,
    ComponentsComponent,
    SearchbarComponent,
    ZoomComponent,
    
  ],
  exports:[
    CreatorComponent
  ],
  entryComponents: [CreatorComponent],
  imports: [
    CommonModule,
    NgxWigModule,
    NgPipesModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StepperModule,
    FileuploadModule,
    ToolboxModule,
    FormsModule,
    DragDropModule,
    ModifiersPanelComponent,
    UploadsComponent
  ],
  providers:  [ AuthService, FormService, DatabaseService, HistoryService,
    HttpClient,  DatePipe, AngularFirestoreModule],
})
export class CreatorModule { }
