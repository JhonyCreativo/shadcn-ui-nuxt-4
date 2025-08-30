# Nuxt 4 + shadcn-vue + Axios (pnpm)

Plantilla base pensada para acelerar el arranque de proyectos con **Nuxt 4**, **shadcn-vue** (biblioteca de componentes headless + estilos con Tailwind) y **Axios** como plugin global, usando **pnpm** para la gestión de paquetes.

> Objetivo: que puedas **empezar a desarrollar de inmediato** sin preocuparte por la integración inicial.

---

## 🚀 Características

- ⚡️ Nuxt 4 configurado con TypeScript listo para producción
- 🎨 UI con **shadcn-vue** + TailwindCSS
- 🌐 **Axios** como cliente HTTP centralizado (interceptores, tipado, helper composable)
- 🧩 Arquitectura limpia de módulos, composables y plugins
- 🧪 Estructura lista para tests (opcional) y buenas prácticas
- 🧰 pnpm scripts para desarrollo, build y preview

---

## 📦 Requisitos

- **Node.js** ≥ 18
- **pnpm** ≥ 8 (`npm i -g pnpm`)

---

## ⚙️ Configuración rápida

1) **Instalación**

```bash
pnpm install
```

2) **Variables de entorno**

Copia `.env.example` a `.env` y ajusta valores:

```bash
cp .env.example .env
```

**Variables sugeridas**

```bash
# Base pública para construir URLs de API en el cliente
NUXT_PUBLIC_API_BASE="https://api.ejemplo.com"

# Secretos sólo para servidor (no se exponen al cliente)
NUXT_API_TOKEN="coloca-tu-token"
```

> En `nuxt.config.ts` se leen con `runtimeConfig` y `public`.

3) **Ejecutar en desarrollo**

```bash
pnpm dev
```

4) **Compilar para producción**

```bash
pnpm build
pnpm preview  # vista previa local del build
```

---

## 🎨 shadcn-vue + Tailwind

Esta plantilla incluye Tailwind y la estructura para usar **shadcn-vue**. Para agregar nuevos componentes:

```bash
# Agregar un componente UI (ej.: button, input, card, dialog)
pnpm dlx shadcn-vue@latest add button input card dialog
```

Los componentes se alojan en `components/ui/` y se pueden usar de forma estándar en tus vistas.

**Tailwind** está habilitado vía módulo de Nuxt y configurado en `tailwind.config.ts` con los paths de Nuxt (pages, components, layouts, app, content). Si agregas directorios nuevos (por ej. `features/`), recuerda incluirlos en `content`.

Ejemplo mínimo de `tailwind.config.ts` (incluyendo fuentes de shadcn-vue):

```ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      }
    }
  },
  plugins: []
} satisfies Config
```

> Tip: Si usas la CLI de `shadcn-vue`, puede añadir presets/alias y estilos adicionales. Sigue sus prompts y confirma rutas para Nuxt.

---

## 🌐 Axios como plugin ($api)

La plantilla registra Axios como **plugin** para exponer `$api` en toda la app.

**plugins/api.ts**

```ts
import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:3000'

  const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Interceptor de request (ej.: token de auth)
  api.interceptors.request.use((req) => {
    const token = config.apiToken // sólo disponible en server si lo defines en runtimeConfig
    if (token) req.headers.Authorization = `Bearer ${token}`
    return req
  })

  // Interceptor de respuesta (manejo de errores)
  api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
      // Aquí puedes mapear errores para toasts, logs, redirecciones, etc.
      console.error('[API ERROR]', error.message)
      return Promise.reject(error)
    }
  )

  return {
    provide: { api }
  }
})
```

**composables/useApi.ts** (helper opcional)

```ts
export function useApi() {
  const { $api } = useNuxtApp()
  return $api
}
```

**Uso en componentes**

```vue
<script setup lang="ts">
const api = useApi()

const { data, pending, error } = await useAsyncData('users', () =>
  api.get('/users').then(r => r.data)
)
</script>
```

---

## 🧩 Configuración de `nuxt.config.ts`

Ejemplo de secciones clave ya incluidas en la plantilla:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    apiToken: process.env.NUXT_API_TOKEN, // sólo servidor
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000'
    }
  },
  typescript: { strict: true },
  devtools: { enabled: true }
})
```

---

## 🧪 Scripts disponibles (pnpm)

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

> **Sugerido**: añade ESLint/Prettier si tu equipo lo necesita.

---

## 🔌 Añadir más componentes de UI

1. Revisa el catálogo de `shadcn-vue` y elige los componentes.
2. Ejecuta: `pnpm dlx shadcn-vue@latest add <componente>`
3. Usa el componente desde `components/ui/<componente>.vue`.

> Si cambias rutas/alias, ajusta import paths y `tailwind.config.ts`.

---

## 🧷 Buenas prácticas

- Centraliza llamadas HTTP en **services**/**composables**; evita lógica de red en componentes
- Define tipos (interfaces) para respuestas de API
- Maneja errores de forma consistente (toasts, logs, reporting)
- Usa layouts para distribuir UI y el **Theme** (claro/oscuro) vía clase `dark`
- Documenta endpoints y flujos clave en `/docs` o README

---

## ❓FAQ

**¿Puedo usar fetch de Nuxt en lugar de Axios?**
Sí. Esta plantilla prioriza Axios por interceptores y ecosistema, pero puedes usar `$fetch`/`useFetch` de Nuxt donde prefieras.

**¿Cómo activo dark mode?**
Tailwind está con `darkMode: 'class'`. Añade/remueve la clase `dark` en `<html>` o en un provider de tema.

**¿Se puede SSR con esta plantilla?**
Sí. Nuxt 4 soporta SSR/SPA/ISR. Ajusta según tus necesidades en `nuxt.config.ts`.

---

## 🗺️ Roadmap (opcional)

- Autenticación con refresh tokens
- i18n module
- Testing (Vitest/Playwright) preconfigurado
- Theming avanzado para shadcn-vue

---

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feat/mi-feature`
2. Commit: `git commit -m "feat: agrega mi feature"`
3. Push: `git push origin feat/mi-feature`
4. Abre un Pull Request

---

## 📄 Licencia

MIT — úsala libremente en tus proyectos.

