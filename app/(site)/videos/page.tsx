import { getVideos } from '@/lib/content-git'
import Link from 'next/link'
import { cookies } from 'next/headers'

export default async function VideosPage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'es'
  const videos = await getVideos(locale)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-6 text-deep-indigo">Videos</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Contenido visual inspirador que complementa tu caminar de fe y profundiza tu comprensión.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-br from-sunrise-gold/5 to-emerald-green/5 rounded-3xl">
          <div className="w-20 h-20 bg-gradient-to-br from-sunrise-gold/20 to-emerald-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-sunrise-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-deep-indigo mb-2">Próximamente</h3>
          <p className="text-muted-foreground">
            Estamos preparando videos inspiradores para ti.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link
              key={video.slug}
              href={`/videos/${video.slug}`}
              className="group border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 bg-white"
            >
              <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-sunrise-gold/10 to-emerald-green/10">
                {video.cover ? (
                  <img
                    src={video.cover}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : video.youtube_id ? (
                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sunrise-gold/20 to-emerald-green/20 flex items-center justify-center">
                    <svg className="h-16 w-16 text-sunrise-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-celestial-blue/30 to-deep-indigo/30 group-hover:from-celestial-blue/40 group-hover:to-deep-indigo/40 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-celestial-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-deep-indigo group-hover:text-celestial-blue transition-colors">
                  {video.title}
                </h2>
                {video.description && (
                  <p className="text-muted-foreground mb-4 leading-relaxed">{video.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{new Date(video.date).toLocaleDateString('es-ES')}</span>
                  <div className="flex items-center space-x-4">
                    {video.duration && <span className="font-medium">{video.duration}</span>}
                    {video.tags && video.tags.length > 0 && (
                      <div className="flex gap-2">
                        {video.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-sunrise-gold/10 text-sunrise-gold px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}