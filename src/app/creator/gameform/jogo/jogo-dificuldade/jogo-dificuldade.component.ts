import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService, InputBase } from '@ollieestudio/fire-lib';
import { GameDataService } from '../../../services/gamedata.service';

@Component({
  selector: 'app-jogo-dificuldade',
  templateUrl: './jogo-dificuldade.component.html',
  styleUrls: ['./jogo-dificuldade.component.css']
})
export class JogoDificuldadeComponent implements OnInit {
  jogoFormGroup: FormGroup;
  _skills = [  { label: 'Estratégia', ctrlname: 'skill1' },  { label: 'Raciocínio', ctrlname: 'skill2' },  { label: 'Cálculo', ctrlname: 'skill3' },  { label: 'Força', ctrlname: 'skill4' },  { label: 'Velocidade', ctrlname: 'skill5' },  { label: 'Fala', ctrlname: 'skill6' },  { label: 'Leitura', ctrlname: 'skill7' },  { label: 'Percepção', ctrlname: 'skill8' },  { label: 'Dedução', ctrlname: 'skill9' },  { label: 'Desenho', ctrlname: 'skill10' },  { label: 'Coletividade', ctrlname: 'skill11' },  { label: 'Conhecimento', ctrlname: 'skill12' },  { label: 'Línguas estrangeiras', ctrlname: 'skill13' },  { label: 'Expressão corporal', ctrlname: 'skill14' }];

  private fields:InputBase[] = [
    {key:"complexidade", required:true},
    {key:"estrategia", required:true},
    {key:"sorte", required:true},
    {key:"skill1", required:false},
    {key:"skill2", required:false},
    {key:"skill3", required:false},
    {key:"skill4", required:false},
    {key:"skill5", required:false},
    {key:"skill6", required:false},
    {key:"skill7", required:false},
    {key:"skill8", required:false},
    {key:"skill9", required:false},
    {key:"skill10", required:false},
    {key:"skill11", required:false},
    {key:"skill12", required:false},
    {key:"skill13", required:false},
    {key:"skill14", required:false},
  ]
  skills: any[];
  
  constructor(public gamedataservice:GameDataService, private forms:FormService) {
    this.jogoFormGroup = this.forms.toFormGroup(this.fields);
  }

  ngOnInit(): void {
    this.jogoFormGroup.patchValue(this.gamedataservice.game);
  }

  registerForm(){
    const { complexidade, estrategia, sorte } = this.jogoFormGroup.getRawValue();
    const extractedObject = { complexidade, estrategia, sorte };

    const numSkills = this._skills.length;
    const skills = [];
    
    for (let i = 1; i <= numSkills; i++) {
      const skill = this.jogoFormGroup.getRawValue()[`skill${i}`];
        skills.push(skill);
    }

    this.gamedataservice.addDataToGame({...extractedObject, skills: skills});
  }
}
