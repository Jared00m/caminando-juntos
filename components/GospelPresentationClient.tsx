'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

type Locale = 'es' | 'pt'

type ScreenId =
  | 'intro'
  | 'creation'
  | 'rebellion'
  | 'darkness'
  | 'rescue'
  | 'response'
  | 'restoration'
  | 'decision'

type Block =
  | { type: 'p'; text: string }
  | { type: 'verse'; ref: string; paraphrase: string; label?: string }
  | { type: 'list'; items: string[] }
  | { type: 'question'; text: string }
  | { type: 'hr' }

type ScreenContent = {
  id: ScreenId
  title: string
  subtitle?: string
  ctaLabel?: string
  image?: {
    src: string
    alt: string
  }
  audio?: string
  blocks: Block[]
}

type Copy = {
  screens: ScreenContent[]
  nav: {
    back: string
    next: string
    start: string
    restart: string
    stepLabel: (current: number, total: number) => string
  }
  decision: {
    prayerHeading: string
    prayerText: string[]
    formHeading: string
    formDescription: string
    nameLabel: string
    emailLabel: string
    submit: string
    privacy: string
    submittedTitle: string
    submittedBody: string
  }
  imagePlaceholder: string
}

function getCopy(locale: Locale): Copy {
  const es: Copy = {
    imagePlaceholder: 'Imagen (próximamente)',
    nav: {
      back: 'Atrás',
      next: 'Siguiente',
      start: 'Comenzar la historia',
      restart: 'Reiniciar',
      stepLabel: (current, total) => `Parte ${current} de ${total}`,
    },
    screens: [
      {
        id: 'intro',
        title: '¿Qué es el evangelio?',
        image: {
          src: '/gospel-presentation/intro.jpg',
          alt: 'Introducción al evangelio',
        },
        ctaLabel: 'Comenzar la historia',
        audio: '/gospel-presentation/intro_audio_es.mp3',
        blocks: [
          { type: 'p', text: 'La palabra “evangelio” significa “buenas noticias”.' },
          {
            type: 'p',
            text: 'En la Biblia, el evangelio no es una lista de reglas religiosas, sino el anuncio de lo que Dios ha hecho para rescatar al mundo.',
          },
          { type: 'p', text: 'Cuando Jesús habló del evangelio, lo describió así:' },
          {
            type: 'verse',
            ref: 'Marcos 1:15',
            label: 'NBLA',
            paraphrase:
              'El tiempo se ha cumplido», decía, «y el reino de Dios se ha acercado; arrepiéntanse y crean en el evangelio',
          },
          {
            type: 'p',
            text: 'En el corazón del evangelio hay una historia verdadera: un Rey, su reino y su misión de rescate.',
          },
        ],
      },
      {
        id: 'creation',
        title: 'El buen Rey y su propósito',
        image: {
            src: '/gospel-presentation/creation.jpg',
            alt: 'La creación del mundo',
        },
        audio: '/gospel-presentation/creation_audio_es.mp3',
        subtitle: 'Creación',
        blocks: [
          { type: 'p', text: 'Al principio, Dios creó todas las cosas.' },
          {
            type: 'verse',
            ref: 'Génesis 1:1',
            label: 'NBLA',
            paraphrase: 'En el principio Dios creó los cielos y la tierra.',
          },
          { type: 'p', text: 'Dios no solo es Creador: también es Rey.' },
          {
            type: 'verse',
            ref: 'Salmo 24:1',
            label: 'NBLA',
            paraphrase: 'Del Señor es la tierra y todo lo que hay en ella, El mundo y los que en él habitan.',
          },
          {
            type: 'p',
            text: 'Dios creó a la humanidad a su imagen y la colocó dentro de su buen reino para reflejarlo y gobernar con responsabilidad.',
          },
          {
            type: 'verse',
            ref: 'Génesis 1:26',
            label: 'NBLA',
            paraphrase: 'Y dijo Dios: «Hagamos al hombre a Nuestra imagen, conforme a Nuestra semejanza; y ejerza dominio...sobre toda la tierra»',
          },
          {
            type: 'p',
            text: 'La vida bajo el gobierno amoroso de Dios era buena: marcada por paz, propósito y gozo.',
          },
        ],
      },
      {
        id: 'rebellion',
        title: 'Rebelión contra el Rey',
        image: {
            src: '/gospel-presentation/rebellion.jpg',
            alt: 'La caída y el pecado',
        },
        audio: '/gospel-presentation/rebellion_audio_es.mp3',
        subtitle: 'La caída y el pecado',
        blocks: [
          {
            type: 'p',
            text: 'En lugar de confiar en el Rey, la humanidad eligió la independencia: quiso decidir por sí misma lo bueno y lo malo.',
          },
          {
            type: 'verse',
            ref: 'Romanos 3:23',
            label: 'NBLA',
            paraphrase: '...por cuanto todos pecaron y no alcanzan la gloria de Dios.',
          },
          { type: 'p', text: 'Esa elección no fue solo desobediencia; fue rebelión.' },
          {
            type: 'verse',
            ref: 'Isaías 53:6',
            label: 'NBLA',
            paraphrase: 'Todos nosotros nos descarriamos como ovejas, nos apartamos cada cual por su camino;',
          },
          {
            type: 'p',
            text: 'El pecado es escoger el auto-gobierno en lugar del gobierno de Dios: quitamos a Dios del trono y nos pusimos a nosotros mismos.',
          },
        ],
      },
      {
        id: 'darkness',
        title: 'Un reino en oscuridad',
        image:{
            src: '/gospel-presentation/darkness.jpg',
            alt: 'El mundo caído'
        },
        audio: '/gospel-presentation/darkness_audio_es.mp3',
        subtitle: 'Las consecuencias de la rebelión',
        blocks: [
          { type: 'p', text: 'La rebelión contra el Rey trajo consecuencias devastadoras.' },
          {
            type: 'verse',
            ref: 'Isaías 59:2',
            label: 'NBLA',
            paraphrase: 'Pero las iniquidades de ustedes han hecho separación entre ustedes y su Dios, Y los pecados le han hecho esconder Su rostro para no escucharlos.',
          },
          {
            type: 'p',
            text: 'El mundo se quebró: sufrimiento, injusticia, temor y muerte. Y la Biblia describe a la humanidad como esclava del pecado.',
          },
          {
            type: 'verse',
            ref: 'Juan 8:34',
            label: 'NBLA',
            paraphrase: 'Jesús les respondió: «En verdad les digo que todo el que comete pecado es esclavo del pecado;',
          },
          {
            type: 'verse',
            ref: 'Efesios 2:1–2',
            label: 'NBLA',
            paraphrase: 'estaban muertos en sus delitos y pecados, en los cuales anduvieron en otro tiempo según la corriente de este mundo, conforme al príncipe de la potestad del aire, el espíritu que ahora opera en los hijos de desobediencia',
          },
          {
            type: 'p',
            text: 'Aunque intentemos escapar por esfuerzo, moralidad o religión, no podemos rescatarnos a nosotros mismos.',
          },
          {
            type: 'verse',
            ref: 'Romanos 3:10',
            label: 'NBLA',
            paraphrase: 'Como está escrito:«No hay justo, ni aun uno;',
          },
        ],
      },
      {
        id: 'rescue',
        title: 'El Rey que vino a rescatar',
        image: {
            src: '/gospel-presentation/rescue.jpg',
            alt: 'Jesús y la obra de Cristo',
        },
        audio: '/gospel-presentation/rescue_audio_es.mp3',
        subtitle: 'Jesús y su obra',
        blocks: [
          { type: 'p', text: 'Porque Dios es un buen Rey, no abandonó a su pueblo. El Rey vino Él mismo.' },
          {
            type: 'verse',
            ref: 'Juan 1:14',
            label: 'NBLA',
            paraphrase: 'El Verbo se hizo carne, y habitó entre nosotros.',
          },
          { type: 'p', text: 'Jesús vivió en obediencia perfecta.' },
          {
            type: 'verse',
            ref: 'Juan 6:38',
            label: 'NBLA',
            paraphrase: 'Porque he descendido del cielo, no para hacer Mi voluntad, sino la voluntad del que me envió.',
          },
          {
            type: 'p',
            text: 'Aunque nunca se rebeló, cargó el castigo que nuestra rebelión merecía.',
          },
          {
            type: 'verse',
            ref: '1 Corintios 15:3',
            label: 'NBLA',
            paraphrase: 'Cristo murió por nuestros pecados, conforme a las Escrituras',
          },
          {
            type: 'verse',
            ref: '1 Pedro 2:24',
            label: 'NBLA',
            paraphrase: 'Él mismo llevó nuestros pecados en Su cuerpo sobre la cruz, a fin de que muramos al pecado y vivamos a la justicia, porque por Sus heridas fueron ustedes sanados.',
          },
          {
            type: 'p',
            text: 'Por su muerte y resurrección, Jesús venció el pecado, la muerte y la oscuridad.',
          },
          {
            type: 'verse',
            ref: 'Hebreos 9:26',
            label: 'NBLA',
            paraphrase: 'pero ahora, una sola vez en la consumación de los siglos, se ha manifestado para destruir el pecado por el sacrificio de Sí mismo.',
          },
        ],
      },
      {
        id: 'response',
        title: 'Un nuevo Rey en el trono',
        image: {
            src: '/gospel-presentation/response.jpg',
            alt: 'Arrepentimiento y fe',
        },
        audio: '/gospel-presentation/response_audio_es.mp3',
        subtitle: 'Arrepentimiento y fe',
        blocks: [
          { type: 'p', text: 'El rescate fue logrado — pero debe recibirse.' },
          { type: 'p', text: 'Jesús llama a todos a responder:' },
          {
            type: 'verse',
            ref: 'Mateo 4:17',
            label: 'NBLA',
            paraphrase: 'Arrepiéntanse, porque el reino de los cielos se ha acercado.',
          },
          {
            type: 'p',
            text: 'Arrepentirse es dejar el auto-gobierno: bajarse del trono y rendir el control a Jesús.',
          },
          {
            type: 'p',
            text: 'La fe es confiar en Él, no solo saber información.',
          },
          {
            type: 'verse',
            ref: 'Romanos 10:9',
            label: 'NBLA',
            paraphrase:
              'si confiesas con tu boca a Jesús por Señor, y crees en tu corazón que Dios lo resucitó de entre los muertos, serás salvo.',
          },
          {
            type: 'p',
            text: 'Esta salvación es un regalo, no algo que se gana.',
          },
          {
            type: 'verse',
            ref: 'Efesios 2:8–9',
            label: 'NBLA',
            paraphrase: 'Porque por gracia ustedes han sido salvados por medio de la fe, y esto no procede de ustedes, sino que es don de Dios; no por obras, para que nadie se gloríe.',
          },
        ],
      },
      {
        id: 'restoration',
        title: 'El reino plenamente restaurado',
        image: {
            src: '/gospel-presentation/restoration.jpg',
            alt: 'Esperanza futura',
        },
        audio: '/gospel-presentation/restoration_audio_es.mp3',
        subtitle: 'Esperanza futura',
        blocks: [
          { type: 'p', text: 'La historia no ha terminado.' },
          {
            type: 'p',
            text: 'Un día, Jesús volverá y restaurará todas las cosas.',
          },
          {
            type: 'verse',
            ref: 'Apocalipsis 11:15',
            label: 'NBLA',
            paraphrase: 'El reino del mundo ha venido a ser el reino de nuestro Señor y de Su Cristo',
          },
          {
            type: 'p',
            text: 'Todo lo quebrado será hecho nuevo.',
          },
          {
            type: 'verse',
            ref: 'Apocalipsis 21:4',
            label: 'NBLA',
            paraphrase: 'Él enjugará toda lágrima de sus ojos, y ya no habrá muerte, ni habrá más duelo, ni clamor, ni dolor, porque las primeras cosas han pasado',
          },
          { type: 'p', text: 'El Reino de Dios será restaurado por completo para siempre.' },
        ],
      },
      {
        id: 'decision',
        title: '¿Quién está en el trono de tu vida?',
        image: {
            src: '/gospel-presentation/decision.jpg',
            alt: 'Decisión por Cristo',
        },
        audio: '/gospel-presentation/decision_audio_es.mp3',
        blocks: [
          {
            type: 'p',
            text: 'Ahora mismo tienes la oportunidad de responder. Si has estado gobernando tu vida, Jesús te invita a bajarte del trono y confiar en Él como tu Rey.',
          },
          { type: 'p', text: 'Si estás listo, puedes hablar con Dios ahora mismo.' },
        ],
      },
    ],
    decision: {
      prayerHeading: 'Una oración de entrega',
      prayerText: [
        'Dios, sé que he vivido a mi manera.',
        'Me he puesto a mí mismo en el trono en lugar de Ti.',
        'Creo que Jesús es el verdadero Rey,',
        'que murió por mis pecados y resucitó.',
        'Hoy me aparto del pecado y confío en Jesús.',
        'Me bajo del trono de mi vida',
        'y pongo a Jesús allí como mi Señor y Rey.',
        'Gracias por perdonarme y recibirme en tu Reino.',
        'Amén.',
      ],
      formHeading: 'Queremos caminar contigo',
      formDescription:
        'Si hiciste esta oración o tomaste la decisión de confiar en Jesús, nos encantaría apoyarte y ayudarte con tus próximos pasos.',
      nameLabel: 'Nombre (requerido)',
      emailLabel: 'Email (requerido)',
      submit: 'Oré para recibir a Cristo',
      privacy: 'Tu información se mantendrá privada y se usará solo para darte seguimiento.',
      submittedTitle: 'Gracias. No estás solo.',
      submittedBody: 'Recibimos tu mensaje. Muy pronto alguien se pondrá en contacto contigo.',
    },
  }

  const pt: Copy = {
    imagePlaceholder: 'Imagem (em breve)',
    nav: {
      back: 'Voltar',
      next: 'Próximo',
      start: 'Começar a história',
      restart: 'Reiniciar',
      stepLabel: (current, total) => `Parte ${current} de ${total}`,
    },
    screens: [
      {
        id: 'intro',
        title: 'O que é o evangelho?',
        image: {
            src: '/gospel-presentation/intro.jpg',
            alt: 'Introdução ao evangelho',
        },
        ctaLabel: 'Começar a história',
        blocks: [
          { type: 'p', text: 'A palavra “evangelho” significa “boas notícias”.' },
          {
            type: 'p',
            text: 'Na Bíblia, o evangelho não é um conjunto de regras religiosas, mas o anúncio do que Deus fez para resgatar o mundo.',
          },
          { type: 'p', text: 'Quando Jesus falou sobre o evangelho, Ele o descreveu assim:' },
          {
            type: 'verse',
            ref: 'Marcos 1:15',
            label: 'Paráfrase',
            paraphrase:
              'O tempo se cumpriu; o reino de Deus se aproximou. Voltem-se para Deus e creiam nas boas notícias.',
          },
          {
            type: 'p',
            text: 'No coração do evangelho há uma história verdadeira: um Rei, o seu reino e a sua missão de resgate.',
          },
        ],
      },
      {
        id: 'creation',
        title: 'O bom Rei e o seu propósito',
        image: {
            src: '/gospel-presentation/creation.jpg',
            alt: 'A criação do mundo',
        },
        subtitle: 'Criação',
        blocks: [
          { type: 'p', text: 'No princípio, Deus criou todas as coisas.' },
          {
            type: 'verse',
            ref: 'Gênesis 1:1',
            label: 'Ideia central',
            paraphrase: 'Deus é o Criador dos céus e da terra.',
          },
          { type: 'p', text: 'Deus não é apenas Criador — Ele também é Rei.' },
          {
            type: 'verse',
            ref: 'Salmo 24:1',
            label: 'Ideia central',
            paraphrase: 'Tudo pertence ao Senhor: a terra e o que nela existe.',
          },
          {
            type: 'p',
            text: 'Deus criou a humanidade à sua imagem e a colocou dentro do seu bom reino para refletir quem Ele é e exercer responsabilidade sobre a criação.',
          },
          {
            type: 'verse',
            ref: 'Gênesis 1:26',
            label: 'Ideia central',
            paraphrase: 'Deus criou o ser humano à sua imagem e lhe deu domínio responsável.',
          },
          {
            type: 'p',
            text: 'A vida sob o governo amoroso de Deus era boa — marcada por paz, propósito e alegria.',
          },
        ],
      },
      {
        id: 'rebellion',
        title: 'Rebelião contra o Rei',
        image: {
            src: '/gospel-presentation/rebellion.jpg',
            alt: 'A queda e o pecado',
        },
        subtitle: 'A queda e o pecado',
        blocks: [
          {
            type: 'p',
            text: 'Em vez de confiar no Rei, a humanidade escolheu a independência: quis decidir por si mesma o que é certo e errado.',
          },
          {
            type: 'verse',
            ref: 'Gênesis 3:5',
            label: 'Ideia central',
            paraphrase: 'O ser humano foi tentado a “ser como Deus” e definir o próprio caminho.',
          },
          { type: 'p', text: 'Essa escolha não foi apenas desobediência — foi rebelião.' },
          {
            type: 'verse',
            ref: 'Isaías 53:6',
            label: 'Ideia central',
            paraphrase: 'Nós nos desviamos e cada um seguiu o seu próprio caminho.',
          },
          {
            type: 'p',
            text: 'Pecado é escolher o autogoverno em vez do governo de Deus: tiramos Deus do trono e colocamos a nós mesmos nele.',
          },
        ],
      },
      {
        id: 'darkness',
        title: 'Um reino em trevas',
        image: {
            src: '/gospel-presentation/darkness.jpg',
            alt: 'O mundo caído',
        },
        subtitle: 'As consequências da rebelião',
        blocks: [
          { type: 'p', text: 'A rebelião contra o Rei trouxe consequências devastadoras.' },
          {
            type: 'verse',
            ref: 'Isaías 59:2',
            label: 'Ideia central',
            paraphrase: 'O pecado produz separação entre nós e Deus.',
          },
          {
            type: 'p',
            text: 'O mundo se quebrou — sofrimento, injustiça, medo e morte. E a Bíblia descreve a humanidade como escravizada pelo pecado.',
          },
          {
            type: 'verse',
            ref: 'João 8:34',
            label: 'Ideia central',
            paraphrase: 'Praticar o pecado nos torna escravos.',
          },
          {
            type: 'verse',
            ref: 'Efésios 2:1–2',
            label: 'Ideia central',
            paraphrase: 'Sem Deus, estamos espiritualmente mortos e seguimos caminhos que nos destroem.',
          },
          {
            type: 'p',
            text: 'Mesmo quando tentamos escapar por esforço, moralidade ou religião, não conseguimos nos resgatar.',
          },
          {
            type: 'verse',
            ref: 'Romanos 3:10',
            label: 'Ideia central',
            paraphrase: 'Ninguém é perfeitamente justo por conta própria.',
          },
        ],
      },
      {
        id: 'rescue',
        title: 'O Rei que veio para resgatar',
        image: {
            src: '/gospel-presentation/rescue.jpg',
            alt: 'Jesus e a obra de Cristo',
        },
        subtitle: 'Jesus e a obra de Cristo',
        blocks: [
          { type: 'p', text: 'Porque Deus é um bom Rei, Ele não abandonou o seu povo. O Rei veio Ele mesmo.' },
          {
            type: 'verse',
            ref: 'João 1:14',
            label: 'Ideia central',
            paraphrase: 'Deus se aproximou: o Verbo se fez carne e habitou entre nós.',
          },
          { type: 'p', text: 'Jesus viveu em perfeita obediência.' },
          {
            type: 'verse',
            ref: 'João 8:29',
            label: 'Ideia central',
            paraphrase: 'Jesus viveu para agradar ao Pai em tudo.',
          },
          {
            type: 'p',
            text: 'Embora nunca tenha se rebelado, Ele tomou sobre si o castigo que a nossa rebelião merecia.',
          },
          {
            type: 'verse',
            ref: '1 Coríntios 15:3',
            label: 'Ideia central',
            paraphrase: 'Cristo morreu pelos nossos pecados.',
          },
          {
            type: 'verse',
            ref: '1 Pedro 2:24',
            label: 'Ideia central',
            paraphrase: 'Ele levou os nossos pecados para nos dar vida nova.',
          },
          {
            type: 'p',
            text: 'Por sua morte e ressurreição, Jesus venceu o pecado, a morte e as trevas.',
          },
          {
            type: 'verse',
            ref: 'Colossenses 2:15',
            label: 'Ideia central',
            paraphrase: 'Jesus derrotou as forças do mal e triunfou abertamente.',
          },
        ],
      },
      {
        id: 'response',
        title: 'Um novo Rei no trono',
        image: {
            src: '/gospel-presentation/response.jpg',
            alt: 'Arrependimento e fé',
        },  
        subtitle: 'Arrependimento e fé',
        blocks: [
          { type: 'p', text: 'O resgate foi realizado — mas precisa ser recebido.' },
          { type: 'p', text: 'Jesus chama todos a responder:' },
          {
            type: 'verse',
            ref: 'Mateus 4:17',
            label: 'Ideia central',
            paraphrase: 'Voltem-se para Deus, pois o seu reino se aproximou.',
          },
          {
            type: 'p',
            text: 'Arrepender-se é abandonar o autogoverno: descer do trono e entregar o controle a Jesus.',
          },
          {
            type: 'p',
            text: 'Fé é confiar nele — não apenas saber informações.',
          },
          {
            type: 'verse',
            ref: 'Romanos 10:9',
            label: 'Ideia central',
            paraphrase:
              'Se você confessa Jesus como Senhor e confia que Deus o ressuscitou, recebe salvação.',
          },
          {
            type: 'p',
            text: 'Essa salvação é um presente — não algo que se conquista.',
          },
          {
            type: 'verse',
            ref: 'Efésios 2:8–9',
            label: 'Ideia central',
            paraphrase: 'Somos salvos pela graça mediante a fé, não por obras.',
          },
        ],
      },
      {
        id: 'restoration',
        title: 'O reino plenamente restaurado',
        image: {
            src: '/gospel-presentation/restoration.jpg',
            alt: 'Esperança futura',
        },
        subtitle: 'Esperança futura',
        blocks: [
          { type: 'p', text: 'A história ainda não terminou.' },
          { type: 'p', text: 'Um dia, Jesus voltará e restaurará todas as coisas.' },
          {
            type: 'verse',
            ref: 'Apocalipse 11:15',
            label: 'Ideia central',
            paraphrase: 'O reino do mundo se tornará o reino do Senhor e do seu Cristo.',
          },
          { type: 'p', text: 'Tudo o que está quebrado será feito novo.' },
          {
            type: 'verse',
            ref: 'Apocalipse 21:4',
            label: 'Ideia central',
            paraphrase: 'Deus removerá a dor e a morte para sempre.',
          },
          { type: 'p', text: 'O Reino de Deus será restaurado completamente para sempre.' },
        ],
      },
      {
        id: 'decision',
        title: 'Quem está no trono da sua vida?',
        image: {
            src: '/gospel-presentation/decision.jpg',
            alt: 'Decisão por Cristo',
        },
        blocks: [
          {
            type: 'p',
            text: 'Agora mesmo você tem a oportunidade de responder. Se você tem governado a própria vida, Jesus o convida a descer do trono e confiar nele como seu Rei.',
          },
          { type: 'p', text: 'Se você está pronto, pode falar com Deus agora mesmo.' },
        ],
      },
    ],
    decision: {
      prayerHeading: 'Uma oração de rendição',
      prayerText: [
        'Deus, eu sei que tenho vivido do meu jeito.',
        'Eu me coloquei no trono em vez de Ti.',
        'Eu creio que Jesus é o verdadeiro Rei,',
        'que morreu pelos meus pecados e ressuscitou.',
        'Hoje eu me volto do meu pecado e confio em Jesus.',
        'Eu desço do trono da minha vida',
        'e coloco Jesus ali como meu Senhor e Rei.',
        'Obrigado por me perdoar e me receber no teu Reino.',
        'Amém.',
      ],
      formHeading: 'Queremos caminhar com você',
      formDescription:
        'Se você fez essa oração ou decidiu confiar em Jesus, gostaríamos de apoiar você e ajudar com os próximos passos.',
      nameLabel: 'Nome (obrigatório)',
      emailLabel: 'Email (obrigatório)',
      submit: 'Orei para receber a Cristo',
      privacy: 'Suas informações serão mantidas em privado e usadas apenas para acompanhar você.',
      submittedTitle: 'Obrigado. Você não está sozinho.',
      submittedBody: 'Recebemos sua mensagem. Em breve alguém entrará em contato com você.',
    },
  }

  return locale === 'pt' ? pt : es
}

