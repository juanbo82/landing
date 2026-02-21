# StreetWOD — Landing Page

Página de promoción de la aplicación StreetWOD para Android.

## Contenido

- **Landing** (`index.html`): hero, comunidad, WOD Builder, duelos, rankings, competiciones, cronómetros
- **Panel Admin** (`admin.html`): login y formulario para añadir WODs semanales

## Panel Admin — WODs semanales

1. Ejecuta la migración SQL en Supabase:
   ```sql
   -- Ver archivo supabase_admin_weekly_wods.sql en la raíz del proyecto
   ```

2. Crea el usuario admin en Supabase:
   - Supabase → **Authentication** → **Users** → **Add user** → **Create new user**
   - Introduce el **email** y **contraseña** que quieras usar para el panel admin
   - Crea el usuario y copia su **User UID** (UUID)
   - En **SQL Editor**, ejecuta:
     ```sql
     INSERT INTO admin_users (user_id) VALUES ('uuid-copiado-aqui');
     ```

3. Inicia sesión en `admin.html` con ese email y contraseña.

**Nota**: El campo `week_start` debe ser el lunes de la semana. El campo `movements` es JSON: `[{"name":"Thruster","reps":21,"weight_kg":43,"percentage":null},...]`

## Uso local

**Importante:** El panel Admin necesita un servidor local (Supabase no acepta peticiones desde `file://`).

```bash
cd landing
npx serve .
```

Luego abre:
- **Landing:** http://localhost:3000
- **Admin:** http://localhost:3000/admin.html

## Despliegue

Puedes desplegar esta carpeta en:

- **GitHub Pages**: sube la carpeta `landing` al repo y activa Pages en la rama principal
- **Netlify**: arrastra la carpeta o conecta el repo
- **Vercel**: despliega la carpeta como sitio estático

## Actualizar el enlace de descarga

Cuando tengas el enlace de Google Play, edita `index.html`:

1. Cambia el `<a href="#descarga">` por la URL de la Play Store
2. Actualiza el texto del botón a "Descargar en Google Play" o similar
3. Elimina o modifica el badge "En desarrollo" en la sección final
