import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public homeSection:any = 
    {
      type:"iconsection",
      title:"Recursos",
      background:"",
      blocks:[{
        icon:"view_in_ar",
        title:"Ferramentas de edição intuitivas",
        text:"Personalize todos os aspectos do seu jogo com nossas ferramentas fáceis de usar."
      },
      {
        icon:"extension",
        title:"Ferramentas de teste",
        text:"Teste seu jogo com nossas ferramentas de teste integradas para garantir que ele seja divertido e equilibrado."
      },
      {
        icon:"print",
        title:"Impressão sob demanda",
        text:"Encomende uma cópia física do seu jogo por meio do nosso serviço de impressão sob demanda ou baixe-o como PDF."
      },
      {
        icon:"groups",
        title:"Design colaborativo",
        text:"Convide outras pessoas para colaborar no design do seu jogo e trabalhe juntos para criar o jogo perfeito."
      },
      {
        icon:"bubble_chart",
        title:"Comunidade",
        text:"Conecte-se com outros designers de jogos em nossa comunidade e compartilhe suas ideias, receba feedback e aprenda com os outros."
      },
      {
        icon:"storefront",
        title:"Venda seu jogo",
        text:"Coloque seu jogo à venda em nossa plataforma de e-commerce integrada e alcance um público maior."
      }
    ]
    }
  
public homeBanners:any[] = [
  {
    "titulo": "Crie jogos personalizados com BuildABoard",
    "imagem": 'assets/img/banner1.gif'
  },
  {
    "titulo": "Inscreva-se para ter acesso às ferramentas de design",
    "imagem": 'assets/img/banner3.png'
  },
  {
    "titulo": "Escolha o tipo de jogo que deseja criar",
    "imagem": 'assets/img/banner2.png'
  },
  {
    "titulo": "Personalize cada aspecto do seu jogo com nossas ferramentas intuitivas de edição",
    "imagem": 'assets/img/banner4.png'
  },
   {
    "titulo": "Teste seu jogo com nossas ferramentas integradas",
    "imagem": 'assets/img/banner5.png'
  },
  {
    "titulo": "Baixe seu jogo em PDF, imprima, recorte e jogue...",
    "imagem": 'assets/img/banner6.png'
  },
  {
    "titulo": "...ou encomende uma cópia física com nossa impressão sob demanda!",
    "imagem": 'assets/img/banner7.png'
  },
  {
    "titulo": "Divulgue e venda seu jogo online!",
    "imagem": 'assets/img/banner8.png'
  }
];

public homeDestaques:any[] = [
  {
      "title": "Fantasy Quest",
      "description": "Embarque em uma jornada épica através de terras encantadas, lute contra monstros temíveis e colete tesouros valiosos. Um jogo de RPG de fantasia para 2-6 jogadores.",
      "type": "rpg",
      "image": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/fantasy-quest-daniel-eskridge.jpg",
      "number_of_players": "2-6",
      "user": "jose"
  },
  {
      "title": "Reino da Magia",
      "description": "Um jogo de tabuleiro para toda a família. Descubra os segredos do reino da magia e se torne o feiticeiro mais poderoso!",
      "type": "jogo_de_tabuleiro",
      "number_of_players": "2-6",
      "image": "https://uploads.spiritfanfiction.com/historias/capas/201311/fanfiction-historias-originais-reino-magico-de-rasen--a-primeiro-visita-1330135,211120132340.png",
      "user": "jose"
  },
   {
      "title": "Duelo de Cartas",
      "description": "Desafie seus amigos em um emocionante duelo de cartas. Escolha seus personagens e lute até a vitória!",
      "type": "jogo_de_cartas",
      "number_of_players": "2-6",
      "image": "https://covildosjogos.com.br/wp-content/uploads/2021/03/western-legend-heading-1.jpg",
      "user": "ana"
  },
   {
      "title": "Zoo Memory",
      "description": "Um jogo de memória para crianças de todas as idades. Divirta-se descobrindo os animais do zoológico!",
      "type": "jogo_de_memoria",
      "number_of_players": "2-6",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvSA-Hau8GncCn_RkxNXO1BK4iv84gMrPOsQ&usqp=CAU",
      "user": "maria"
  } ,
  {
      "title": "Terra dos Dragões",
      "description": "Um RPG épico em um mundo de fantasia. Crie seu personagem, lute contra monstros e salve a terra dos dragões!",
      "type": "rpg",
      "number_of_players": "4-8",
      "image": "https://dialogosassessoria.files.wordpress.com/2015/09/dragc3a3oazul.png",
      "user": "pedro"
  },
   {
      "title": "Super Trunfo Animal",
      "description": "Um jogo de cartas divertido para toda a família. Escolha seu animal favorito e vença seus oponentes!",
      "type": "super_trunfo",
      "number_of_players": "2-6",
      "image": "https://play-lh.googleusercontent.com/DyV5k7Sh5Je4iBk3gM1MlEX2CbwTbKNo2OjHckfW0Ac1PJ95FOo6dhpXMg5lBvlzsw=w526-h296-rw",
      "user": "lucas"
  },
  {
      "title": "Cidades Brasileiras",
      "description": "Um jogo de tabuleiro onde os jogadores competem para visitar o maior número possível de cidades brasileiras famosas. ",
      "type": "board_game",
      "number_of_players": "2-6",
      "image": "https://thumbs.dreamstime.com/z/bandeira-brasileira-da-aquarela-nacional-do-vetor-o-fundo-no-brasileiro-colore-conceito-119571891.jpg",
      "user_name": "Maria Silva"
  },
  {
 "title": "As 10 da Kiss",
 "description": "Prove seus conhecimento de Rock neste jogo de tabuleiro baseado no programa 'As 10 da Kiss', mostre que você não deixa o Rock sair de você ou tome um 'ERROÔ!!'",
 "type": "card_game",
 "number_of_players": "2-4",
 "image": "assets/img/10dakiss.png",
 "user_name": "Lucas Santos"
  }


]
  
     

     


  constructor() { }
}
