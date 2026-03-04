# StreetWOD — Web

Web de la comunidad StreetWOD. Next.js 15 + Supabase + Tailwind CSS.

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal con stats en tiempo real |
| `/leaderboard` | Rankings mundiales de RMs |
| `/athlete/[username]` | Perfil público de atleta |
| `/wods` | WODs semanales y de la comunidad |
| `/benchmarks` | Catálogo de benchmark WODs |
| `/blog` | Blog |
| `/privacy` | Política de privacidad |
| `/terms` | Condiciones del servicio |

## Admin

Los paneles admin siguen accesibles como archivos estáticos:

- `/admin.html` — Admin de WODs semanales
- `/admin-blog.html` — Admin de Blog

## Desarrollo local

```bash
npm install
npm run dev
```

## Despliegue

Desplegado en Vercel. Push a `main` → deploy automático.
