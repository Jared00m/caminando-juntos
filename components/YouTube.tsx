interface YouTubeProps {
  id: string
  title?: string
  caption?: React.ReactNode
}

export function YouTube({ id, title, caption }: YouTubeProps) {
  const embedUrl = `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`

  return (
    <div className="my-8">
      <div className="shadow-[0_22px_68px_-22px_rgba(15,23,42,0.55),0_10px_32px_-16px_rgba(15,23,42,0.35)] rounded-xl overflow-hidden">
        <div className="relative aspect-video bg-black">
          <iframe
            src={embedUrl}
            title={title || 'Video de YouTube'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      {caption && (
        <div className="mt-3 text-xs text-gray-600">
          {caption}
        </div>
      )}
    </div>
  )
}