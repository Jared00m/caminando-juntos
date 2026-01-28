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
      nav: {
        startHere: 'Comienza',
        goDeeper: 'Profundiza',
        findCommunity: 'Comunidad',
        aboutUs: 'Nosotros',
        whatIsGospel: '¿Qué es el Evangelio?',
        whoIsJesus: '¿Quién es Jesús?',
        testimonies: 'Testimonios',
        firstSteps: 'Primeros Pasos',
        bibleStudies: 'Estudios Bíblicos',
        apologetics: 'Apologética',
        sharingFaith: 'Comparte tu Fe',
        findMentor: 'Encuentra Mentor',
        findChurch: 'Encuentra Iglesia',
        chat: 'Chat',
        beliefs: 'Creencias',
        whoWeAre: 'Quiénes Somos',
        contact: 'Contacto',
      },
      footer: {
        tagline: 'Luz para tu camino. Explorando el mensaje que transforma vidas.',
        rights: 'Todos los derechos reservados.',
        sharing: 'Compartiendo esperanza y verdad',
      },
      auth: {
        signIn: 'Iniciar Sesión',
        signUp: 'Registrarse',
        signOut: 'Cerrar Sesión',
        modal: {
          titleSignIn: 'Iniciar sesión',
          titleSignUp: 'Crear cuenta',
          nameLabel: 'Nombre',
          emailLabel: 'Correo electrónico',
          passwordLabel: 'Contraseña',
          submitSignIn: 'Iniciar sesión',
          submitSignUp: 'Crear cuenta',
          loading: 'Cargando...',
          toggleToSignIn: '¿Ya tienes cuenta? Inicia sesión',
          toggleToSignUp: '¿No tienes cuenta? Regístrate',
          tipTitle: 'Consejo:',
          tipBody: 'Puedes estudiar sin crear una cuenta. Registrarte te permite guardar tu progreso y conectar con un misionero.',
          successSignUp: '¡Cuenta creada! Por favor revisa tu correo electrónico para confirmar tu cuenta.',
          errors: {
            generic: 'Ocurrió un error',
            emailNotConfirmed: 'Por favor confirma tu correo electrónico. Revisa tu bandeja de entrada.',
            invalidLogin: 'Correo o contraseña incorrectos.',
            alreadyRegistered: 'Este correo ya está registrado.',
            passwordTooShort: 'La contraseña debe tener al menos 6 caracteres.',
            invalidEmail: 'Correo electrónico inválido.',
            rateLimit: 'Demasiados intentos. Por favor espera unos minutos.',
          },
        },
      }
    },
    metadata: {
      title: 'Caminando Juntos - Conoce a Jesús',
      description: 'Descubre quién es Jesús a través de estudios bíblicos, artículos y recursos espirituales en español.',
      keywords: ['Jesús', 'evangelio', 'estudios bíblicos', 'fe cristiana', 'español'],
    },
    home: {
      hero: {
        title: 'Un Camino de Descubrimiento',
        subtitle: 'Explora quién es Jesús, profundiza en tu comprensión y encuentra una comunidad donde pertenecer.',
        cta: 'Comienza tu Viaje',
      },
      journey: {
        title: 'Tu Camino de Fe',
        subtitle: 'Te guiamos paso a paso desde la curiosidad hasta la comunidad',
      },
      step1: {
        badge: 'Paso 1',
        title: 'Explora las Afirmaciones de Cristo',
        description: '¿Tienes preguntas sobre Jesús? Comienza aquí. Descubre quién afirmó ser, por qué vino y qué significa para tu vida. Explora el mensaje del evangelio y escucha testimonios de personas cuyas vidas fueron transformadas.',
        cta: 'Comienza a Explorar',
      },
      step2: {
        badge: 'Paso 2',
        title: 'Profundiza en tu Comprensión',
        description: '¿Listo para aprender más? Sumérgete en estudios bíblicos que te ayudarán a entender mejor tu fe. Explora respuestas a preguntas difíciles y aprende cómo comunicar lo que crees a otros.',
        cta: 'Comienza a Aprender',
      },
      step3: {
        badge: 'Paso 3',
        title: 'Vive la Fe en Comunidad',
        description: 'La fe no fue diseñada para vivirla solo. Conéctate con un mentor que pueda guiarte, encuentra una iglesia local donde pertenecer, o habla con un cristiano que pueda responder tus preguntas.',
        cta: 'Encuentra Comunidad',
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
    articlePage: {
      notFoundTitle: 'Artículo no encontrado',
      defaultDescription: 'Lee {title} en Caminando Juntos - artículos que inspiran fe.',
      defaultKeywords: ['artículo cristiano', 'fe', 'evangelio'],
      defaultAuthor: 'Caminando Juntos',
      breadcrumbs: {
        home: 'Inicio',
        articles: 'Artículos',
      },
      audioLabel: 'Resumen en audio',
      audioUnsupported: 'Tu navegador no soporta el elemento de audio.',
      backToArticles: 'Volver a artículos',
    },
    testimoniesPage: {
      backToIndex: 'Volver a testimonios',
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
    churches: {
      title: 'Encuentra una Iglesia',
      subtitle: 'Busca iglesias en tu país y filtra por ciudad para encontrar una comunidad cerca de ti.',
      filterCity: 'Ciudad',
      allCities: 'Todas las ciudades',
      contactWhatsapp: 'WhatsApp',
      contactCall: 'Llamar',
      website: 'Sitio web',
      loading: 'Cargando...',
      emptyTitle: 'No hay iglesias disponibles',
      emptyMessage: 'No encontramos iglesias en tu región en este momento.',
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
      previous: 'Anterior',
      next: 'Siguiente',
      cta: {
        title: '¿Nuevo en los estudios bíblicos?',
        description: 'Si es tu primera vez estudiando la Biblia, te recomendamos comenzar con "Conociendo a Jesús". Este estudio te dará una base sólida para entender quién es Jesús y por qué es importante para tu vida.',
        button1: 'Comenzar con "El Plan de Salvación"',
        button2: 'Leer artículos primero',
      },
    },
    gospel: {
      videoId: 'StGMC-KdehE',
      title: '¿Qué es el Evangelio?',
      subtitle: 'Descubre el mensaje central de la fe cristiana: las buenas noticias que cambian vidas',
      problem: {
        title: 'El Problema',
        description: 'Todos hemos pecado y estamos separados de Dios. Por nuestros propios esfuerzos, no podemos alcanzar la perfección que Dios requiere.',
        verse: '"Por cuanto todos pecaron, y están destituidos de la gloria de Dios" - Romanos 3:23',
      },
      solution: {
        title: 'La Solución',
        description: 'Dios nos amó tanto que envió a su Hijo Jesús a morir en la cruz por nuestros pecados. A través de Su sacrificio, podemos ser perdonados y reconciliados con Dios.',
        verse: '"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito" - Juan 3:16',
      },
      response: {
        title: 'Nuestra Respuesta',
        description: 'Para recibir este regalo de salvación, debemos arrepentirnos de nuestros pecados, creer en Jesús, y seguirle como Señor de nuestras vidas.',
        verse: '"Si confiesas con tu boca que Jesús es el Señor... serás salvo" - Romanos 10:9',
      },
      cta: {
        title: '¿Listo para dar el siguiente paso?',
        subtitle: 'Explora cómo puedes crecer en tu fe y conectar con una comunidad',
        firstSteps: 'Primeros Pasos',
        studies: 'Ver Estudios Bíblicos',
        findChurch: 'Encuentra una Iglesia',
      },
    },
    whoIsJesus: {
      videoId: 'GDGYKfpyiU8',
      title: '¿Quién es Jesús?',
      subtitle: 'Conoce al Hijo de Dios que vino a cambiar tu vida para siempre',
      deity: {
        title: 'Dios Hecho Hombre',
        description: 'Jesús no fue solo un buen maestro o profeta. Él es Dios mismo que se hizo hombre para vivir entre nosotros, mostrando el amor perfecto del Padre.',
        verse: '"En el principio existía el Verbo... y el Verbo era Dios" - Juan 1:1',
      },
      purpose: {
        title: 'Su Misión',
        description: 'Jesús vino a la tierra con un propósito: rescatarnos del pecado y restaurar nuestra relación con Dios a través de su sacrificio en la cruz.',
        verse: '"El Hijo del Hombre vino a buscar y a salvar lo que se había perdido" - Lucas 19:10',
      },
      victory: {
        title: 'Vivo y Reinando',
        description: 'Jesús no se quedó en la tumba. Resucitó al tercer día, venciendo la muerte y el pecado. Hoy está vivo, reinando y ofreciendo vida eterna a todos los que creen en Él.',
        verse: '"Yo soy... el que vivo, y estuve muerto; mas he aquí que vivo por los siglos de los siglos" - Apocalipsis 1:18',
      },
      cta: {
        title: '¿Quieres conocer más a Jesús?',
        subtitle: 'Descubre cómo puedes tener una relación personal con Él',
        gospel: '¿Qué es el Evangelio?',
        studies: 'Estudios sobre Jesús',
        findChurch: 'Encuentra una Iglesia',
      },
    },
    beliefs: {
      title: 'Nuestras Creencias',
      subtitle: 'Conoce los principios fundamentales de nuestra fe cristiana',
      sections: {
        scriptures: {
          title: 'I. Las Escrituras',
          content: 'La Santa Biblia fue escrita por hombres divinamente inspirados y es la revelación que Dios hace de sí mismo al hombre. Es un tesoro perfecto de instrucción divina. Tiene a Dios como su autor, su propósito es la salvación, y su tema es la verdad, sin mezcla alguna de error. Por tanto, toda la Escritura es totalmente verdadera y confiable. Ella revela los principios por los cuales Dios nos juzga, y por tanto es y permanecerá siendo hasta el fin del mundo, el centro verdadero de la unión Cristiana, y la norma suprema por la cual toda conducta, credos, y opiniones religiosas humanas deben ser juzgadas. Toda la Escritura es un testimonio de Jesús, quien es Él mismo el centro de la revelación divina.',
          references: 'Éxodo 24.4; Deuteronomio 4.1-2; 17.19; Josué 8.34; Salmos 19.7-10; 119.11, 89, 105, 140; Isaías 34.16; 40.8; Jeremías 15.16; 36.1-32; Mateo 5.17-18; 22.29; Lucas 21.33; 24.44-46; Juan 5.39; 16.13-15; 17.17; Hechos 2.16 y sgts.; 17.11; Romanos 15.4; 16.25-26; 2 Timoteo 3.15-17; Hebreos 1.1-2; 4..12; 1 Pedro 1.25, 2 Pedro 1.19-21.',
        },
        god: {
          title: 'II. Dios',
          content: 'Hay un Dios, y solo uno, viviente y verdadero. Él es un Ser inteligente, espiritual y personal, el Creador, Redentor, Preservador y Gobernador del universo. Dios es infinito en santidad y en todas las otras perfecciones. Dios es todopoderoso y omnisciente; y su perfecto conocimiento se extiende a todas las cosas, pasadas, presentes y futuras, incluyendo las decisiones futuras de sus criaturas libres. A Él le debemos el amor más elevado, reverencia y obediencia. El Dios eterno y trino se revela a sí mismo como Padre, Hijo y Espíritu Santo, con distintos atributos personales, pero sin división de naturaleza, esencia o ser.',
          subsections: {
            father: {
              title: 'A. Dios el Padre',
              content: 'Dios como Padre reina con cuidado providencial sobre todo su universo, sus criaturas, y el fluir de la corriente de la historia humana de acuerdo a los propósitos de su gracia. Él es todopoderoso, omnisciente, todo amor, y todo sabio. Dios es Padre en verdad de todos aquellos que llegan a ser sus hijos por medio de la fe en Cristo Jesús. Él es paternal en su actitud hacia todos los hombres.',
              references: 'Génesis 1.1; 2.7; Éxodo 3.14; 6.2-3; 15.11 y sgts.; 20.l y sgts.; Levítico 22.2; Deuteronomio 6.4; 32.6; 1 Crónicas 29.10; Salmos 19.1-3; Isaías 43.3,15; 64.8; Jeremías 10.10; 17.13; Mateo 6.9 y sgts.; 7.11; 23.9; 28.19; Marcos 1.9-11; Juan 4.24; 5.26; 14.6-13; 17.1-8; Hechos 1.7; Romanos 8.14-15; 1 Corintios 8.6; Gálatas 4.6; Efesios 4.6; Colosenses 1.15; 1 Timoteo 1.17; Hebreos 11.6; 12.9; 1 Pedro 1.17; 1 Juan 5.7.',
            },
            son: {
              title: 'B. Dios el Hijo',
              content: 'Cristo es el Hijo eterno de Dios. En su encarnación como Jesucristo fue concebido del Espíritu Santo y nacido de la virgen María. Jesús reveló y cumplió perfectamente la voluntad de Dios, tomando sobre sí mismo la naturaleza humana con sus demandas y necesidades e identificándose completamente con la humanidad, pero sin pecado. Él honró la ley divina por su obediencia personal, y en su muerte sustituta en la cruz, Él hizo provisión para la redención de los hombres del pecado. Él fue levantado de entre los muertos con un cuerpo glorificado y apareció a sus discípulos como la persona que estaba con ellos antes de su crucifixión. Él ascendió a los cielos y está ahora exaltado a la diestra de Dios donde Él es el Único Mediador, completamente Dios, completamente hombre, en cuya Persona se ha efectuado la reconciliación entre Dios y el hombre. Él volverá con poder y gloria para juzgar al mundo y consumar su misión redentora. Él mora ahora en todos los creyentes como el Señor vivo y omnisciente.',
              references: 'Génesis 18.1 y sgts.; Salmos 2.7 y sgts.; 110.1 y sgts.; Isaías 7.14; 53; Mateo 1.1823; 3.17; 8.29; 11.27; 14.33; 16.16,27; 17.5; 27; 28.1-6,19; Marcos 1.1; 3.11, Lucas 1.35; 4.41; 22.70; 24.46; Juan 1.1-18,29; 10.30,38; 11.25-27; 12.44-50; 14.7-11; 16.15-16,28; 17.1-5,21-22; 20.1-20,28; Hechos 1.9; 2.22-24; 7.55-56; 9.45,20; Romanos 1.3-4; 3.23-26; 5.6-21; 8.1-3,34; 10.4; 1 Corintios 1.30; 2.2; 8.6; 15.1-8, 24-28; 2 Corintios 5.19-21; 8.9; Gálatas 4.4-5; Efesios 1.20; 3.11; 4.7-10; Filipenses 2.5-11; Colosenses 1.13-22; 2.9; 1 Tesalonicenses 4.14-18; 1 Timoteo 2.5-6; 3.16; Tito 2.13-14; Hebreos 1.1-3; 4.14-15; 7.14-28; 9.12-15, 24-28; 12.2; 13.8; 1 Pedro 2.21-25; 3.22; 1 Juan 1.7-9; 3.2; 4.14-15; 5.9; 2 Juan 7-9; Apocalipsis 1.13-16; 5.9-14; 12.10-11; 13.8; 19.16.',
            },
            holySpirit: {
              title: 'C. Dios, el Espíritu Santo',
              content: 'El Espiritu Santo es el Espíritu de Dios, completamente divino. Él inspiró a santos hombres de la antigüedad para que escribieran las Escrituras. Mediante la iluminación Él capacita a los hombres para entender la verdad. Él exalta a Cristo. Él convence a los hombres de pecado, de justicia, y de juicio. Él llama a los hombres al Salvador, y efectúa la regeneración. En el momento de la regeneración Él bautiza a cada creyente en el Cuerpo de Cristo. Él cultiva el carácter cristiano, conforta a los creyentes, y les da los dones espirituales por medio de los cuales ellos sirven a Dios mediante su iglesia. Él sella al creyente para el día de la redención final. Su presencia en el cristiano es la garantía de que Dios llevará al creyente hasta alcanzar la plenitud de la estatura de Cristo. Él ilumina y da poder al creyente y a la iglesia en adoración, evangelismo, y servicio.',
              references: 'Génesis 1.2; Jueces 14.6; Job 26.13; Salmos 51.11; 139.7 y sgts. Isaías 61.1-3; Joel 2.28-32; Mateo 1.18; 3.16; 4.1; 12.28-32; 28.19; Marcos 1.10,12; Lucas 1.35; 4.1, 18-19; 11.13; 12.12; 24.49; Juan 4.24; 14.16-17,26; 15.26; 16.7-14; Hechos 1.8; 2.1-4,38; 4.31; 5.3; 6.3; 7.55; 8.17,39; 10.44; 13.2; 15.28; 16.6; 19.1-6; Romanos .9-11,14-16,26-27; 1 Corintios 2.10-14; 3.16; 12.3-11,13; Gálatas 4.6; Efesios 1.13-14; 4.30; 5.18; 1 Tesalonicenses 5.19; 1 Timoteo 3.16; 4.1; 2 Timoteo 1.14; 3.16; Hebreos 9.8,14; 2 Pedro 1.21; 1 Juan 4.13; 5.6-7; Apocalipsis 1.10: 22.17.',
            },
          },
          references: '',
        },
        mankind: {
          title: 'III. El hombre',
          content: 'El hombre es la creación especial de Dios, hecho a su propia imagen. Él los creó hombre y mujer como la corona de su creación. La dádiva del género es por tanto parte de la bondad de la creación de Dios. En el principio el hombre era inocente y fue dotado por Dios con la libertad para elegir. Por su propia decisión el hombre pecó contra Dios y trajo el pecado a la raza humana. Por medio de la tentación de Satanás el hombre transgredió el mandamiento de Dios, y cayó de su estado original de inocencia, por lo cual su posteridad heredó una naturaleza y un ambiente inclinado al pecado. Por tanto, tan pronto como son capaces de realizar una acción moral, se convierten en transgresores y están bajo condenación. Solamente la gracia de Dios puede traer al hombre a su compañerismo santo y capacitar al hombre para que cumpla el propósito creativo de Dios. La santidad de la personalidad humana es evidente en que Dios creó al hombre a su propia imagen, y en que Cristo murió por el hombre; por lo tanto, cada persona de cada raza posee absoluta dignidad y es digna del respeto y del amor Cristiano.',
          references: 'Génesis 1.26-30; 2.5, 7.18-22; 3; 9.6; Salmos 1; 8.3-6; 32.1-5; 51.5; Isaías 6.5; Jeremías 17.5; Mateo 16.26; Hechos 17.26-31; Romanos 1.19-32; 3.10-18,23; 5.6,12,19; 6.6; 7.14-25; 8.14-18,29; 1 Corintios 1.21-31; 15.19,21-22; Efesios 2.122; Colosenses 1.21-22; 3.9-11.',
        },
        salvation: {
          title: 'IV. Salvación',
          content: 'La salvación implica la redención total del hombre, y se ofrece gratuitamente a todos los que aceptan a Jesucristo como Señor y Salvador, quien por su propia sangre obtuvo redención eterna para el creyente. En su sentido más amplio la salvación incluye la regeneración, la justificación, la santificación, y la glorificación. No hay salvación aparte de la fe personal en Jesucristo como Señor.',
          subsections: {
            regeneration: {
              title: 'A. Regeneración',
              content: 'Regeneración, o el nuevo nacimiento, es una obra de la gracia de Dios por la cual los creyentes llegan a ser nuevas criaturas en Cristo Jesús. Es un cambio de corazón, obrado por el Espíritu Santo por medio de la convicción de pecado, al cual el pecador responde en arrepentimiento hacia Dios y fe en el Señor Jesucristo. El arrepentimiento y la fe son experiencias de gracia inseparables. El arrepentimiento es una genuina vuelta del pecado hacia Dios. La fe es la aceptación de Jesucristo y la dedicación de la personalidad total a Él como Señor y Salvador.',
            },
            justification: {
              title: 'B. Justificación',
              content: 'Justificación, es la obra de gracia de Dios y la completa absolución basada en los principios de su gracia hacia todos los pecadores que se arrepienten y creen en Cristo. La justificación coloca al creyente en una relación de paz y favor con Dios.',
            },
            sanctification: {
              title: 'C. Santificación',
              content: 'Santificación es la experiencia que comienza en la regeneración, mediante la cual el creyente es separado para los propósitos de Dios, y es capacitado para progresar hacia la madurez moral y espiritual por medio de la presencia del Espíritu Santo que mora en él. El crecimiento en gracia debe continuar durante toda la vida de la persona regenerada.',
            },
            glorification: {
              title: 'D. Glorificación',
              content: 'Glorificación es la culminación de la salvación y es el estado bendito y permanente del redimido.',
            },
          },
          references: 'Génesis 3.15; Ëxodo 3.14-17; 6.2-8; Mateo 1.21; 4.17; 16.21-26; 27.22-28.6; Lucas 1.68-69; 2.28-32; Juan 1.11-14,29; 3.3-21,36; 5.24; 10.9,28-29; 15.1-16; 17.17; Hechos 2.21; 4.12; 15.11; 16.30-31; 17.30-31; 20.32; Romanos 1.16-18; 2.4; 3.23-25; 4.3 y sgts.; 5.8-10; 6.1-23; 8.1-18,29-39; 10.9-10,13; 13.11-14; 1 Corintios 1.18, 30; 6.19-20; 15.10; 2 Corintios 5.17-20; Gálatas 2.20; 3.13; 5.2225; 6.15; Efesios 1.7; 2.8-22; 4.11-16; Filipenses 2.12-13; Colosenses 1.9-22; 3.1 y sgts.; 1 Tesalonicenses 15.23-24; 2 Timoteo 1.12; Tito 2.11-14; Hebreos 2.1-3; 5.89; 9.24-28; 11.1-12.8,14; Santiago 2.14-26; 1 Pedro 1.2-23; 1 Juan 1.6-2.11; Apocalipsis 3.20; 21.1-22.5.',
        },
        godsPurpose: {
          title: 'V. El Propósito de la Gracia de Dios',
          content: 'La elección es el propósito de la gracia de Dios, según el cual Él regenera, justifica, santifica y glorifica a los pecadores. Es consistente con el libre albedrío del hombre, e incluye todos los medios relacionados con el fin. Es la gloriosa expresión de la bondad soberana de Dios, y es infinitamente sabia, santa e inmutable. Excluye la jactancia y promueve la humildad. Todos los verdaderos creyentes perseveran hasta el fin. Aquellos a quienes Dios ha aceptado en Cristo y santificado por su Espíritu, jamás caerán del estado de gracia, sino que perseverarán hasta el fin. Los creyentes pueden caer en pecado por negligencia y tentación, por lo cual contristan al Espíritu, menoscaban sus virtudes y su bienestar, y traen reproche a la causa de Cristo y juicios temporales sobre sí mismos; sin embargo, ellos serán guardados por el poder de Dios mediante la fe para salvación.',
          references: 'Génesis 12.1-3; Éxodo 19.5-8; 1 Samuel 8.4-7,19-22; Isaías 5.1-7; Jeremías 31.31 y sgts.; Mateo 16.18-19; 21.28-45; 24.22,31; 25.34; Lucas 1.68-79; 2.29-32; 19.4144: 24.44-48; Juan 1.12-14; 3.16; 5.24; 6.44-45,65; 10.27-29; 15.16; 17.6,12.1718: Hechos 20.32; Romanos 5.9-10; 8.28-29; 10.12-15; 11.5-7,26-36; 1 Corintios 1.1-2; 15.24-28; Efesios 1.4-23; 2.1-10; 3.1-11; Colosenses 1.12-14; 2 Tesalonicenses 2.13-14; 2 Timoteo 1.12; 2.10,19; Hebreos 11.39-12.2; Santiago 1.12; 1 Pedro 1.2-5,13; 2.4-10; 1 Juan 1.7-9; 2.19; 3.2.',
        },
        church: {
          title: 'VI. La Iglesia',
          content: 'Una iglesia del Nuevo Testamento del Señor Jesucristo es una congregación local y autónoma de creyentes bautizados, asociados en un pacto en la fe y el compañerismo del evangelio; cumpliendo las dos ordenanzas de Cristo, gobernada por sus leyes, ejercitando los dones, derechos, y privilegios con los cuales han sido investidos por su Palabra, y que tratan de predicar el evangelio hasta los fines de la tierra. Cada congregación actúa bajo el señorío de Jesucristo por medio de procesos democráticos. En tal congregación cada miembro es responsable de dar cuentas a Jesucristo como Señor. Sus oficiales escriturales son pastores y diáconos. Aunque tanto los hombres como las mujeres son dotados para servir en la iglesia, el oficio de pastor está limitado a los hombres, como lo limita la Escritura. El Nuevo Testamento habla también de la iglesia como el Cuerpo de Cristo el cual incluye a todos los redimidos de todas las edades, creyentes de cada tribu, y lengua, y pueblo, y nación.',
          references: 'Mateo 16.15-19; 18.15-20; Hechos 2.41-42, 47; 5.11-14; 6.3-6; 14.23,27; 15.1-30; 16.5; 20.28; Romanos 1.7; 1 Corintios 1.2; 3.16; 5.4-5; 7.17; 9.13-14; 12, Efesios 1.22-23; 2.19-22; 3.8-11,21; 5.22-32; Filipenses 1.1; Colosenses 1.18; 1 Timoteo 2.9-14; 3.1-15; 4.14; Hebreos 11.39-40; 1 Pedro 5.1-4; Apocalipsis 2-3; 21.2-3.',
        },
        baptismSupper: {
          title: 'VII. El Bautismo y la Cena del Señor',
          content: 'El bautismo cristiano es la inmersión de un creyente en agua en el nombre del Padre, del Hijo, y del Espíritu Santo. Es un acto de obediencia que simboliza la fe del creyente en un Salvador crucificado, sepultado y resucitado, la muerte del creyente al pecado, la sepultura de la antigua vida, y la resurrección para andar en novedad de vida en Cristo Jesús. Es un testimonio de su fe en la resurrección final de los muertos. Como es una ordenanza de la iglesia, es un requisito que precede al privilegio de ser miembro de la iglesia y a participar en la Cena del Señor. La Cena del Señor es un acto simbólico de obediencia por el cual los miembros de la iglesia, al participar del pan y del fruto de la vid, conmemoran la muerte del Redentor y anuncian su segunda venida.',
          references: 'Mateo 3.13-17; 26.26-30; 28.19-20; Marcos 1.9-11; 14.22-26; Lucas 3.21-22; 22.19-20; Juan 3.23; Hechos 2.41-42; 8.35-39; 16.30.33; 20.7; Romanos 6.3-5; 1 Corintios 10.16,21; 11.23-29; Colosenses 2.12.',
        },
        lordDay: {
          title: 'VIII. El Día del Señor',
          content: 'El primer día de la semana es el Día del Señor. Es una institución cristiana que se debe observar regularmente. Conmemora la resurrección de Cristo de entre los muertos y debe incluir ejercicios de adoración y devoción espiritual, tanto públicos como privados. Las actividades en el Día del Señor deben estar de acuerdo con la conciencia Cristiana bajo el Señorío de Jesucristo.',
          references: 'Éxodo 20.8-11; Mateo 12.1-12; 28.1 y sgts.; Marcos 2.27-28; 16.1-7; Lucas 24.13,33-36; Juan 4.21-24; 20.1,19-28; Hechos 20.7; Romanos 14.5-10; 1 Corintios 16.1-2; Colosenses 2.16; 3.16; Apocalipsis 1.10.',
        },
        kingdom: {
          title: 'IX. El Reino',
          content: 'El Reino de Dios incluye tanto su soberanía general sobre el universo como su señorío particular sobre los hombres que voluntariamente lo reconocen como Rey. Particularmente el Reino es el reino de la salvación en el cual los hombres entran mediante su entrega a Jesucristo por medio de una fe y confianza semejante a la de un niño. Los Cristianos deben orar y trabajar para que venga el Reino y que la voluntad de Dios se haga en la tierra. La consumación final del Reino espera el regreso de Jesucristo y el fin de esta era.',
          references: 'Génesis 1.1; Isaías 9.6-7; Jeremías 23.5-6; Mateo 3.2; 4.8-10,23; 12.25-28; 13.152; 25.31-46; 26.29; Marcos 1.14-15; 9.1; Lucas 4.43; 8.1; 9.2; 12.31-32; 17.2021; 23.42; Juan 3.3; 18.36; Hechos 1.6-7; 17.22-31; Romanos 5.17; 8.19; 1 Corintios 15.24-28; Colosenses 1.13; Hebreos 11.10,16; 12.28; 1 Pedro 2.4-10; 4.13; Apocalipsis 1.6,9; 5.10; 11.15; 21- 22.',
        },
        lastThings: {
          title: 'X. Las Últimas Cosas',
          content: 'Dios, en su propio tiempo y en su propia manera, traerá el mundo a su fin apropiado. De acuerdo a su promesa, Jesucristo regresará a la tierra en gloria de manera personal y visible; los muertos resucitarán; y Cristo juzgará a todos los hombres en justicia. Los injustos serán consignados al Infierno, el lugar del castigo eterno. Los justos en sus cuerpos resucitados y glorificados recibirán su recompensa y morarán para siempre en el Cielo con el Señor.',
          references: 'Isaías 2.4; Mateo 16.27; 18.8.9; 19.28; 24.27,30,36,44; 25.31-46; 26.64; Marcos 8.38; 9.43-48: Lucas 12.40,48; 16.19-26; 17.22-37; 21.27-28; Juan 14.1-3; Hechos 1.11; 17.31; Romanos 14.10; 1 Corintios 4.5; 15.24-28,35-58; 2 Corintios 5.10; Filipenses 3.20-21; Colosenses 1.5; 3.4; 1 Tesalonicenses 4.14-18; 5.1 y sgts. 2 Tesalonicenses 1.7 y sgts.; 2; 1 Timoteo 6.14; 2 Timoteo 4.1,8; Tito 2.13; Hebreos 9.27-28; Santiago 5.8; 2 Pedro 3.7 y sgts. 1 Juan 2.28; 3.2; Judas 14; Apocalipsis 1.18; 3.11; 20:1-22.13.',
        },
        evangelismMissions: {
          title: 'XI. Evangelismo y Misiones',
          content: 'Es deber y privilegio de cada seguidor de Cristo y de cada iglesia del Señor Jesucristo esforzarse por hacer discípulos de todas las naciones. El nuevo nacimiento del espíritu del hombre por el Espíritu Santo de Dios significa el nacimiento del amor a los demás. El esfuerzo misionero de parte de todos, por lo tanto, depende de una necesidad espiritual de la vida regenerada, y se expresa y ordena repetidamente en las enseñanzas de Cristo. El Señor Jesucristo ha ordenado que se predique el evangelio a todas las naciones. Es deber de cada hijo de Dios procurar constantemente ganar a los perdidos para Cristo mediante el testimonio personal apoyado por un estilo de vida Cristiano, y por otros métodos que estén en armonía con el evangelio de Cristo.',
          references: 'Génesis 12.1-3; Éxodo 19.5-6; Isaías 6.1-8; Mateo 9.37-38; 10.5-15; 13.18-30,3743; 16.19; 22.9-10; 24.14; 28.18-20; Lucas 10.1-18; 24.46-53; Juan 14.11-12; 15.7-8,16; 17.15; 20.21; Hechos 1.8; 2.; 8.26-40; 10.42-48; 13.2-3; Romanos 10.13-15; Efesios 3.1-11; 1 Tesalonicenses 1.8; 2 Timoteo 4.5; Hebreos 2.1-3; 11.39-12.2; 1 Pedro 2.4-10; Apocalipsis 22.17.',
        },
        education: {
          title: 'XII. Educación',
          content: 'El Cristianismo es la fe de la iluminación y la inteligencia. En Jesucristo habitan todos los tesoros de sabiduría y conocimiento. Todo conocimiento básico es, por lo tanto, una parte de nuestra herencia cristiana. El nuevo nacimiento abre todas las facultades humanas y crea sed de conocimiento. Por otra parte, la causa de la educación en el Reino de Cristo está coordinada con las causas de las misiones y de la beneficencia, y debe recibir juntamente con éstas el apoyo liberal de las iglesias. Un sistema adecuado de educación Cristiana es necesario para completar el programa espiritual del cuerpo de Cristo. En la educación Cristiana debe haber un balance apropiado entre la libertad académica y la responsabilidad académica. La libertad en cualquier relación humana ordenada es siempre limitada y nunca absoluta. La libertad de un maestro en una institución educacional Cristiana, escuela, colegio, universidad o seminario, está siempre limitada por la preeminencia de Jesucristo, la naturaleza autoritativa de las Escrituras, y por el propósito distintivo para el cual la escuela existe.',
          references: 'Deuteronomio 4.1,5,9,14; 6.1-10; 31.12-13; Nehemías 8.1-8; Job 28.28; Salmos 19.7 sgts. 119.11; Proverbios 3.13 y sgts.; 4.1-10; 8.1-7,11; 15.14; Eclesiastés 7.19; Mateo 5.2; 7.2 y sgts.; 28.19-20; Lucas 2.40; 1 Corintios 1.18-31; Efesios 4.11-16; Filipenses 4.8; Colosenses 2.3,8-9; 1 Timoteo 1.3-7; 2 Timoteo 2.15; 3.1417; Hebreos 5.12-6.3; Santiago 1.5; 3.17.',
        },
        stewardship: {
          title: 'XIII. Mayordomía',
          content: 'Dios es la fuente de todas las bendiciones, temporales y espirituales; todo lo que tenemos y somos se lo debemos a Él. Los Cristianos están endeudados espiritualmente con todo el mundo, un encargo santo en el evangelio, y una mayordomía obligatoria en sus posesiones. Por tanto, están bajo la obligación de servir a Dios con su tiempo, talentos y posesiones materiales; y deben reconocer que todo esto les ha sido confiado para que lo usen para la gloria de Dios y para ayudar a otros. De acuerdo con las Escrituras, los Cristianos deben contribuir de lo que tienen, alegre, regular, sistemática, proporcional y liberalmente para el progreso de la causa del Redentor en la tierra.',
          references: 'Génesis 14.20; Levítico 27.30-32; Deuteronomio 8.18; Malaquías 3.8-12; Mateo 6.1-4,19-21; 19.21; 23.23; 25.14-29; Lucas 12.16-21,42; 16.1-13; Hechos 2.44-47; 5.1-11; 17.24; 25.20-35; Romanos 6.6-22; 12.1-2; 1 Corintios 4.1-2; 6.19-20; 12; 16.1-4; 2 Corintios 8-9; 12.15; Filipenses 4.10-19; 1 Pedro 1.18-19.',
        },
        cooperation: {
          title: 'XIV. Cooperación',
          content: 'El pueblo de Cristo debe, según la ocasión lo requiera, organizar tales asociaciones y convenciones que puedan asegurar de la mejor manera posible la cooperación necesaria para lograr los grandes objetivos del Reino de Dios. Tales organizaciones no tienen autoridad una sobre otra ni sobre las iglesias. Ellas son organizaciones voluntarias para aconsejar, para descubrir, combinar y dirigir las energías de nuestro pueblo de la manera más eficaz. Los miembros de las iglesias del Nuevo Testamento deben cooperar unos con otros en llevar adelante los ministerios misioneros, educacionales y benevolentes para la extensión del Reino de Cristo. La unidad Cristiana en el sentido del Nuevo Testamento, es armonía espiritual y cooperación voluntaria para fines comunes por varios grupos del pueblo de Cristo. La cooperación entre las denominaciones Cristianas es deseable, cuando el propósito que se quiere alcanzar se justifica en sí mismo, y cuando tal cooperación no incluye violación alguna a la conciencia ni compromete la lealtad a Cristo y su Palabra como se revela en el Nuevo Testamento.',
          references: 'Éxodo 17.12; 18.17 y sgts.; Jueces 7.21; Esdras 1.3-4; 2.68-69; 5.14-15; Nehemías 4; 8.1-5; Mateo 10.5-15; 20.1-16; 22.1-10; 28.19-20; Marcos 2.3; Lucas 10.1 y sgts.; Hechos 1.13-14; 2.1 y sgts.; 4.31-37; 13.2-3; 15.1-35; 1 Corintios 1.10-17; 3.5-15; 12;2 Corintios 8 y 9; Gálatas 1.6-10; Efesios 4.1-16; Filipenses 1.15-18.',
        },
        socialOrder: {
          title: 'XV. El Cristiano y el Orden Social',
          content: 'Todos los Cristianos están bajo la obligación de procurar hacer que la voluntad de Cristo sea soberana en nuestras propias vidas y en la sociedad humana. Los medios y los métodos usados para mejorar la sociedad y para el establecimiento de la justicia entre los hombres pueden ser verdadera y permanentemente útiles solamente cuando están enraizados en la regeneración del individuo por medio de la gracia salvadora de Dios en Jesucristo. En el espíritu de Cristo, los cristianos deben oponerse al racismo, a toda forma de codicia, egoísmo, vicio, a todas las formas de inmoralidad sexual, incluyendo el adulterio, la homosexualidad y la pornografía. Nosotros debemos trabajar para proveer para los huérfanos, los necesitados, los abusados, los ancianos, los indefensos y los enfermos. Debemos hablar a favor de los que no han nacido y luchar por la santidad de toda la vida humana desde la concepción hasta la muerte natural. Cada cristiano debe procurar hacer que la industria, el gobierno y la sociedad como un todo estén regidos por los principios de la justicia, la verdad y el amor fraternal. Para promover estos fines los Cristianos deben estar dispuestos a trabajar con todos los hombres de buena voluntad en cualquier causa, siendo siempre cuidadosos de actuar en el espíritu de amor sin comprometer su lealtad a Cristo y a su verdad.',
          references: 'Éxodo 20.3-17; Levítico 6.2-5; Deuteronomio 10.12; 27.17; Salmos 101.5; Miqueas 6.8; Zacarías 8.16; Mateo 5.13-16,43-48; 22.36-40; 25.35; Marcos 1.29-34; 2.3 y sgts.; 10.21; Lucas 4.18-21; 10.27-37; 20.25; Juan 15.12; 17.15; Romanos 12-14; 1 Corintios 5.9-10; 6.1-7; 7.20-24; 10.23-11-1; Gálatas 3.26-28; Efesios 6.5-9; Colosenses 3.12-17; 1 Tesalonicenses 3.12; Filemón; Santiago 1.27; 2.8.',
        },
        peaceWar: {
          title: 'XVI. Paz y Guerra',
          content: 'Es el deber de todo cristiano buscar la paz con todos los hombres basándose en los principios de justicia. De acuerdo con el espíritu y las enseñanzas de Cristo, ellos deben hacer todo lo que esté de su parte para poner fin a la guerra. El verdadero remedio al espíritu guerrero es el evangelio de nuestro Señor. La necesidad suprema del mundo es la aceptación de sus enseñanzas en todas las relaciones de hombres y naciones, y la aplicación práctica de su ley de amor. Las personas Cristianas en todo el mundo deben orar por el reino del Príncipe de Paz.',
          references: 'Isaías 2.4; Mateo 5.9,38-48; 6.33; 26.52; Lucas 22.36,38; Romanos 12.18-19; 13.1-7; 14.19; Hebreos 12.14; Santiago 4.1-2.',
        },
        religiousFreedom: {
          title: 'XVII. Libertad Religiosa',
          content: 'Solamente Dios es Señor de la conciencia, y Él la ha dejado libre de las doctrinas y de los mandamientos de hombres que son contrarios a su Palabra o no contenidos en ella. La iglesia y el estado deben estar separados. El estado debe protección y completa libertad a toda iglesia en el ejercicio de sus fines espirituales. Al proveer tal libertad ningún grupo eclesiástico o denominación debe ser favorecida por el estado sobre otros grupos. Como el gobierno civil es ordenado por Dios, es deber de los Cristianos rendirle obediencia leal en todas las cosas que no son contrarias a la voluntad revelada de Dios. La iglesia no debe recurrir al poder civil para realizar su obra. El evangelio de Cristo considera solamente los medios espirituales para alcanzar sus fines. El estado no tiene derecho a imponer penalidades por opiniones religiosas de cualquier clase. El estado no tiene derecho a imponer impuestos para el sostenimiento de ninguna forma de religión. El ideal cristiano es el de una iglesia libre en un estado libre, y esto implica el derecho para todos los hombres del acceso libre y sin obstáculos a Dios, y el derecho a formar y propagar opiniones en la esfera de la religión, sin interferencia por parte del poder civil.',
          references: 'Génesis 1.27; 2.7; Mateo 6.6-7,24; 16.26; 22.21; Juan 8.36; Hechos 4.19-20; Romanos 6.1-2; 13.1-7; Gálatas 5.1,13; Filipenses 3.20; 1 Timoteo 2.1-2; Santiago 4.12; 1 Pedro 2.12-17; 3.11-17; 4.12.19.',
        },
        family: {
          title: 'XVIII. La Familia',
          content: 'Dios ha ordenado la familia como la institución fundamental de la sociedad humana. Está compuesta por personas relacionadas unas con otras por matrimonio, sangre o adopción. El matrimonio es la unión de un hombre y una mujer en un pacto de compromiso por toda la vida. Es el don único de Dios para revelar la unión entre Cristo y Su iglesia y para proveer para el hombre y la mujer en el matrimonio un medio para compañerismo íntimo, el canal para la expresión sexual de acuerdo a los patrones bíblicos, y los medios para la procreación de la raza humana. El esposo y la esposa tienen el mismo valor delante de Dios, puesto que ambos fueron creados a la imagen de Dios. La relación matrimonial modela la forma como Dios se relaciona con su pueblo. Un esposo debe amar a su esposa como Cristo amó a la iglesia. Él tiene la responsabilidad dada por Dios de proveer, proteger y dirigir a su familia. Una esposa debe someterse con gracia al liderazgo como siervo de su esposo, así como la iglesia se sujeta voluntariamente a la dirección de Cristo. Ella, siendo creada a la imagen de Dios como lo es su marido, y por tanto igual a él, tiene la responsabilidad dada por Dios de respetar a su marido y servirle de ayuda en la administración del hogar y la educación de la próxima generación. Los niños, desde el momento de la concepción, son una bendición y herencia del Señor. Los padres deben demostrar a sus hijos el modelo de Dios para el matrimonio. Los padres deben enseñar a sus hijos los valores espirituales y morales, y dirigirlos, mediante el ejemplo de un estilo de vida consistente y una disciplina amorosa, para que hagan decisiones basadas en la verdad bíblica. Los hijos deben honrar y obedecer a sus padres.',
          references: 'Génesis 1.26-28; 2.15-25; 3.1-20; Éxodo 20.12; Deuteronomio 6.4-9; Josué 24.15; 1 Samuel 1.26-28; Salmos 51.5; 78.1-8; 127; 128; 139.13-16; Proverbios 1.8; 5.1520; 6.20-22; 12.4; 13.24; 14.1; 17.6; 18.22; 22.6,15; 23.13-14; 24.3: 29.15,17; 31.10-31; Eclesiastés 4.9-12; 9.9; Malaquías 2.14-16; Mateo 5.31-32; 18.2-5; 19.3-9; Marcos 10.6-12; Romanos 1.18-32; 1 Corintios 7.1-16; Efesios 5.21-33; 6.1-4; Colosenses 3.18-21; 1 Timoteo 5.8,14; 2 Timoteo 1.3-5; Tito 2.3-5;',
        },
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
      nav: {
        startHere: 'Comece',
        goDeeper: 'Aprofunde',
        findCommunity: 'Comunidade',
        aboutUs: 'Sobre Nós',
        whatIsGospel: 'O que é o Evangelho?',
        whoIsJesus: 'Quem é Jesus?',
        testimonies: 'Testemunhos',
        firstSteps: 'Primeiros Passos',
        bibleStudies: 'Estudos Bíblicos',
        apologetics: 'Apologética',
        sharingFaith: 'Compartilhe sua Fé',
        findMentor: 'Encontre Mentor',
        findChurch: 'Encontre Igreja',
        chat: 'Chat',
        beliefs: 'Crenças',
        whoWeAre: 'Quem Somos',
        contact: 'Contato',
      },
      footer: {
        tagline: 'Luz para o seu caminho. Explorando a mensagem que transforma vidas.',
        rights: 'Todos os direitos reservados.',
        sharing: 'Compartilhando esperança e verdade',
      },
      auth: {
        signIn: 'Entrar',
        signUp: 'Cadastrar',
        signOut: 'Sair',
        modal: {
          titleSignIn: 'Entrar',
          titleSignUp: 'Criar conta',
          nameLabel: 'Nome',
          emailLabel: 'E-mail',
          passwordLabel: 'Senha',
          submitSignIn: 'Entrar',
          submitSignUp: 'Criar conta',
          loading: 'Carregando...',
          toggleToSignIn: 'Já tem uma conta? Entre',
          toggleToSignUp: 'Não tem uma conta? Cadastre-se',
          tipTitle: 'Dica:',
          tipBody: 'Você pode estudar sem criar uma conta. Ao se cadastrar, você pode salvar seu progresso e se conectar com um missionário.',
          successSignUp: 'Conta criada! Por favor, verifique seu e-mail para confirmar sua conta.',
          errors: {
            generic: 'Ocorreu um erro',
            emailNotConfirmed: 'Por favor, confirme seu e-mail. Verifique sua caixa de entrada.',
            invalidLogin: 'E-mail ou senha incorretos.',
            alreadyRegistered: 'Este e-mail já está cadastrado.',
            passwordTooShort: 'A senha deve ter pelo menos 6 caracteres.',
            invalidEmail: 'E-mail inválido.',
            rateLimit: 'Muitas tentativas. Por favor, aguarde alguns minutos.',
          },
        },
      }
    },
    metadata: {
      title: 'Caminando Juntos - Conheça a Jesus',
      description: 'Descubra quem é Jesus através de estudos bíblicos, artigos e recursos espirituais em português.',
      keywords: ['Jesus', 'evangelho', 'estudos bíblicos', 'fé cristã', 'português'],
    },
    home: {
      hero: {
        title: 'Uma Jornada de Descoberta',
        subtitle: 'Explore quem é Jesus, aprofunde sua compreensão e encontre uma comunidade onde pertencer.',
        cta: 'Comece sua Jornada',
      },
      journey: {
        title: 'Sua Jornada de Fé',
        subtitle: 'Guiamos você passo a passo da curiosidade à comunidade',
      },
      step1: {
        badge: 'Passo 1',
        title: 'Explore as Afirmações de Cristo',
        description: 'Tem perguntas sobre Jesus? Comece aqui. Descubra quem ele afirmou ser, por que veio e o que isso significa para sua vida. Explore a mensagem do evangelho e ouça testemunhos de pessoas cujas vidas foram transformadas.',
        cta: 'Comece a Explorar',
      },
      step2: {
        badge: 'Passo 2',
        title: 'Aprofunde sua Compreensão',
        description: 'Pronto para aprender mais? Mergulhe em estudos bíblicos que ajudarão você a entender melhor sua fé. Explore respostas para perguntas difíceis e aprenda como comunicar o que você acredita aos outros.',
        cta: 'Comece a Aprender',
      },
      step3: {
        badge: 'Passo 3',
        title: 'Viva a Fé em Comunidade',
        description: 'A fé não foi projetada para ser vivida sozinha. Conecte-se com um mentor que possa guiá-lo, encontre uma igreja local onde pertencer, ou fale com um cristão que possa responder suas perguntas.',
        cta: 'Encontre Comunidade',
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
    articlePage: {
      notFoundTitle: 'Artigo não encontrado',
      defaultDescription: 'Leia {title} no Caminando Juntos - artigos que inspiram fé.',
      defaultKeywords: ['artigo cristão', 'fé', 'evangelho'],
      defaultAuthor: 'Caminando Juntos',
      breadcrumbs: {
        home: 'Início',
        articles: 'Artigos',
      },
      audioLabel: 'Resumo em áudio',
      audioUnsupported: 'Seu navegador não suporta o elemento de áudio.',
      backToArticles: 'Voltar para artigos',
    },
    testimoniesPage: {
      backToIndex: 'Voltar para testemunhos',
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
    churches: {
      title: 'Encontre uma Igreja',
      subtitle: 'Procure igrejas no seu país e filtre por cidade para encontrar uma comunidade perto de você.',
      filterCity: 'Cidade',
      allCities: 'Todas as cidades',
      contactWhatsapp: 'WhatsApp',
      contactCall: 'Ligar',
      website: 'Site',
      loading: 'Carregando...',
      emptyTitle: 'Nenhuma igreja disponível',
      emptyMessage: 'Não encontramos igrejas na sua região no momento.',
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
      previous: 'Anterior',
      next: 'Próxima',
      cta: {
        title: 'Novo nos estudos bíblicos?',
        description: 'Se é sua primeira vez estudando a Bíblia, recomendamos começar com "Conhecendo a Jesus". Este estudo lhe dará uma base sólida para entender quem é Jesus e por que ele é importante para sua vida.',
        button1: 'Começar com "O Plano de Salvação"',
        button2: 'Ler artigos primeiro',
      },
    },
    gospel: {
      videoId: '18B-21odNpY',
      title: 'O que é o Evangelho?',
      subtitle: 'Descubra a mensagem central da fé cristã: as boas novas que mudam vidas',
      problem: {
        title: 'O Problema',
        description: 'Todos nós pecamos e estamos separados de Deus. Por nossos próprios esforços, não podemos alcançar a perfeição que Deus requer.',
        verse: '"Pois todos pecaram e estão destituídos da glória de Deus" - Romanos 3:23',
      },
      solution: {
        title: 'A Solução',
        description: 'Deus nos amou tanto que enviou seu Filho Jesus para morrer na cruz por nossos pecados. Através de Seu sacrifício, podemos ser perdoados e reconciliados com Deus.',
        verse: '"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito" - João 3:16',
      },
      response: {
        title: 'Nossa Resposta',
        description: 'Para receber este presente de salvação, devemos nos arrepender de nossos pecados, crer em Jesus e segui-lo como Senhor de nossas vidas.',
        verse: '"Se você confessar com a sua boca que Jesus é Senhor... será salvo" - Romanos 10:9',
      },
      cta: {
        title: 'Pronto para dar o próximo passo?',
        subtitle: 'Explore como você pode crescer em sua fé e se conectar com uma comunidade',
        firstSteps: 'Primeiros Passos',
        studies: 'Ver Estudos Bíblicos',
        findChurch: 'Encontre uma Igreja',
      },
    },
     whoIsJesus: {
      videoId: 'dknI8gax1eA',
      title: 'Quem é Jesus?',
      subtitle: 'Conheça o Filho de Deus que veio para mudar sua vida para sempre',
      deity: {
        title: 'Deus Feito Homem',
        description: 'Jesus não foi apenas um bom mestre ou profeta. Ele é o próprio Deus que se fez homem para viver entre nós, mostrando o amor perfeito do Pai.',
        verse: '"No princípio era o Verbo... e o Verbo era Deus" - João 1:1',
      },
      purpose: {
        title: 'Sua Missão',
        description: 'Jesus veio à terra com um propósito: nos resgatar do pecado e restaurar nosso relacionamento com Deus através de seu sacrifício na cruz.',
        verse: '"O Filho do Homem veio buscar e salvar o que estava perdido" - Lucas 19:10',
      },
      victory: {
        title: 'Vivo e Reinando',
        description: 'Jesus não ficou no túmulo. Ele ressuscitou no terceiro dia, vencendo a morte e o pecado. Hoje Ele está vivo, reinando e oferecendo vida eterna a todos que creem nEle.',
        verse: '"Eu sou... aquele que vive; estive morto, mas eis que estou vivo pelos séculos dos séculos" - Apocalipse 1:18',
      },
      cta: {
        title: 'Quer conhecer mais sobre Jesus?',
        subtitle: 'Descubra como você pode ter um relacionamento pessoal com Ele',
        gospel: 'O que é o Evangelho?',
        studies: 'Estudos sobre Jesus',
        findChurch: 'Encontre uma Igreja',
      },
    },
    beliefs: {
      title: 'Nossas Crenças',
      subtitle: 'Conheça os princípios fundamentais de nossa fé cristã',
      sections: {
        scriptures: {
          title: 'I. As Escrituras',
          content: 'A Santa Bíblia foi escrita por homens divinamente inspirados e é a revelação que Deus faz de si mesmo ao homem. É um tesouro perfeito de instrução divina. Tem a Deus como seu autor, seu propósito é a salvação, e seu tema é a verdade, sem mistura alguma de erro. Portanto, toda a Escritura é totalmente verdadeira e confiável. Ela revela os princípios pelos quais Deus nos julga, e portanto é e permanecerá sendo até o fim do mundo, o centro verdadeiro da união Cristã, e a norma suprema pela qual toda conduta, credos, e opiniões religiosas humanas devem ser julgados. Toda a Escritura é um testemunho de Jesus, que é Ele mesmo o centro da revelação divina.',
          references: 'Êxodo 24.4; Deuteronômio 4.1-2; 17.19; Josué 8.34; Salmos 19.7-10; 119.11, 89, 105, 140; Isaías 34.16; 40.8; Jeremias 15.16; 36.1-32; Mateus 5.17-18; 22.29; Lucas 21.33; 24.44-46; João 5.39; 16.13-15; 17.17; Atos 2.16 e segs.; 17.11; Romanos 15.4; 16.25-26; 2 Timóteo 3.15-17; Hebreus 1.1-2; 4.12; 1 Pedro 1.25, 2 Pedro 1.19-21.',
        },
        god: {
          title: 'II. Deus',
          content: 'Há um Deus, e somente um, vivo e verdadeiro. Ele é um Ser inteligente, espiritual e pessoal, o Criador, Redentor, Preservador e Governador do universo. Deus é infinito em santidade e em todas as outras perfeições. Deus é todo-poderoso e onisciente; e seu conhecimento perfeito se estende a todas as coisas, passadas, presentes e futuras, incluindo as decisões futuras de suas criaturas livres. Dele devemos o amor mais elevado, reverência e obediência. O Deus eterno e trino se revela a si mesmo como Pai, Filho e Espírito Santo, com distintos atributos pessoais, mas sem divisão de natureza, essência ou ser.',
          subsections: {
            father: {
              title: 'A. Deus o Pai',
              content: 'Deus como Pai reina com cuidado providencial sobre todo seu universo, suas criaturas, e o fluir da corrente da história humana de acordo com os propósitos de sua graça. Ele é todo-poderoso, onisciente, todo amor, e totalmente sábio. Deus é Pai em verdade de todos aqueles que chegam a ser seus filhos por meio da fé em Cristo Jesus. Ele é paternal em sua atitude hacia todos os homens.',
              references: 'Gênesis 1.1; 2.7; Êxodo 3.14; 6.2-3; 15.11 e segs.; 20.1 e segs.; Levítico 22.2; Deuteronômio 6.4; 32.6; 1 Crônicas 29.10; Salmos 19.1-3; Isaías 43.3,15; 64.8; Jeremias 10.10; 17.13; Mateus 6.9 e segs.; 7.11; 23.9; 28.19; Marcos 1.9-11; João 4.24; 5.26; 14.6-13; 17.1-8; Atos 1.7; Romanos 8.14-15; 1 Coríntios 8.6; Gálatas 4.6; Efésios 4.6; Colossenses 1.15; 1 Timóteo 1.17; Hebreus 11.6; 12.9; 1 Pedro 1.17; 1 João 5.7.',
            },
            son: {
              title: 'B. Deus o Filho',
              content: 'Cristo é o Filho eterno de Deus. Em sua encarnação como Jesus foi concebido do Espírito Santo e nascido da virgem Maria. Jesus revelou e cumpriu perfeitamente a vontade de Deus, tomando sobre si mesmo a natureza humana com suas demandas e necessidades e se identificando completamente com a humanidade, mas sem pecado. Ele honrou a lei divina por sua obediência pessoal, e em sua morte substitutória na cruz, Ele fez provisão para a redenção dos homens do pecado. Ele foi levantado de entre os mortos com um corpo glorificado e apareceu a seus discípulos como a pessoa que estava com eles antes de sua crucificação. Ele ascendeu aos céus e está agora exaltado à direita de Deus onde Ele é o Único Mediador, completamente Deus, completamente homem, em cuja Pessoa se efetuou a reconciliação entre Deus e o homem. Ele voltará com poder e glória para julgar o mundo e consumar sua missão redentora. Ele mora agora em todos os crentes como o Senhor vivo e onisciente.',
              references: 'Gênesis 18.1 e segs.; Salmos 2.7 e segs.; 110.1 e segs.; Isaías 7.14; 53; Mateus 1.18-23; 3.17; 8.29; 11.27; 14.33; 16.16,27; 17.5; 27; 28.1-6,19; Marcos 1.1; 3.11, Lucas 1.35; 4.41; 22.70; 24.46; João 1.1-18,29; 10.30,38; 11.25-27; 12.44-50; 14.7-11; 16.15-16,28; 17.1-5,21-22; 20.1-20,28; Atos 1.9; 2.22-24; 7.55-56; 9.45,20; Romanos 1.3-4; 3.23-26; 5.6-21; 8.1-3,34; 10.4; 1 Coríntios 1.30; 2.2; 8.6; 15.1-8, 24-28; 2 Coríntios 5.19-21; 8.9; Gálatas 4.4-5; Efésios 1.20; 3.11; 4.7-10; Filipenses 2.5-11; Colossenses 1.13-22; 2.9; 1 Tessalonicenses 4.14-18; 1 Timóteo 2.5-6; 3.16; Tito 2.13-14; Hebreus 1.1-3; 4.14-15; 7.14-28; 9.12-15, 24-28; 12.2; 13.8; 1 Pedro 2.21-25; 3.22; 1 João 1.7-9; 3.2; 4.14-15; 5.9; 2 João 7-9; Apocalipse 1.13-16; 5.9-14; 12.10-11; 13.8; 19.16.',
            },
            holySpirit: {
              title: 'C. Deus, o Espírito Santo',
              content: 'O Espírito Santo é o Espírito de Deus, completamente divino. Ele inspirou santos homens da antiguidade para que escrevessem as Escrituras. Mediante a iluminação Ele capacita os homens para entender a verdade. Ele exalta a Cristo. Ele convence os homens de pecado, de justiça, e de juízo. Ele chama os homens ao Salvador, e efetua a regeneração. No momento da regeneração Ele batiza cada crente no Corpo de Cristo. Ele cultiva o caráter cristão, conforta os crentes, e lhes dá os dons espirituais por meio dos quais eles servem a Deus mediante sua igreja. Ele sela o crente para o dia da redenção final. Sua presença no cristão é a garantia de que Deus levará o crente até alcançar a plenitude da estatura de Cristo. Ele ilumina e dá poder ao crente e à igreja em adoração, evangelismo, e serviço.',
              references: 'Gênesis 1.2; Juízes 14.6; Jó 26.13; Salmos 51.11; 139.7 e segs. Isaías 61.1-3; Joel 2.28-32; Mateus 1.18; 3.16; 4.1; 12.28-32; 28.19; Marcos 1.10,12; Lucas 1.35; 4.1, 18-19; 11.13; 12.12; 24.49; João 4.24; 14.16-17,26; 15.26; 16.7-14; Atos 1.8; 2.1-4,38; 4.31; 5.3; 6.3; 7.55; 8.17,39; 10.44; 13.2; 15.28; 16.6; 19.1-6; Romanos 8.9-11,14-16,26-27; 1 Coríntios 2.10-14; 3.16; 12.3-11,13; Gálatas 4.6; Efésios 1.13-14; 4.30; 5.18; 1 Tessalonicenses 5.19; 1 Timóteo 3.16; 4.1; 2 Timóteo 1.14; 3.16; Hebreus 9.8,14; 2 Pedro 1.21; 1 João 4.13; 5.6-7; Apocalipse 1.10: 22.17.',
            },
          },
          references: '',
        },
        mankind: {
          title: 'III. O Homem',
          content: 'O homem é a criação especial de Deus, feito à sua própria imagem. Ele os criou homem e mulher como a coroa de sua criação. O dom do gênero é portanto parte da bondade da criação de Deus. No princípio o homem era inocente e foi dotado por Deus com a liberdade para escolher. Por sua própria decisão o homem pecou contra Deus e trouxe o pecado à raça humana. Por meio da tentação de Satanás o homem transgrediu o mandamento de Deus, e caiu de seu estado original de inocência, pelo qual sua posteridade herdou uma natureza e um ambiente inclinado ao pecado. Portanto, assim que são capazes de realizar uma ação moral, se tornam transgressores e estão sob condenação. Somente a graça de Deus pode trazer o homem a sua comunhão santa e capacitar o homem para que cumpra o propósito criativo de Deus. A santidade da personalidade humana é evidente em que Deus criou o homem à sua própria imagem, e em que Cristo morreu pelo homem; portanto, cada pessoa de cada raça possui absoluta dignidade e é digna do respeito e do amor Cristão.',
          references: 'Gênesis 1.26-30; 2.5, 7.18-22; 3; 9.6; Salmos 1; 8.3-6; 32.1-5; 51.5; Isaías 6.5; Jeremias 17.5; Mateus 16.26; Atos 17.26-31; Romanos 1.19-32; 3.10-18,23; 5.6,12,19; 6.6; 7.14-25; 8.14-18,29; 1 Coríntios 1.21-31; 15.19,21-22; Efésios 2.1-22; Colossenses 1.21-22; 3.9-11.',
        },
        salvation: {
          title: 'IV. Salvação',
          content: 'A salvação envolve a redenção total do homem, e é oferecida gratuitamente a todos os que aceitam a Jesus Cristo como Senhor e Salvador, que por seu próprio sangue obteve redenção eterna para o crente. Em seu sentido mais amplo a salvação inclui a regeneração, a justificação, a santificação, e a glorificação. Não há salvação além da fé pessoal em Jesus Cristo como Senhor.',
          subsections: {
            regeneration: {
              title: 'A. Regeneração',
              content: 'Regeneração, ou o novo nascimento, é uma obra da graça de Deus pela qual os crentes chegam a ser novas criaturas em Cristo Jesus. É uma mudança de coração, operada pelo Espírito Santo por meio da convicção de pecado, ao qual o pecador responde em arrependimento para com Deus e fé no Senhor Jesus Cristo. O arrependimento e a fé são experiências de graça inseparáveis. O arrependimento é um verdadeiro retorno do pecado para Deus. A fé é a aceitação de Jesus Cristo e a dedicação de toda a personalidade a Ele como Senhor e Salvador.',
            },
            justification: {
              title: 'B. Justificação',
              content: 'Justificação, é a obra de graça de Deus e a completa absolvição baseada nos princípios de sua graça hacia todos os pecadores que se arrependem e creem em Cristo. A justificação coloca o crente em um relacionamento de paz e favor com Deus.',
            },
            sanctification: {
              title: 'C. Santificação',
              content: 'Santificação é a experiência que começa na regeneração, mediante a qual o crente é separado para os propósitos de Deus, e é capacitado para progredir hacia a maturidade moral e espiritual por meio da presença do Espírito Santo que habita nele. O crescimento em graça deve continuar durante toda a vida da pessoa regenerada.',
            },
            glorification: {
              title: 'D. Glorificação',
              content: 'Glorificação é a culminação da salvação e é o estado bendito e permanente do redimido.',
            },
          },
          references: 'Gênesis 3.15; Êxodo 3.14-17; 6.2-8; Mateus 1.21; 4.17; 16.21-26; 27.22-28.6; Lucas 1.68-69; 2.28-32; João 1.11-14,29; 3.3-21,36; 5.24; 10.9,28-29; 15.1-16; 17.17; Atos 2.21; 4.12; 15.11; 16.30-31; 17.30-31; 20.32; Romanos 1.16-18; 2.4; 3.23-25; 4.3 e segs.; 5.8-10; 6.1-23; 8.1-18,29-39; 10.9-10,13; 13.11-14; 1 Coríntios 1.18, 30; 6.19-20; 15.10; 2 Coríntios 5.17-20; Gálatas 2.20; 3.13; 5.22-25; 6.15; Efésios 1.7; 2.8-22; 4.11-16; Filipenses 2.12-13; Colossenses 1.9-22; 3.1 e segs.; 1 Tessalonicenses 5.23-24; 2 Timóteo 1.12; Tito 2.11-14; Hebreus 2.1-3; 5.8-9; 9.24-28; 11.1-12.8,14; Tiago 2.14-26; 1 Pedro 1.2-23; 1 João 1.6-2.11; Apocalipse 3.20; 21.1-22.5.',
        },
        godsPurpose: {
          title: 'V. O Propósito da Graça de Deus',
          content: 'A eleição é o propósito da graça de Deus, segundo o qual Ele regenera, justifica, santifica e glorifica aos pecadores. É consistente com o livre arbítrio do homem, e inclui todos os meios relacionados ao fim. É a expressão gloriosa da bondade soberana de Deus, e é infinitamente sábia, santa e imutável. Exclui a jactância e promove a humildade. Todos os verdadeiros crentes perseveram até o fim. Aqueles a quem Deus aceitou em Cristo e santificou por seu Espírito, nunca cairão do estado de graça, mas perseverarão até o fim. Os crentes podem cair em pecado por negligência e tentação, pelo qual contristam o Espírito, diminuem suas virtudes e seu bem-estar, e trazem censura à causa de Cristo e julgamentos temporais sobre si mesmos; entretanto, eles serão guardados pelo poder de Deus mediante a fé para salvação.',
          references: 'Gênesis 12.1-3; Êxodo 19.5-8; 1 Samuel 8.4-7,19-22; Isaías 5.1-7; Jeremias 31.31 e segs.; Mateus 16.18-19; 21.28-45; 24.22,31; 25.34; Lucas 1.68-79; 2.29-32; 19.41-44: 24.44-48; João 1.12-14; 3.16; 5.24; 6.44-45,65; 10.27-29; 15.16; 17.6,12.17-18: Atos 20.32; Romanos 5.9-10; 8.28-29; 10.12-15; 11.5-7,26-36; 1 Coríntios 1.1-2; 15.24-28; Efésios 1.4-23; 2.1-10; 3.1-11; Colossenses 1.12-14; 2 Tessalonicenses 2.13-14; 2 Timóteo 1.12; 2.10,19; Hebreus 11.39-12.2; Tiago 1.12; 1 Pedro 1.2-5,13; 2.4-10; 1 João 1.7-9; 2.19; 3.2.',
        },
        church: {
          title: 'VI. A Igreja',
          content: 'Uma igreja do Novo Testamento do Senhor Jesus Cristo é uma congregação local e autônoma de crentes batizados, associados em um pacto na fé e na comunhão do evangelho; cumprindo as duas ordenanças de Cristo, governada por suas leis, exercitando os dons, direitos, e privilégios com os quais foram investidos por sua Palavra, e que se empenham em pregar o evangelho até os confins da terra. Cada congregação age sob o senhorio de Jesus Cristo por meio de processos democráticos. Em tal congregação cada membro é responsável de prestar contas a Jesus Cristo como Senhor. Seus oficiais bíblicos são pastores e diáconos. Embora tanto homens quanto mulheres sejam dotados para servir na igreja, o ofício de pastor está limitado aos homens, como limita a Escritura. O Novo Testamento também fala da igreja como o Corpo de Cristo o qual inclui a todos os redimidos de todas as idades, crentes de cada tribo, e língua, e povo, e nação.',
          references: 'Mateus 16.15-19; 18.15-20; Atos 2.41-42, 47; 5.11-14; 6.3-6; 14.23,27; 15.1-30; 16.5; 20.28; Romanos 1.7; 1 Coríntios 1.2; 3.16; 5.4-5; 7.17; 9.13-14; 12, Efésios 1.22-23; 2.19-22; 3.8-11,21; 5.22-32; Filipenses 1.1; Colossenses 1.18; 1 Timóteo 2.9-14; 3.1-15; 4.14; Hebreus 11.39-40; 1 Pedro 5.1-4; Apocalipse 2-3; 21.2-3.',
        },
        baptismSupper: {
          title: 'VII. O Batismo e a Ceia do Senhor',
          content: 'O batismo cristão é a imersão de um crente em água em nome do Pai, do Filho, e do Espírito Santo. É um ato de obediência que simboliza a fé do crente em um Salvador crucificado, sepultado e ressuscitado, a morte do crente ao pecado, o sepultamento da velha vida, e a ressurreição para andar em novidade de vida em Cristo Jesus. É um testemunho de sua fé na ressurreição final dos mortos. Como é uma ordenança da igreja, é um requisito que precede o privilégio de ser membro da igreja e participar da Ceia do Senhor. A Ceia do Senhor é um ato simbólico de obediência pelo qual os membros da igreja, ao participarem do pão e do fruto da vide, comemoram a morte do Redentor e anunciam sua segunda vinda.',
          references: 'Mateus 3.13-17; 26.26-30; 28.19-20; Marcos 1.9-11; 14.22-26; Lucas 3.21-22; 22.19-20; João 3.23; Atos 2.41-42; 8.35-39; 16.30.33; 20.7; Romanos 6.3-5; 1 Coríntios 10.16,21; 11.23-29; Colossenses 2.12.',
        },
        lordDay: {
          title: 'VIII. O Dia do Senhor',
          content: 'O primeiro dia da semana é o Dia do Senhor. É uma instituição cristã que deve ser observada regularmente. Comemora a ressurreição de Cristo de entre os mortos e deve incluir exercícios de adoração e devoção espiritual, tanto públicos quanto privados. As atividades no Dia do Senhor devem estar de acordo com a consciência Cristã sob o Senhorio de Jesus Cristo.',
          references: 'Êxodo 20.8-11; Mateus 12.1-12; 28.1 e segs.; Marcos 2.27-28; 16.1-7; Lucas 24.13,33-36; João 4.21-24; 20.1,19-28; Atos 20.7; Romanos 14.5-10; 1 Coríntios 16.1-2; Colossenses 2.16; 3.16; Apocalipse 1.10.',
        },
        kingdom: {
          title: 'IX. O Reino',
          content: 'O Reino de Deus inclui tanto sua soberania geral sobre o universo quanto seu senhorio particular sobre os homens que voluntariamente o reconhecem como Rei. Particularmente o Reino é o reino da salvação no qual os homens entram mediante sua entrega a Jesus Cristo por meio de uma fé e confiança semelhante à de uma criança. Os Cristãos devem orar e trabalhar para que venha o Reino e que a vontade de Deus seja feita na terra. A consumação final do Reino aguarda o retorno de Jesus Cristo e o fim desta era.',
          references: 'Gênesis 1.1; Isaías 9.6-7; Jeremias 23.5-6; Mateus 3.2; 4.8-10,23; 12.25-28; 13.1-52; 25.31-46; 26.29; Marcos 1.14-15; 9.1; Lucas 4.43; 8.1; 9.2; 12.31-32; 17.20-21; 23.42; João 3.3; 18.36; Atos 1.6-7; 17.22-31; Romanos 5.17; 8.19; 1 Coríntios 15.24-28; Colossenses 1.13; Hebreus 11.10,16; 12.28; 1 Pedro 2.4-10; 4.13; Apocalipse 1.6,9; 5.10; 11.15; 21-22.',
        },
        lastThings: {
          title: 'X. As Últimas Coisas',
          content: 'Deus, em seu próprio tempo e à sua própria maneira, levará o mundo ao seu fim apropriado. De acordo com sua promessa, Jesus Cristo voltará à terra em glória de maneira pessoal e visível; os mortos ressuscitarão; e Cristo julgará a todos os homens em justiça. Os injustos serão consignados ao Inferno, o lugar do castigo eterno. Os justos em seus corpos ressuscitados e glorificados receberão sua recompensa e habitarão para sempre no Céu com o Senhor.',
          references: 'Isaías 2.4; Mateus 16.27; 18.8-9; 19.28; 24.27,30,36,44; 25.31-46; 26.64; Marcos 8.38; 9.43-48: Lucas 12.40,48; 16.19-26; 17.22-37; 21.27-28; João 14.1-3; Atos 1.11; 17.31; Romanos 14.10; 1 Coríntios 4.5; 15.24-28,35-58; 2 Coríntios 5.10; Filipenses 3.20-21; Colossenses 1.5; 3.4; 1 Tessalonicenses 4.14-18; 5.1 e segs. 2 Tessalonicenses 1.7 e segs.; 2; 1 Timóteo 6.14; 2 Timóteo 4.1,8; Tito 2.13; Hebreus 9.27-28; Tiago 5.8; 2 Pedro 3.7 e segs. 1 João 2.28; 3.2; Judas 14; Apocalipse 1.18; 3.11; 20:1-22.13.',
        },
        evangelismMissions: {
          title: 'XI. Evangelismo e Missões',
          content: 'É dever e privilégio de cada seguidor de Cristo e de cada igreja do Senhor Jesus Cristo se esforçar para fazer discípulos de todas as nações. O novo nascimento do espírito do homem pelo Espírito Santo de Deus significa o nascimento do amor pelos outros. O esforço missionário de parte de todos, portanto, depende de uma necessidade espiritual da vida regenerada, e se expressa e ordena repetidamente nos ensinamentos de Cristo. O Senhor Jesus Cristo ordenou que o evangelho seja pregado a todas as nações. É dever de cada filho de Deus procurar constantemente ganhar os perdidos para Cristo mediante o testemunho pessoal apoiado por um estilo de vida Cristão, e por outros métodos que estejam em harmonia com o evangelho de Cristo.',
          references: 'Gênesis 12.1-3; Êxodo 19.5-6; Isaías 6.1-8; Mateus 9.37-38; 10.5-15; 13.18-30,37-43; 16.19; 22.9-10; 24.14; 28.18-20; Lucas 10.1-18; 24.46-53; João 14.11-12; 15.7-8,16; 17.15; 20.21; Atos 1.8; 2.; 8.26-40; 10.42-48; 13.2-3; Romanos 10.13-15; Efésios 3.1-11; 1 Tessalonicenses 1.8; 2 Timóteo 4.5; Hebreus 2.1-3; 11.39-12.2; 1 Pedro 2.4-10; Apocalipse 22.17.',
        },
        education: {
          title: 'XII. Educação',
          content: 'O Cristianismo é a fé da iluminação e da inteligência. Em Jesus Cristo habitam todos os tesouros de sabedoria e conhecimento. Todo conhecimento básico é, portanto, uma parte de nossa herança cristã. O novo nascimento abre todas as faculdades humanas e cria sede de conhecimento. Por outro lado, a causa da educação no Reino de Cristo é coordenada com as causas das missões e da beneficência, e deve receber junto com estas o apoio liberal das igrejas. Um sistema adequado de educação Cristã é necessário para completar o programa espiritual do corpo de Cristo. Na educação Cristã deve haver um equilíbrio apropriado entre a liberdade acadêmica e a responsabilidade acadêmica. A liberdade em qualquer relação humana ordenada é sempre limitada e nunca absoluta. A liberdade de um professor em uma instituição educacional Cristã, escola, colégio, universidade ou seminário, está sempre limitada pela preeminência de Jesus Cristo, a natureza autoritativa das Escrituras, e pelo propósito distintivo para o qual a escola existe.',
          references: 'Deuteronômio 4.1,5,9,14; 6.1-10; 31.12-13; Neemias 8.1-8; Jó 28.28; Salmos 19.7 segs. 119.11; Provérbios 3.13 e segs.; 4.1-10; 8.1-7,11; 15.14; Eclesiastes 7.19; Mateus 5.2; 7.2 e segs.; 28.19-20; Lucas 2.40; 1 Coríntios 1.18-31; Efésios 4.11-16; Filipenses 4.8; Colossenses 2.3,8-9; 1 Timóteo 1.3-7; 2 Timóteo 2.15; 3.14-17; Hebreus 5.12-6.3; Tiago 1.5; 3.17.',
        },
        stewardship: {
          title: 'XIII. Mordomia',
          content: 'Deus é a fonte de todas as bênçãos, temporais e espirituais; tudo o que temos e somos lhe devemos. Os Cristãos estão espiritualmente endividados com todo o mundo, uma comissão sagrada no evangelho, e uma mordomia obrigatória em suas posses. Portanto, estão sob a obrigação de servir a Deus com seu tempo, talentos e posses materiais; e devem reconhecer que tudo isto lhes foi confiado para que o usem para a glória de Deus e para ajudar os outros. De acordo com as Escrituras, os Cristãos devem contribuir do que têm, alegremente, regularmente, sistematicamente, proporcionalmente e liberalmente para o progresso da causa do Redentor na terra.',
          references: 'Gênesis 14.20; Levítico 27.30-32; Deuteronômio 8.18; Malaquias 3.8-12; Mateus 6.1-4,19-21; 19.21; 23.23; 25.14-29; Lucas 12.16-21,42; 16.1-13; Atos 2.44-47; 5.1-11; 17.24; 25.20-35; Romanos 6.6-22; 12.1-2; 1 Coríntios 4.1-2; 6.19-20; 12; 16.1-4; 2 Coríntios 8-9; 12.15; Filipenses 4.10-19; 1 Pedro 1.18-19.',
        },
        cooperation: {
          title: 'XIV. Cooperação',
          content: 'O povo de Cristo deve, conforme a ocasião o requeira, organizar tais associações e convenções que possam assegurar da melhor maneira possível a cooperação necessária para alcançar os grandes objetivos do Reino de Deus. Tais organizações não têm autoridade uma sobre a outra nem sobre as igrejas. Elas são organizações voluntárias para aconselhar, descobrir, combinar e dirigir as energias de nosso povo da maneira mais eficaz. Os membros das igrejas do Novo Testamento devem cooperar uns com os outros em levar adiante os ministérios missionários, educacionais e beneficentes para a extensão do Reino de Cristo. A unidade Cristã no sentido do Novo Testamento, é harmonia espiritual e cooperação voluntária para fins comuns por vários grupos do povo de Cristo. A cooperação entre as denominações Cristãs é desejável, quando o propósito que se quer alcançar se justifica em si mesmo, e quando tal cooperação não inclui violação alguma à consciência nem compromete a lealdade a Cristo e sua Palavra como se revela no Novo Testamento.',
          references: 'Êxodo 17.12; 18.17 e segs.; Juízes 7.21; Esdras 1.3-4; 2.68-69; 5.14-15; Neemias 4; 8.1-5; Mateus 10.5-15; 20.1-16; 22.1-10; 28.19-20; Marcos 2.3; Lucas 10.1 e segs.; Atos 1.13-14; 2.1 e segs.; 4.31-37; 13.2-3; 15.1-35; 1 Coríntios 1.10-17; 3.5-15; 12;2 Coríntios 8 e 9; Gálatas 1.6-10; Efésios 4.1-16; Filipenses 1.15-18.',
        },
        socialOrder: {
          title: 'XV. O Cristão e a Ordem Social',
          content: 'Todos os Cristãos estão sob a obrigação de procurar fazer com que a vontade de Cristo seja soberana em nossas próprias vidas e na sociedade humana. Os meios e os métodos usados para melhorar a sociedade e para o estabelecimento da justiça entre os homens podem ser verdadeira e permanentemente úteis somente quando estão enraizados na regeneração do indivíduo por meio da graça salvadora de Deus em Jesus Cristo. No espírito de Cristo, os cristãos devem se opor ao racismo, a toda forma de ganância, egoísmo, vício, a todas as formas de imoralidade sexual, incluindo adultério, homossexualidade e pornografia. Devemos trabalhar para prover para os órfãos, os necessitados, os abusados, os idosos, os indefesos e os enfermos. Devemos falar a favor dos que ainda não nasceram e lutar pela santidade de toda a vida humana desde a concepção até a morte natural. Cada cristão deve procurar fazer com que a indústria, o governo e a sociedade como um todo sejam regidos pelos princípios da justiça, da verdade e do amor fraternal. Para promover estes fins os Cristãos devem estar dispostos a trabalhar com todos os homens de boa vontade em qualquer causa, sendo sempre cuidadosos de agir no espírito do amor sem comprometer sua lealdade a Cristo e a sua verdade.',
          references: 'Êxodo 20.3-17; Levítico 6.2-5; Deuteronômio 10.12; 27.17; Salmos 101.5; Miqueias 6.8; Zacarias 8.16; Mateus 5.13-16,43-48; 22.36-40; 25.35; Marcos 1.29-34; 2.3 e segs.; 10.21; Lucas 4.18-21; 10.27-37; 20.25; João 15.12; 17.15; Romanos 12-14; 1 Coríntios 5.9-10; 6.1-7; 7.20-24; 10.23-11-1; Gálatas 3.26-28; Efésios 6.5-9; Colossenses 3.12-17; 1 Tessalonicenses 3.12; Filemom; Tiago 1.27; 2.8.',
        },
        peaceWar: {
          title: 'XVI. Paz e Guerra',
          content: 'É o dever de todo cristão buscar a paz com todos os homens baseado nos princípios da justiça. De acordo com o espírito e os ensinamentos de Cristo, eles devem fazer tudo o que está ao seu alcance para pôr fim à guerra. O verdadeiro remédio ao espírito guerreiro é o evangelho de nosso Senhor. A necessidade suprema do mundo é a aceitação de seus ensinamentos em todas as relações de homens e nações, e a aplicação prática de sua lei de amor. As pessoas Cristãs em todo o mundo devem orar pelo reino do Príncipe da Paz.',
          references: 'Isaías 2.4; Mateus 5.9,38-48; 6.33; 26.52; Lucas 22.36,38; Romanos 12.18-19; 13.1-7; 14.19; Hebreus 12.14; Tiago 4.1-2.',
        },
        religiousFreedom: {
          title: 'XVII. Liberdade Religiosa',
          content: 'Somente Deus é Senhor da consciência, e Ele a deixou livre das doutrinas e dos mandamentos de homens que são contrários à sua Palavra ou não estão contidos nela. A igreja e o estado devem estar separados. O estado deve proteção e liberdade completa a toda a igreja no exercício de seus fins espirituais. Ao prover tal liberdade nenhum grupo eclesiástico ou denominação deve ser favorecido pelo estado sobre outros grupos. Como o governo civil é ordenado por Deus, é dever dos Cristãos lhe render obediência leal em todas as coisas que não são contrárias à vontade revelada de Deus. A igreja não deve recorrer ao poder civil para realizar sua obra. O evangelho de Cristo considera somente os meios espirituais para alcançar seus fins. O estado não tem direito de impor penalidades por opiniões religiosas de qualquer classe. O estado não tem direito de impor impostos para o sustento de qualquer forma de religião. O ideal cristão é o de uma igreja livre em um estado livre, e isso implica o direito para todos os homens do acesso livre e sem obstáculos a Deus, e o direito de formar e propagar opiniões na esfera da religião, sem interferência por parte do poder civil.',
          references: 'Gênesis 1.27; 2.7; Mateus 6.6-7,24; 16.26; 22.21; João 8.36; Atos 4.19-20; Romanos 6.1-2; 13.1-7; Gálatas 5.1,13; Filipenses 3.20; 1 Timóteo 2.1-2; Tiago 4.12; 1 Pedro 2.12-17; 3.11-17; 4.12.19.',
        },
        family: {
          title: 'XVIII. A Família',
          content: 'Deus ordenou a família como a instituição fundamental da sociedade humana. É composta por pessoas relacionadas umas com as outras por matrimônio, sangue ou adoção. O matrimônio é a união de um homem e uma mulher em um pacto de compromisso por toda a vida. É o dom único de Deus para revelar a união entre Cristo e Sua igreja e para prover para o homem e a mulher no matrimônio um meio para comunhão íntima, o canal para a expressão sexual de acordo com os padrões bíblicos, e os meios para a procriação da raça humana. O marido e a esposa têm o mesmo valor diante de Deus, pois ambos foram criados à imagem de Deus. O relacionamento matrimonial modela a forma como Deus se relaciona com seu povo. Um marido deve amar sua esposa como Cristo amou a igreja. Ele tem a responsabilidade dada por Deus de prover, proteger e dirigir sua família. Uma esposa deve se submeter com graça à liderança como serva de seu marido, assim como a igreja se submete voluntariamente à direção de Cristo. Ela, sendo criada à imagem de Deus como o é seu marido, e portanto igual a ele, tem a responsabilidade dada por Deus de respeitar seu marido e servi-lo de ajuda na administração do lar e na educação da próxima geração. Os filhos, desde o momento da concepção, são uma bênção e herança do Senhor. Os pais devem demonstrar a seus filhos o modelo de Deus para o matrimônio. Os pais devem ensinar a seus filhos os valores espirituais e morais, e dirigi-los, mediante o exemplo de um estilo de vida consistente e uma disciplina amorosa, para que façam decisões baseadas na verdade bíblica. Os filhos devem honrar e obedecer a seus pais.',
          references: 'Gênesis 1.26-28; 2.15-25; 3.1-20; Êxodo 20.12; Deuteronômio 6.4-9; Josué 24.15; 1 Samuel 1.26-28; Salmos 51.5; 78.1-8; 127; 128; 139.13-16; Provérbios 1.8; 5.15-20; 6.20-22; 12.4; 13.24; 14.1; 17.6; 18.22; 22.6,15; 23.13-14; 24.3: 29.15,17; 31.10-31; Eclesiastes 4.9-12; 9.9; Malaquias 2.14-16; Mateus 5.31-32; 18.2-5; 19.3-9; Marcos 10.6-12; Romanos 1.18-32; 1 Coríntios 7.1-16; Efésios 5.21-33; 6.1-4; Colossenses 3.18-21; 1 Timóteo 5.8,14; 2 Timóteo 1.3-5; Tito 2.3-5;',
        },
      },
    },
  },
} as const

export type Dictionary = typeof dictionaries['es']

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary
}
