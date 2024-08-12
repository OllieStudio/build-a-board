import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from '@brunoc/ngx-viacep';
import { InputBase, FormService, CepService } from '@ollieestudio/fire-lib';

@Component({
  selector: 'app-address-form',
  standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   styleUrls: ['./address-form.component.css'],
  template: `
   <div class="col s12 m4 input-field" [hidden]="address">
      <input id="cepbusca" #cepbusca type="text"  class="validate browser-default bordered"
        (keyup)="cep.cepKeyUp($event)" />
      <label for="cepbusca" class="active">Informe o CEP</label>
  </div>

<form id="formAddress" name="formAddress" [formGroup]="formAddress" [hidden]="!address">
  <div class="row">
    <div class="col s12 input-field">
      <input id="responsavel" type="text" class="validate browser-default" [minlength]="4" [formControlName]="'responsavel'" />
      <label for="responsavel" class="active">Responsável</label>
    </div>
  </div>

  <div class="row ">
      <div class="col m10 s12 input-field">
        <input id="ender" type="text" class="validate browser-default" [formControlName]="'logradouro'" />
        <label for="ender" class="active">Endereço</label>
      </div>
      <div class="col m2 s6 input-field">
        <input id="num" type="text" class="validate browser-default" [formControlName]="'numero'"
         />
        <label for="num" class="active">Nº</label>
      </div>
      <div class="col m6 s6 input-field">
        <input id="complemento" type="text" class="validate browser-default" [formControlName]="'complemento'" />
        <label for="complemento" class="active">complemento</label>
      </div>
  </div>

  <div class="row">
    <div class="col s12 m6 input-field">
      <input id="cep" type="text" class="validate browser-default"
        [formControlName]="'cep'" />
      <label for="cep" class="active">CEP</label>
    </div>
    <div class="col s12 m6 input-field">
        <input id="bairro" type="text" class="validate browser-default" [formControlName]="'bairro'" />
        <label for="bairro" class="active">bairro</label>
    </div>
  </div>

  <div class="row">
      <div class="col s8 m6 input-field">
        <input id="cidade" type="text" class="validate browser-default" [formControlName]="'localidade'" />
        <label for="cidade" class="active">cidade</label>
      </div>
      <div class="col s4 m6 input-field">
        <input id="uf" type="text" class="validate browser-default" [formControlName]="'uf'" />
        <label for="uf" class="active">uf</label>
      </div>
  </div>
</form>
  `,
})
export class AddressFormComponent {
  @Output() addresChange:EventEmitter<Endereco> = new EventEmitter();
  address: any; 

 
private fields:InputBase[] = [
  {key:"responsavel", required:true},
  {key:"logradouro", required:true},
  {key:"numero", required:true},
  {key:"complemento", required:false},
  {key:"bairro", required:true},
  {key:"cep", required:true},
  {key:"localidade", required:true},
  {key:"uf", required:true},
  {key:"pais", required:false}
]

public formAddress: FormGroup;

constructor(public forms:FormService, public cep:CepService) {
  this.formAddress = this.forms.toFormGroup(this.fields);
  this.formAddress.controls['responsavel'].setValidators([Validators.required, this.noSpacesValidator]);
 }

ngOnInit() {
  this.cep.cepEmitter.subscribe(endereco => {
    this.address = endereco as unknown as Endereco;
    this.formAddress.patchValue(endereco);
  });
}

reset(){
  let input:any = document.getElementById('cepbusca') as HTMLElement;
  input['value'] = '';
  this.address = null;
  this.formAddress.reset();
}

filterNumeric(value: string): string {
  return value.replace(/[^0-9]/g, '');
}

 // Custom validator function to disallow only spaces
  noSpacesValidator(control: FormControl): { [key: string]: any } | null {
    if (control.value.trim() === '') {
      return { 'noSpaces': true }; // Error message key and value
    }
    return null;
  }
}