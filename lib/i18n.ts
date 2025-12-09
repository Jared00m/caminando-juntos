export type Locale = 'es' | 'pt'

export const defaultLocale: Locale = 'es'

export const dictionaries = {
  es: {
    common: {
      home: 'Inicio',
      articles: 'Artículos',
      videos: 'Videos',
      studies: 'Estudios',
      events: 'Eventos',
      findHelp: 'Encuentra Ayuda',
      footer: {
        tagline: 'Luz para tu camino. Explorando el mensaje que transforma vidas.',
        rights: 'Todos los derechos reservados.',
        sharing: 'Compartiendo esperanza y verdad',
      },
      auth: {
        signIn: 'Iniciar Sesión',
        signUp: 'Registrarse',
        signOut: 'Cerrar Sesión',
      }
    },
    metadata: {
      title: 'Caminando Juntos - Conoce a Jesús',
      description: 'Descubre quién es Jesús a través de estudios bíblicos, artículos y recursos espirituales en español.',
      keywords: ['Jesús', 'evangelio', 'estudios bíblicos', 'fe cristiana', 'español'],
    },
    home: {
      hero: {
        title: 'Luz para tu camino',
        subtitle: 'Explora el mensaje que transforma vidas. Descubre la Biblia y conecta con una comunidad de fe cerca de ti.',
        cta1: 'Descubre la Biblia',
        cta2: 'Encuentra una comunidad',
      },
      features: {
        title: 'Explora el mensaje',
        subtitle: 'Recursos diseñados para ayudarte a descubrir verdades que transforman',
        studies: {
          title: 'Estudios Bíblicos',
          description: 'Descubre paso a paso las verdades de la Biblia con estudios diseñados para tu crecimiento espiritual.',
        },
        videos: {
          title: 'Videos',
          description: 'Contenido visual inspirador que complementa tu caminar de fe y profundiza tu comprensión.',
        },
        community: {
          title: 'Comunidad',
          description: 'Conecta con eventos locales y una comunidad de fe que te acompaña en tu búsqueda espiritual.',
        },
      },
      region: {
        title: 'Encuentra recursos en tu región',
        description: 'Conéctate con eventos, contactos y recursos específicos para tu país y ciudad. Tu comunidad de fe está más cerca de lo que piensas.',
      },
    },
    articles: {
      title: 'Artículos',
      subtitle: 'Explora artículos que iluminan tu camino y profundizan tu comprensión de la Biblia.',
      comingSoon: {
        title: 'Próximamente',
        message: 'Estamos preparando contenido inspirador para ti.',
      },
      readMore: 'Leer más',
    },
    help: {
      title: 'Encuentra Ayuda',
      subtitle: 'Conecta con personas que pueden acompañarte en tu caminar espiritual y responder tus preguntas sobre la fe.',
      personalized: {
        title: 'Ayuda personalizada por región',
        description: 'Los contactos que ves aquí están disponibles en tu región. Todos nuestros colaboradores están capacitados para ayudarte con respeto y confidencialidad.',
      },
      howToHelp: {
        title: '¿Cómo podemos ayudarte?',
        items: [
          'Preguntas sobre la fe y Jesús',
          'Orientación espiritual personal',
          'Apoyo en momentos difíciles',
          'Conexión con comunidades locales',
        ],
      },
      confidentiality: {
        title: 'Confidencialidad garantizada',
        p1: 'Entendemos que las preguntas sobre la fe pueden ser muy personales. Todas nuestras conversaciones son completamente confidenciales.',
        p2: 'Nuestro objetivo es acompañarte en tu búsqueda espiritual con respeto, comprensión y sin juicios.',
      },
      unavailable: {
        title: 'La ayuda no está disponible',
        description: 'Esta función está temporalmente deshabilitada. Vuelve pronto para encontrar ayuda en tu región.',
        cta: 'Continúa con estudios',
      },
    },
    events: {
      title: 'Eventos Locales',
      subtitle: 'Encuentra eventos y actividades en tu región para conectar con una comunidad de fe.',
      personalized: {
        title: 'Eventos personalizados por región',
        description: 'Los eventos que ves aquí están filtrados según tu ubicación. Si no ves eventos en tu área, prueba cambiando tu país en el selector de región.',
      },
      unavailable: {
        title: 'Los eventos no están disponibles',
        description: 'Esta función está temporalmente deshabilitada. Vuelve pronto para ver eventos en tu región.',
        cta: 'Encuentra ayuda local',
      },
    },
    studies: {
      title: 'Estudios Bíblicos',
      subtitle: 'Descubre paso a paso las verdades de la Biblia con estudios diseñados para tu crecimiento espiritual.',
      comingSoon: {
        title: 'Próximamente',
        message: 'Estamos preparando estudios bíblicos para ti.',
      },
      lessons: 'lecciones',
      viewLessons: 'Ver lecciones',
      cta: {
        title: '¿Nuevo en los estudios bíblicos?',
        description: 'Si es tu primera vez estudiando la Biblia, te recomendamos comenzar con "Conociendo a Jesús". Este estudio te dará una base sólida para entender quién es Jesús y por qué es importante para tu vida.',
        button1: 'Comenzar con "El Plan de Salvación"',
        button2: 'Leer artículos primero',
      },
    },
  },
  pt: {
    common: {
      home: 'Início',
      articles: 'Artigos',
      videos: 'Vídeos',
      studies: 'Estudos',
      events: 'Eventos',
      findHelp: 'Encontre Ajuda',
      footer: {
        tagline: 'Luz para o seu caminho. Explorando a mensagem que transforma vidas.',
        rights: 'Todos os direitos reservados.',
        sharing: 'Compartilhando esperança e verdade',
      },
      auth: {
        signIn: 'Entrar',
        signUp: 'Cadastrar',
        signOut: 'Sair',
      }
    },
    metadata: {
      title: 'Caminando Juntos - Conheça a Jesus',
      description: 'Descubra quem é Jesus através de estudos bíblicos, artigos e recursos espirituais em português.',
      keywords: ['Jesus', 'evangelho', 'estudos bíblicos', 'fé cristã', 'português'],
    },
    home: {
      hero: {
        title: 'Luz para o seu caminho',
        subtitle: 'Explore a mensagem que transforma vidas. Descubra a Bíblia e conecte-se com uma comunidade de fé perto de você.',
        cta1: 'Descubra a Bíblia',
        cta2: 'Encontre uma comunidade',
      },
      features: {
        title: 'Explore a mensagem',
        subtitle: 'Recursos projetados para ajudá-lo a descobrir verdades que transformam',
        studies: {
          title: 'Estudos Bíblicos',
          description: 'Descubra passo a passo as verdades da Bíblia com estudos projetados para o seu crescimento espiritual.',
        },
        videos: {
          title: 'Vídeos',
          description: 'Conteúdo visual inspirador que complementa sua caminhada de fé e aprofunda sua compreensão.',
        },
        community: {
          title: 'Comunidade',
          description: 'Conecte-se com eventos locais e uma comunidade de fé que o acompanha em sua busca espiritual.',
        },
      },
      region: {
        title: 'Encontre recursos em sua região',
        description: 'Conecte-se com eventos, contatos e recursos específicos para seu país e cidade. Sua comunidade de fé está mais perto do que você pensa.',
      },
    },
    articles: {
      title: 'Artigos',
      subtitle: 'Explore artigos que iluminam seu caminho e aprofundam sua compreensão da Bíblia.',
      comingSoon: {
        title: 'Em Breve',
        message: 'Estamos preparando conteúdo inspirador para você.',
      },
      readMore: 'Ler mais',
    },
    help: {
      title: 'Encontre Ajuda',
      subtitle: 'Conecte-se com pessoas que podem acompanhá-lo em sua caminhada espiritual e responder às suas perguntas sobre a fé.',
      personalized: {
        title: 'Ajuda personalizada por região',
        description: 'Os contatos que você vê aqui estão disponíveis em sua região. Todos os nossos colaboradores são treinados para ajudá-lo com respeito e confidencialidade.',
      },
      howToHelp: {
        title: 'Como podemos ajudar?',
        items: [
          'Perguntas sobre fé e Jesus',
          'Orientação espiritual pessoal',
          'Apoio em momentos difíceis',
          'Conexão com comunidades locais',
        ],
      },
      confidentiality: {
        title: 'Confidencialidade garantida',
        p1: 'Entendemos que perguntas sobre fé podem ser muito pessoais. Todas as nossas conversas são completamente confidenciais.',
        p2: 'Nosso objetivo é acompanhá-lo em sua busca espiritual com respeito, compreensão e sem julgamentos.',
      },
      unavailable: {
        title: 'A ajuda não está disponível',
        description: 'Este recurso está temporariamente desativado. Volte em breve para encontrar ajuda em sua região.',
        cta: 'Continue com estudos',
      },
    },
    events: {
      title: 'Eventos Locais',
      subtitle: 'Encontre eventos e atividades em sua região para se conectar com uma comunidade de fé.',
      personalized: {
        title: 'Eventos personalizados por região',
        description: 'Os eventos que você vê aqui são filtrados de acordo com sua localização. Se você não vir eventos em sua área, tente mudar seu país no seletor de região.',
      },
      unavailable: {
        title: 'Os eventos não estão disponíveis',
        description: 'Este recurso está temporariamente desativado. Volte em breve para ver eventos em sua região.',
        cta: 'Encontre ajuda local',
      },
    },
    studies: {
      title: 'Estudos Bíblicos',
      subtitle: 'Descubra passo a passo as verdades da Bíblia com estudos projetados para o seu crescimento espiritual.',
      comingSoon: {
        title: 'Em Breve',
        message: 'Estamos preparando estudos bíblicos para você.',
      },
      lessons: 'lições',
      viewLessons: 'Ver lições',
      cta: {
        title: 'Novo nos estudos bíblicos?',
        description: 'Se é sua primeira vez estudando a Bíblia, recomendamos começar com "Conhecendo a Jesus". Este estudo lhe dará uma base sólida para entender quem é Jesus e por que ele é importante para sua vida.',
        button1: 'Começar com "O Plano de Salvação"',
        button2: 'Ler artigos primeiro',
      },
    },
  },
} as const

export type Dictionary = typeof dictionaries['es']

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary
}
