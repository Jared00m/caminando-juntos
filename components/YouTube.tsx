interface YouTubeProps {
  id: string
  title?: string
}

export function YouTube({ id, title }: YouTubeProps) {
  const embedUrl = `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`

  return (
    <div className="my-8 shadow-lg rounded-xl">
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={title || 'Video de YouTube'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-xl "
        />
      </div>
    </div>
  )
}