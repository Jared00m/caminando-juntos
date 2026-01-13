# Lesson Content Style Guide

This guide standardizes how study lessons are written and styled (Spanish + Portuguese) to keep pages consistent, accessible, and easy to localize.

## Frontmatter

Required keys:
- `title`: Lesson title
- `date`: ISO date string
- `order`: Numeric order within the study
- `description`: Short summary for SEO and previews

Recommended keys:
- `tags`: Array of keywords
- `steps`: Number of steps (if using `<Step>` blocks)
- `episode`: For video-first series where episode numbering matters

Example:

```mdx
---
title: "Lección 2: El Plan de Dios para la Salvación"
date: "2025-10-22"
order: 2
tags: ["salvación", "jesús", "cruz"]
description: "Descubre cómo Dios resolvió el problema del pecado a través de Jesucristo."
---
```

Portuguese mirrors the same structure with localized text:

```mdx
---
title: "Lição 2: O Plano de Deus para a Salvação"
date: "2025-10-22"
order: 2
tags: ["salvação", "jesus", "cruz"]
description: "Descubra como Deus resolveu o problema do pecado por meio de Jesus Cristo."
---
```

## Layout Structure

Wrap the entire lesson in `<DevotionalLesson>`.

Top header (optional but recommended for multi-step studies):
- A small chip indicating lesson `X de Y`
- H1 with the main lesson title

Example:

```mdx
<DevotionalLesson>

<div className="text-center mb-12 pt-4">
  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
    Lição 2 de 4
  </div>
  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">O Plano de Deus para a Salvação</h1>
</div>
```

## Components

- `<YouTube id="..." caption="Video por BibleProject" />`
  - Places a video-first hero with consistent shadow and caption styling.
  - Use the same video `id` for ES/PT when possible.

- `<Section variant="story|reflection|truth">` for narrative/teaching blocks.

- `<ScriptureVerse reference="Book chapter:verse">` for scripture call-outs.

- `<Step number={n} title="...">` optional; use in multi-step salvation lessons.

- `<Thought>` for short reflections.

- `<TakeAway>` a concise closure highlighting the main insight or action.

## Visual Consistency

- Use Tailwind gradients and cards consistently:
  - `bg-gradient-to-br from-*-50 to-*-100 p-6 rounded-2xl border-2 border-*-200 shadow-lg`
  - Keep grids to `grid grid-cols-1 md:grid-cols-2|3 gap-6|8`.
- Avoid ad hoc colors; stick to established palette.
- Keep images and videos within the provided components to preserve shadows and spacing.

## Navigation Rules

- Do NOT add previous/next navigation inside MDX lessons.
- Navigation (previous/next) is handled by the parent page via `LessonNavigation`.
- A content CTA is permitted (e.g., a concluding button), but prefer semantic guidance rather than duplicating navigation.

## Localization

- Portuguese lessons should mirror Spanish layout and components exactly; translate text only.
- File naming: `lesson.es.mdx` (default) and `lesson.pt.mdx` for Portuguese.
- Keep YouTube `id` and visual elements identical unless a localized video exists.

## Metadata Consistency

- Frontmatter must include the required keys above. The content loader validates `title`, `slug`, and `description` in study metadata JSON and warns if missing.
- Study metadata lives in `content/estudios/<study>/index.json` (and `index.pt.json`). Keep fields consistent: `title`, `slug`, `description`, optional `order`, `thumbnail`, `tags`, `estimatedTime`, `lessons`.

## Checklist Before Commit

- Frontmatter present and correct in ES/PT.
- Wrapped in `<DevotionalLesson>`.
- Uses standardized components and grid/card styles.
- No in-MDX previous/next nav; parent handles navigation.
- Portuguese mirrors Spanish structure.

</DevotionalLesson>
