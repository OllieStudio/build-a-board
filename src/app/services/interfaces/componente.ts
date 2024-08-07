export interface Componente {
  type?: any;
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
  multiple?:string;
  modifiers?: Modifier[];
}


export interface Modifier {
  multiple?: any;
  ratio?: string;
  component?: Componente;
  property: any;
  type: string;
  title: string;
  description?: string;
  options?: string[];
  imageprompt?: string;
  svgprompt?: string;
  data?:any;
}

export interface Texto{
  selectedFont: string;
  selectedSize: number;
  selectedStyle: string;
  selectedColor: string;
  content:string;
  id:string;
  top?:number;
  left?:number;
  width?:number;
  height?:number;
}