function normalizePublicAssetSrc(raw: string): string {
  const trimmed = raw.trim()
  const isRemote = /^https?:\/\//i.test(trimmed)
  if (isRemote) return trimmed
  return `/${trimmed.replace(/^\.?\/?public\//, '').replace(/^\/?/, '')}`
}

function PresentationImage({
  image,
  audio,
  placeholder,
}: {
  image?: { src: string; alt: string }
  audio?: string
  placeholder: string
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)

  const normalizedAudio = audio ? normalizePublicAssetSrc(audio) : null

  useEffect(() => {
    const audioEl = audioRef.current
    return () => {
      audioEl?.pause()
    }
  }, [])

  if (!image?.src) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="aspect-[16/9] w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
            {placeholder}
          </div>
        </div>
      </div>
    )
  }

  const normalizedSrc = normalizePublicAssetSrc(image.src)
  const imageIsRemote = /^https?:\/\//i.test(normalizedSrc)

  const toggleAudio = async () => {
    if (!normalizedAudio || !audioRef.current) return
    setAudioError(false)

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch {
        setAudioError(true)
        setIsPlaying(false)
      }
      return
    }

    audioRef.current.pause()
    setIsPlaying(false)
  }

  if (imageIsRemote) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
        <div className="relative aspect-[16/9] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={normalizedSrc} alt={image.alt || ''} className="absolute inset-0 h-full w-full object-cover" />

          {normalizedAudio ? (
            <>
              <audio
                ref={audioRef}
                src={normalizedAudio}
                preload="none"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setAudioError(true)}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="rounded-full bg-black/55 px-5 py-3 text-white backdrop-blur hover:bg-black/65"
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path fill="currentColor" d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                      <path fill="currentColor" d="M8 5v14l11-7L8 5z" />
                    </svg>
                  )}
                </button>
              </div>
              {audioError ? (
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-red-600/90 px-3 py-2 text-xs font-semibold text-white">
                  Audio unavailable.
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <div className="relative aspect-[16/9] w-full">
        <Image src={normalizedSrc} alt={image.alt || ''} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />

        {normalizedAudio ? (
          <>
            <audio
              ref={audioRef}
              src={normalizedAudio}
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={() => setAudioError(true)}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={toggleAudio}
                className="rounded-full bg-black/55 px-5 py-3 text-white backdrop-blur hover:bg-black/65"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path fill="currentColor" d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                    <path fill="currentColor" d="M8 5v14l11-7L8 5z" />
                  </svg>
                )}
              </button>
            </div>
            {audioError ? (
              <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-red-600/90 px-3 py-2 text-xs font-semibold text-white">
                Audio unavailable.
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}

function VerseBlock({ ref, paraphrase, label }: { ref: string; paraphrase: string; label?: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-sm font-semibold text-blue-900">{ref}</div>
        {label ? <div className="text-xs font-semibold text-blue-800/80">{label}</div> : null}
      </div>
      <p className="mt-2 text-gray-800 leading-relaxed">{paraphrase}</p>
    </div>
  )
}

function QuestionBlock({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <div className="text-sm font-semibold text-amber-900">Pregunta</div>
      <p className="mt-2 text-gray-800 leading-relaxed">{text}</p>
    </div>
  )
}

export type GospelPresentationProps = {
  locale: Locale
  className?: string
  initialScreenId?: ScreenId
  onSubmitted?: () => void
}

export function GospelPresentationClient({ locale, className, initialScreenId, onSubmitted }: GospelPresentationProps) {
  const copy = useMemo(() => getCopy(locale), [locale])
  const screens = copy.screens

  const scrollTargetRef = useRef<HTMLDivElement | null>(null)
  const didMountRef = useRef(false)

  const initialIndex = useMemo(() => {
    if (!initialScreenId) return 0
    const idx = screens.findIndex((s) => s.id === initialScreenId)
    return idx >= 0 ? idx : 0
  }, [initialScreenId, screens])

  const [index, setIndex] = useState(initialIndex)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const pathname = usePathname()

  const current = screens[index]
  const total = screens.length

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [index])

  const canGoBack = index > 0
  const canGoNext = index < total - 1

  const handleBack = () => {
    if (!canGoBack) return
    setIndex((i) => Math.max(0, i - 1))
  }

  const handleNext = () => {
    if (!canGoNext) return
    setIndex((i) => Math.min(total - 1, i + 1))
  }

  const handleRestart = () => {
    setIndex(0)
    setSubmitted(false)
    setSubmitError(null)
  }

  const submitDecision = async () => {
    setSubmitError(null)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail) {
      setSubmitError(locale === 'pt' ? 'Por favor, preencha nome e email.' : 'Por favor, completa nombre y email.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/gospel-decisions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          locale,
          pagePath: pathname ?? null,
        }),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || 'Request failed')
      }

      setSubmitted(true)
      onSubmitted?.()
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      setSubmitError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className={className}>
      <div className="mx-auto w-full max-w-3xl">
        <div
          ref={scrollTargetRef}
          className="scroll-mt-24 rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-amber-50 px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-semibold text-gray-600">{copy.nav.stepLabel(index + 1, total)}</div>
              <div className="flex items-center gap-1">
                {screens.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={s.id}
                    onClick={() => setIndex(i)}
                    className={
                      i === index
                        ? 'h-2.5 w-6 rounded-full bg-blue-600'
                        : 'h-2.5 w-2.5 rounded-full bg-gray-300 hover:bg-gray-400'
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                {current.subtitle ? (
                  <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                    {current.subtitle}
                  </div>
                ) : null}
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{current.title}</h2>
              </div>

              <PresentationImage
                key={current.id}
                image={current.image}
                audio={current.audio}
                placeholder={copy.imagePlaceholder}
              />

              <div className="space-y-4">
                {current.blocks.map((b, idx) => {
                  if (b.type === 'p') {
                    return (
                      <p key={idx} className="text-gray-700 leading-relaxed text-lg">
                        {b.text}
                      </p>
                    )
                  }
                  if (b.type === 'verse') {
                    return <VerseBlock key={idx} ref={b.ref} paraphrase={b.paraphrase} label={b.label} />
                  }
                  if (b.type === 'list') {
                    return (
                      <ul key={idx} className="list-disc pl-6 text-gray-700 space-y-2">
                        {b.items.map((item) => (
                          <li key={item} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  if (b.type === 'question') {
                    return <QuestionBlock key={idx} text={b.text} />
                  }
                  if (b.type === 'hr') {
                    return <hr key={idx} className="border-gray-200" />
                  }
                  return null
                })}
              </div>

              {current.id === 'decision' ? (
                <div className="space-y-6">
                  <details className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <summary className="cursor-pointer text-base font-semibold text-gray-900">
                      {copy.decision.prayerHeading}
                    </summary>
                    <div className="mt-4 space-y-2 text-gray-700 leading-relaxed">
                      {copy.decision.prayerText.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </details>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h3 className="text-xl font-semibold text-gray-900">{copy.decision.formHeading}</h3>
                    <p className="mt-2 text-gray-700 leading-relaxed">{copy.decision.formDescription}</p>

                    {submitted ? (
                      <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                        <div className="font-semibold text-green-900">{copy.decision.submittedTitle}</div>
                        <div className="mt-1 text-green-900/90">{copy.decision.submittedBody}</div>
                      </div>
                    ) : (
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="block">
                          <div className="text-sm font-semibold text-gray-800">{copy.decision.nameLabel}</div>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="name"
                          />
                        </label>
                        <label className="block">
                          <div className="text-sm font-semibold text-gray-800">{copy.decision.emailLabel}</div>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="email"
                          />
                        </label>

                        <div className="sm:col-span-2">
                          {submitError ? (
                            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                              {submitError}
                            </div>
                          ) : null}

                          <button
                            type="button"
                            onClick={submitDecision}
                            disabled={submitting}
                            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                          >
                            {submitting ? '…' : copy.decision.submit}
                          </button>
                          <p className="mt-3 text-xs text-gray-500">{copy.decision.privacy}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="sticky bottom-0 border-t border-gray-200 bg-white/95 backdrop-blur px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={!canGoBack}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-40"
              >
                {copy.nav.back}
              </button>

              <div className="flex items-center gap-2">
                {current.id === 'decision' ? (
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    {copy.nav.restart}
                  </button>
                ) : null}

                {current.id === 'intro' ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
                  >
                    {current.ctaLabel || copy.nav.start}
                  </button>
                ) : (

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-40"
                  >
                    {copy.nav.next}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
