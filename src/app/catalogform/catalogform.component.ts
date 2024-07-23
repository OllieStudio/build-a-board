import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase, FormService, DatabaseService } from '@ollieestudio/fire-lib';
import { Jogo } from '../services/interfaces/jogo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogform',
  templateUrl: './catalogform.component.html',
  styleUrls: ['./catalogform.component.css']
})
export class CatalogformComponent implements OnInit {

  catalogFormGroup: FormGroup;

  private fields:InputBase[] = [
    {key:"categoria", required:true},
    {key:"tema", required:true},
    {key:"nome", required:true},
    {key:"valor", required:true},
    {key:"codigo", required:true},
    {key:"tamanho", required:true},
    {key:"imagem", required:true},
    {key:"customize", required:true}
  ]
  constructor(public forms:FormService, public database:DatabaseService<Jogo>, public router:Router) {
    this.catalogFormGroup = this.forms.toFormGroup(this.fields);
   }

  ngOnInit(): void {
    console.log("init")
  }

  registerForm(){
    let comp = this.catalogFormGroup.getRawValue();
    comp.id =comp.codigo;
    this.database.set(comp, 'COMPONENTES').then(result =>{
      this.catalogFormGroup.reset()
    })

  }
}
