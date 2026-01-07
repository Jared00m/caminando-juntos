interface YouTubeProps {
  id: string
  title?: string
}

export function YouTube({ id, title }: YouTubeProps) {
  return (
    <div className="my-8">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title || 'Video de YouTube'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-lg"
        />
      </div>
    </div>
  )
}