export interface Componente {
  actioncode?: any;
  prompt3d?: any;
  name?: string;
  action?: string;
  three?: any;
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
  component?: Componente;
  property: any;
  type: string;
  title: string;
  description?: string;
  options: string[];
  imageprompt?: string;
  svgprompt?: string;
}