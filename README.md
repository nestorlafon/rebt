# REBT - Plataforma de Estudio

Plataforma interactiva para estudiar el **Reglamento Electrotécnico para Baja Tensión (REBT)** y sus **Instrucciones Técnicas Complementarias** (RD 842/2002). Diseñada para preparar el examen de instalador electricista en España.

## Stack

- **Bun** + **TypeScript**
- **Next.js 16** (App Router)
- **Supabase** (backend, base de datos)
- **Vercel** (deploy)

## Inicio rápido

### Requisitos

- [Bun](https://bun.sh) (vía `mise`)
- Cuenta en [Supabase](https://supabase.com) y [Vercel](https://vercel.com)

### Instalación

```bash
# Las herramientas se instalan automáticamente con mise (.tool-versions)
mise install

# Instalar dependencias
bun install

# Copiar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```

### Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. En el dashboard: **SQL Editor** → crea una nueva query
3. Copia el contenido de `supabase/migrations/20250220000000_initial_schema.sql` y ejecútalo
4. Ejecuta también `supabase/seed.sql` para cargar contenido de ejemplo
5. En **Settings → API** (o API Keys) copia la URL y la **publishable key** (`sb_publishable_...`) a tu `.env.local`

### Desarrollo

```bash
bun run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Deploy en Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Añade las variables de entorno `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
3. Deploy automático

## Estructura del proyecto

- `src/app/` - Rutas y páginas (estudiar, ITC-BT, quiz)
- `src/lib/supabase/` - Cliente Supabase
- `supabase/migrations/` - Esquema de base de datos
- `supabase/seed.sql` - Contenido inicial (artículos, ITCs, preguntas)

## Funcionalidades

- **Estudiar**: Artículos del REBT (objeto, ámbito, definiciones, tensiones)
- **ITC-BT**: Instrucciones técnicas (conductores, puesta a tierra, viviendas, baños, generadores...)
- **Quiz**: Preguntas de práctica con explicaciones
- Progreso del usuario (con Supabase Auth, opcional)

## Ampliar contenido

Puedes añadir más artículos, ITCs y preguntas ejecutando SQL en el editor de Supabase. La estructura está en `supabase/migrations/`.

## Documentación

Documentación técnica detallada: [docs/README.md](docs/README.md)
