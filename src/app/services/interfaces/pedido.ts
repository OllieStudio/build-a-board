import { Usuario } from "./usuario";
import { Jogo } from "./jogo";
import { Pagamento } from "./pagamento";

export interface Pedido {
    usuario:Usuario;
    jogo:Jogo;
    pagamento:Pagamento;
    status:string;
    datacriacao:number;
    tipo:string;
}
