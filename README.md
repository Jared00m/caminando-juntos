# Dios Habla - Plataforma de Contenido Espiritual

Una plataforma web moderna construida con Next.js 15 para compartir contenido espiritual en español, enfocada en ayudar a las personas a conocer a Jesús.

## 🚀 Características Principales

- **Contenido MDX**: Artículos, videos y estudios bíblicos en formato MDX
- **Localización por País**: Contenido y recursos filtrados por región
- **Sistema de Estudios**: Seguimiento de progreso en estudios bíblicos
- **Feature Flags**: Control granular de características por país
- **Analytics**: Integración con Google Analytics 4
- **Chat en Vivo**: Widget de Chatwoot con atributos regionales
- **Responsive**: Optimizado para móviles y escritorio

## 🛠 Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS + shadcn/ui
- **Base de Datos**: Supabase (PostgreSQL)
- **Almacenamiento**: Supabase Storage
- **Contenido**: MDX con Git submodule
- **Despliegue**: Vercel (Edge Runtime, ISR)
- **Analytics**: Google Analytics 4
- **Chat**: Chatwoot

## 📁 Estructura del Proyecto

```
/app
├── layout.tsx                    # Layout principal
├── page.tsx                      # Página de inicio
├── (site)/
│   ├── articulos/
│   │   ├── page.tsx             # Lista de artículos
│   │   └── [slug]/page.tsx      # Artículo individual
│   ├── videos/
│   │   ├── page.tsx             # Lista de videos
│   │   └── [slug]/page.tsx      # Video individual
│   ├── estudios/
│   │   ├── page.tsx             # Lista de estudios
│   │   └── [study]/[lesson]/    # Lección de estudio
│   ├── eventos/page.tsx         # Eventos locales
│   └── encuentra-ayuda/page.tsx # Contactos de ayuda
├── api/                         # API routes
│   ├── regions/route.ts
│   ├── events/route.ts
│   ├── contacts/route.ts
│   ├── study-progress/route.ts
│   └── feature-flags/route.ts
└── middleware.ts                # Middleware para cookies

/components
├── CountrySwitcher.tsx          # Selector de país
├── LocalEvents.tsx              # Eventos por región
├── LocalHelp.tsx                # Ayuda por región
├── Only.tsx                     # Renderizado condicional
├── Analytics.tsx                # Google Analytics
├── ChatwootWidget.tsx           # Widget de chat
├── mdx/
│   ├── MDXRenderer.tsx          # Renderizador de MDX
│   └── YouTube.tsx              # Embed de YouTube
└── study/
    ├── Step.tsx                 # Paso de estudio
    └── ProgressControls.tsx     # Control de progreso

/lib
├── supabase-server.ts           # Cliente de Supabase
├── content-git.ts               # Manejo de contenido MDX
├── featureFlags.ts              # Sistema de feature flags
├── region.ts                    # Utilidades de región
├── types.ts                     # Tipos TypeScript
└── schema.sql                   # Esquema de base de datos

/content                         # Contenido MDX (Git submodule)
├── index.json
├── articulos/
├── videos/
└── estudios/
```

## ⚙️ Configuración

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics
GA_MEASUREMENT_ID=G-XXXXXXX

# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ASSETS_BUCKET=content-assets

# Chatwoot
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://chat.yourdomain.org

# Default (general) inbox
NEXT_PUBLIC_CHATWOOT_TOKEN_DEFAULT=your-chatwoot-token

# Optional: per-country inbox tokens (JSON)
# Example: {"PE":"token-for-peru","MX":"token-for-mexico"}
NEXT_PUBLIC_CHATWOOT_TOKENS_BY_COUNTRY=

# Chipp (Bot de Fe)
CHIPP_API_KEY=your-chipp-api-key

# Feature Flags
FEATURE_FLAGS_CACHE_SECONDS=300
```

### 2. Base de Datos

Ejecuta el script SQL en `/lib/schema.sql` en tu instancia de Supabase para crear:
- Tablas de regiones, ciudades, eventos, contactos
- Sistema de progreso de estudios
- Feature flags
- Políticas RLS

### 3. Supabase Storage

Crea un bucket público llamado `content-assets` con la estructura:
```
content-assets/
├── articulos/[slug]/cover.jpg
├── videos/[slug]/thumb.jpg
└── estudios/[study]/[lesson].jpg
```

### 4. Contenido MDX

El contenido se gestiona en un repositorio Git separado como submodule:

```bash
git submodule add https://github.com/tu-org/evangelio-content.git content
```

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Verificar tipos
npm run type-check

# Lint
npm run lint
```

## 🌍 Características Regionales

### Sistema de Países
- Cookie `cc` con código de país (detectado automáticamente)
- Filtrado de eventos y contactos por región
- Feature flags específicos por país

### Feature Flags Disponibles
- `reminders`: Recordatorios de estudio (OFF por defecto)
- `buddy`: Sistema de compañeros de estudio (OFF por defecto) 
- `events`: Visualización de eventos (ON por defecto)
- `help`: Contactos de ayuda (ON por defecto)

## 📊 Analytics y Tracking

### Google Analytics 4
- Pageviews automáticos
- Eventos de progreso en estudios
- Métricas de engagement por región

### Chatwoot
- Widget con atributos: `country_code`, `city`, `source`, `language`
- Configuración automática de región del usuario

## 🎯 Presupuesto de Hosting

Optimizado para menos de $10/mes:
- **Vercel Pro**: $20/mes (incluye team, se puede usar plan gratuito)
- **Supabase**: Plan gratuito hasta 2GB DB + 1GB storage
- **Total estimado**: $0-5/mes en plan gratuito, escalable según necesidad

## 📝 Contribuir

1. Fork del repositorio
2. Crear branch para feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit de cambios (`git commit -am 'Agregar nueva característica'`)
4. Push al branch (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Soporte

Para soporte y preguntas:
- Crear un issue en GitHub
- Contactar a través del widget de Chatwoot en el sitio web

---

*"Y esta es la vida eterna: que te conozcan a ti, el único Dios verdadero, y a Jesucristo, a quien has enviado." - Juan 17:3*