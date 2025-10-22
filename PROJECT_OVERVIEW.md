# Proyecto Evangelio — Arquitectura y Configuración
Propósito

Sitio web en español para compartir el evangelio, videos de testimonio, artículos apologéticos y estudios bíblicos autoguiados.

Infraestructura
Componente	Tecnología	Descripción
Framework	Next.js 15 (TypeScript, App Router)	SSR, ISR, Edge Middleware
Estilos	Tailwind + shadcn/ui	Diseño limpio y responsivo
Contenido	Archivos MDX (repositorio Git separado)	Artículos, videos y estudios
Archivos binarios	Supabase Storage (content-assets)	Imágenes y documentos
Base de datos	Supabase Postgres	Eventos, contactos, progreso, banderas
Video	YouTube	Embeds en MDX
Chat	Chatwoot	Chat con equipos locales
Analítica	Google Analytics 4	Medición de tráfico
Hosting	Vercel	Edge + ISR
Estructura de contenido

/content
 /articulos/.mdx
 /videos/.mdx
 /estudios/<study>/*.mdx
 /index.json

Imágenes y recursos viven en:
Supabase Storage → content-assets/

Variables de entorno

NEXT_PUBLIC_SITE_URL=
GA_MEASUREMENT_ID=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ASSETS_BUCKET=content-assets
CHATWOOT_TOKEN=
CHATWOOT_BASE_URL=
FEATURE_FLAGS_CACHE_SECONDS=300

Tablas clave

regions, cities, events, contacts

study_progress

feature_flags

Geolocalización

Middleware establece cookie cc por país.

Componentes filtran contenido según esa cookie.

Banderas de funciones
Clave	Estado inicial	Descripción
reminders	OFF	Recordatorios futuros
buddy	OFF	Compañeros de estudio
events	ON	Página de eventos
help	ON	Página de ayuda
Flujo de desarrollo

Clonar repo de aplicación.

Añadir repo de contenido como submódulo /content.

Configurar .env.local.

Ejecutar pnpm dev.

Subir imágenes a Supabase Storage.

Desplegar en Vercel.

Criterios de aceptación

El sitio carga en español con cookie cc creada.

Contenido MDX renderizado desde Git.

Imágenes cargadas desde Supabase Storage.

Eventos y contactos filtrados por país.

Banderas desactivadas no rompen UI.

Chatwoot muestra atributos de país/ciudad.

GA4 registra visitas.

Migración futura

Si se necesitan editores no técnicos, migrar contenido MDX a CMS (Sanity).

Activar recordatorios y funciones sociales habilitando banderas.