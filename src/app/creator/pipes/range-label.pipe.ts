import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeLabel'
})
export class RangeLabelPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let valueFrom:string = value.split('-')[0];
    let valueTo:string = value.split('-')[1];
    let result:string = "";

    if(parseInt(valueTo) === 0 || parseInt(valueTo) <= parseInt(valueFrom) ){
      result = `A partir de ${valueFrom}`
    }else{
      if(parseInt(valueFrom) === 0){
        result = `Até ${valueTo}`
      }else{
        result = `De ${valueFrom} a ${valueTo}`
      }
    }

    return `${result}  ${args[0]}`;
  }

}
