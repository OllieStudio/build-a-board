export interface Componente {
  action?: string;
  quantidade?: number;
  imagem?: any;
  categoria?: string;
  id:string;
  template:string;
  classname:string;
  icon:string;
  title:string;
  modifiers?: Modifier[];
}


export interface Modifier {
  type: string;
  title: string;
  description?: string;
  options: string[];
  'image-prompt'?: string;
  'svg-prompt'?: string;
}