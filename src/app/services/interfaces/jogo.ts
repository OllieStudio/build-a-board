import { Componente } from "./componente";

export interface Jogo {
  adress: any;
  user: string;
  datacriacao: number;
  uploads: any;
  complexidade: number;
  estrategia: number;
  idade: string;
  jogadores: string;
  montagem: string;
  partida: string;
  sinopse: string;
  skills: string[];
  sorte: number;
  subtitulo: string;
  tipo: string;
  titulo: string;
  objetivo:string;
  preparacao:string;
  regras:string;
  durante:string;
  vencedor:string;
  conclusao:string;
  componentes:Componente[];
  id:string;
  usuario:string;
  valor:number;
  logo:string;
  header:string;
  bg:string;
}
