import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService, MaterializeService } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';
import { GoogleGeminiAIService } from 'src/app/services/google-gemini-ai.service';
import { ArtStyle, AspectRatio, VertexAIService } from 'src/app/services/google-vertex-ai.service';
import { FileuploadComponent } from 'src/app/creator/shared/fileupload/fileupload.component';
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from 'src/app/services/interfaces/upload';

@Component({
  selector: 'app-jogo-tema',
  templateUrl: './jogo-tema.component.html',
  styleUrls: ['./jogo-tema.component.css']
})
export class JogoTemaComponent {
  @ViewChild('logoControl') logoControl:FileuploadComponent;
  @ViewChild('headerControl') headerControl:FileuploadComponent;
  @ViewChild('bgControl') bgControl:FileuploadComponent;
  
  public jogoFormGroup: FormGroup;

  public hideSpinnerLogo:boolean = true;
  public hideSpinnerHeader:boolean = true;
  public hideSpinnerBg:boolean = true;
  pathlogo:String;
  pathheader:String;
  pathbg:String;

  private fields:InputBase[] = [
    {key:"logo", required:true},
    {key:"header", required:true},
    {key:"background", required:false},
  ]

  logoStyle: string;
  headerStyle: string;
  bgStyle: string;
  
  constructor(private vertex:VertexAIService, private uploads:UploadService, public gamedataservice:GameDataService, private forms:FormService, private material:MaterializeService) {
    this.jogoFormGroup = this.forms.toFormGroup(this.fields);
    
  }

  ngOnInit(): void {
    this.jogoFormGroup.patchValue(this.gamedataservice.game);
    this.material.delay(1000)
    this.material.updateTextFields();
  }
  
  async registerForm(){
    
    this.pathlogo = `game/${this.gamedataservice.game.titulo}/imgs/logo_`
    this.pathheader = `game/${this.gamedataservice.game.titulo}/imgs/header_`
    this.pathbg = `game/${this.gamedataservice.game.titulo}/imgs/bg_`

    if(this.jogoFormGroup.getRawValue().logo?.includes('data:image')){
      await this.logoControl.uploadImg(this.jogoFormGroup.getRawValue().logo, 'logo.png');
      this.addUploads('logo');
    } 
    if(this.jogoFormGroup.getRawValue().header?.includes('data:image')){
      await this.headerControl.uploadImg(this.jogoFormGroup.getRawValue().header, 'header.png');
      this.addUploads('header');
    } 
    if(this.jogoFormGroup.getRawValue().background?.includes('data:image')){
      await this.bgControl.uploadImg(this.jogoFormGroup.getRawValue().background, 'bg.png');
      this.addUploads('background');
    }

    this.gamedataservice.addDataToGame(this.jogoFormGroup.getRawValue());
  }

  async generateLogo(prompt){
    //const logo = await this.aiservice.textToSVG(prompt, '300x300px logo');
    const logo = await this.vertex.generateImage('a clipart style logo with transparent background and ' + prompt, AspectRatio.Square, this.logoStyle);
    this.hideSpinnerLogo = true;
    this.jogoFormGroup.patchValue({logo:logo})
    
  }

  async generateHeader(prompt){
    const header = await this.vertex.generateImage('a header with ' + prompt, AspectRatio.Landscape, this.headerStyle);
    this.hideSpinnerHeader = true;
    this.jogoFormGroup.patchValue({header:header})
  }

  async generateBg(prompt){
    const bg = await this.vertex.generateImage('a background image with ' + prompt, AspectRatio.Square, this.bgStyle);
    this.hideSpinnerBg = true;
    this.jogoFormGroup.patchValue({background:bg});
  }

  addUploads(item:string){
    let upload:Upload = {
      tipo: item,
      url: this.jogoFormGroup.getRawValue()[item],
      timestamp: new Date().getTime(),
      name: item,
      alt: '',
      description: '',
      component: ''
    }

    this.uploads.addUpload(upload);
  }

}
