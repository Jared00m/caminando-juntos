/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
  env: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  },
  // Ensure content directory is included in serverless functions
  experimental: {
    outputFileTracingIncludes: {
      '/estudios': ['./content/estudios/**/*'],
      '/estudios/[study]': ['./content/estudios/**/*'],
      '/estudios/[study]/[lesson]': ['./content/estudios/**/*'],
      '/articulos': ['./content/articulos/**/*'],
      '/articulos/[slug]': ['./content/articulos/**/*'],
      '/videos': ['./content/videos/**/*'],
      '/videos/[slug]': ['./content/videos/**/*'],
    },
  },
}

module.exports = nextConfig