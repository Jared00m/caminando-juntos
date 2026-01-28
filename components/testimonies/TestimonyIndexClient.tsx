'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Testimony } from '@/lib/types'

const ALL_TAGS_OPTION = 'todos' as const

type TagFilter = typeof ALL_TAGS_OPTION | string

interface TestimonyIndexClientProps {
  testimonies: Testimony[]
}

export function TestimonyIndexClient({ testimonies }: TestimonyIndexClientProps) {
  const [selectedTag, setSelectedTag] = useState<TagFilter>(ALL_TAGS_OPTION)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    testimonies.forEach((testimony) => {
      testimony.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [testimonies])

  const filtered = useMemo(() => {
    if (selectedTag === ALL_TAGS_OPTION) return testimonies
    return testimonies.filter((testimony) => testimony.tags?.includes(selectedTag))
  }, [selectedTag, testimonies])

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedTag(ALL_TAGS_OPTION)}
          className={
            selectedTag === ALL_TAGS_OPTION
              ? 'px-3 py-1.5 rounded-full text-sm bg-gray-900 text-white'
              : 'px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        >
          Todos
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={
              selectedTag === tag
                ? 'px-3 py-1.5 rounded-full text-sm bg-gray-900 text-white'
                : 'px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-600">No hay testimonios con ese filtro por ahora.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((testimony) => (
            <Link
              key={testimony.slug}
              href={`/comienza-aqui/testimonios/${testimony.slug}`}
              className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
            >
              <div className="relative aspect-video bg-gray-100">
                <Image
                  src={`https://img.youtube.com/vi/${testimony.youtube_id}/hqdefault.jpg`}
                  alt={testimony.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-700">
                  {testimony.title}
                </h3>
                {testimony.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {testimony.description}
                  </p>
                )}
                {testimony.tags && testimony.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {testimony.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
