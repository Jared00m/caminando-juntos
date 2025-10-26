

# Project Overview — Evangelistic Website

## Purpose:
A Spanish-language website to share the gospel, host video testimonies, apologetics articles, and self-paced Bible studies.

## Infrastructure Overview:
Framework: Next.js 15 (TypeScript, App Router)
Styling: TailwindCSS + shadcn/ui
Content: MDX files stored in a separate Git repository (articles, videos, and studies)
Media Storage: Supabase Storage (bucket name: content-assets) for images, thumbnails, and documents
Database: Supabase Postgres for events, contacts, study progress, and feature flags
Video: YouTube embedded within MDX
Chat: Chatwoot for regional chat support by country/city
Analytics: Google Analytics 4
Hosting: Vercel with Edge runtime and ISR caching

## Content Structure:
Content lives in a Git submodule or separate repo mounted at /content
/content
/articulos/.mdx
/videos/.mdx
/estudios/<study>/*.mdx
/index.json

Images and related media live in Supabase Storage under:
content-assets/

Example layout:
content-assets/articulos/<slug>/cover.jpg
content-assets/videos/<slug>/thumb.jpg
content-assets/estudios/<study>/<lesson>.jpg

Each MDX file includes YAML front-matter such as:
title: "¿Quién es Jesús?"
date: "2025-01-12"
cover: "https://your-supabase-url/storage/v1/object/public/content-assets/articulos/jesus/cover.jpg
"
tags: ["evangelio"]

## Environment Variables:
NEXT_PUBLIC_SITE_URL=
GA_MEASUREMENT_ID=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ASSETS_BUCKET=content-assets
CHATWOOT_TOKEN=
CHATWOOT_BASE_URL=
FEATURE_FLAGS_CACHE_SECONDS=300

## Database Schema (for Supabase):
regions table: country_code, country_name
cities table: id, country_code, city_name
events table: id, title, description, starts_at, country_code, city_id, venue, url, published
contacts table: id, country_code, city_id, channel_type, value
study_progress table: id, anon_id, study_id, lesson_id, step, completed_at
feature_flags table: key, enabled, country_code, notes

## Feature Flags:
Used to enable or disable parts of the site without code changes.
Stored in Supabase table feature_flags and cached server-side.

### Flags:
reminders - OFF - future reminders or emails
buddy - OFF - study buddy feature
events - ON - show /eventos page
help - ON - show /encuentra-ayuda page

### Example usage:
if (isEnabled('events')) { render events section }

## Country and Region Handling:
Edge middleware reads req.geo.country and sets a cookie named cc.
Components and database queries filter by cc.
User can manually change country using CountrySwitcher.
No automatic redirects based on country.

## Development Workflow:

Clone the application repository.

Add the content repository as a Git submodule at /content.

Configure environment variables in .env.local.

Run "pnpm dev" to start the local server.

Upload images and assets to Supabase Storage.

Deploy to Vercel.

## Deployment Notes:

Site should work even when advanced features are off.

Google Analytics should log page views.

Country cookie cc should be set automatically.

MDX renders from Git content.

Images load from Supabase Storage.

Chatwoot receives country and city attributes.

## Future Expansion:

Add CMS integration (like Sanity) if multiple content editors are needed.

Enable reminder or buddy systems by flipping feature flags.

Add Supabase webhooks for content revalidation if desired.

## Acceptance Checklist:

Site loads in Spanish and sets cc cookie.

MDX content renders correctly.

Images load from Supabase URLs.

Local events and contacts display by country.

Disabled flags hide features without breaking layout.

Chatwoot loads correctly with attributes.

Google Analytics 4 records page views.