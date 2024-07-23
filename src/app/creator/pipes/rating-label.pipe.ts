import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingLabel'
})
export class RatingLabelPipe implements PipeTransform {
  ratings = [
    { value: 5, title: 'Muitíssimo' },
    { value: 4.5, title: 'Muito' },
    { value: 4, title: 'Quase Muito' },
    { value: 3.5, title: 'Médio Alto' },
    { value: 3, title: 'Médio' },
    { value: 2.5, title: 'Médio baixo' },
    { value: 2, title: 'Pouco' },
    { value: 1.5, title: 'Muito Pouco' },
    { value: 1, title: 'Quase Nada' },
    { value: 0.5, title: 'Nada' }
  ];

  transform(value: any, ...args: unknown[]): unknown {
    return this.ratings.filter(r =>{ return r.value === parseInt(value)})[0].title;
  }

}
