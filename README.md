# Comunicación ADECRA + CEDIM

Sitio estático con Astro + Cloudflare Pages.

## Stack

- **Astro** - Framework static site
- **Tailwind CSS** - Estilos
- **Decap CMS** - Admin panel (/admin)
- **Cloudflare Pages** - Hosting
- **Pagefind** - Búsqueda

## Desarrollo

```bash
cd ~/proyectos/comunicacion-adecra
npm install
npm run dev
```

## Estructura

```
src/
├── content/
│   ├── blog/      # Noticias
│   └── events/    # Eventos
├── pages/
│   ├── index.astro
│   ├── blog/
│   ├── eventos.astro
│   └── cursos.astro
├── components/
│   ├── Header.astro
│   └── Footer.astro
└── layouts/
    └── Layout.astro
```

## Admin CMS

- URL: `/admin`
- Contraseña: `comunicacion2026`

## SEO

Automático via `astro-seo`:
- Meta tags
- Sitemap
- Canonical URLs
- Open Graph

## Despliegue

Git push a main → Cloudflare Pages deploya automáticamente.

## Imágenes

Subir a: `public/images/`
Referenciar como: `/images/nombre.jpg`
