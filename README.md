# 🎂 Invitación y Confirmación para Fiesta de Cumpleaños

Una aplicación web moderna construida con Next.js para gestionar invitaciones y confirmar la asistencia a una fiesta de cumpleaños, optimizada para despliegue en Netlify.

---

## ✨ Características Principales

- **Interfaz Moderna:** Construida con las últimas versiones de React y Next.js.
- **Diseño Responsivo:** Estilos creados con Tailwind CSS y componentes de Shadcn/ui.
- **Formulario de Confirmación:** Integrado con Netlify Forms para una recolección de datos sencilla y notificaciones a través de webhooks (por ejemplo, a Make.com).
- **Integración con Automatización:** Envía datos a través de una API Route de Next.js a servicios como Make.com.
- **Despliegue Sencillo:** Configurado para un despliegue rápido y continuo en Netlify.
- **Potencial de IA:** Incluye las dependencias de `Genkit` para integrar fácilmente funcionalidades de IA con Google Gemini.

---

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 15
- **Librería UI:** React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn/ui
- **Formularios:** Componente de React con una API Route de Next.js para el backend.
- **Despliegue:** Netlify

---

## ⚙️ Cómo Empezar (Desarrollo Local)

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

1.  **Clonar el repositorio**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd birthday-party
    ```

2.  **Instalar dependencias**
    Se recomienda usar `npm`.
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**
    Crea un archivo `.env.local` en la raíz del proyecto si necesitas variables de entorno para el desarrollo local. Para el despliegue, estas se configuran en el panel de Netlify.

4.  **Ejecutar el servidor de desarrollo**
    ```bash
    npm run dev
    ```
    Abre `http://localhost:9002` en tu navegador para ver la aplicación.

---

## ☁️ Despliegue en Netlify

El proyecto está listo para ser desplegado en Netlify.

1.  **Sube tu repositorio a GitHub, GitLab o Bitbucket.**
2.  **Crea un nuevo sitio en Netlify** desde tu repositorio de Git.
3.  **Configuración de Build:** Netlify debería detectar automáticamente que es un proyecto de Next.js. La configuración por defecto suele ser correcta:
    -   **Build command:** `npm run build`
    -   **Publish directory:** `.next`
4.  **Añade las variables de entorno** necesarias en la configuración del sitio en Netlify (por ejemplo, `GEMINI_API_KEY`).
5.  **Despliega el sitio.** Netlify construirá y desplegará tu aplicación automáticamente con cada `push` a la rama principal.

### Configurar el Webhook para Make.com

El formulario envía los datos a una API Route (`/api/rsvp`) que actúa como un intermediario seguro. Para que esta ruta envíe los datos a tu escenario de Make.com, debes hacer lo siguiente:

1.  **Obtén tu Webhook URL de Make.com:** En tu escenario de Make, copia la URL del módulo Webhook.
2.  **Configura la Variable de Entorno en Netlify:**
    -   Ve a **Site configuration > Environment variables** en el panel de tu sitio en Netlify.
    -   Crea una nueva variable llamada `MAKE_WEBHOOK_URL`.
    -   Pega la URL de tu webhook de Make.com como valor.
3.  **Vuelve a desplegar tu sitio** (o activa un nuevo deploy) para que los cambios en las variables de entorno surtan efecto.

---

## 📜 Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo de desarrollo con Turbopack.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Ejecuta la versión de producción compilada.
- `npm run lint`: Revisa el código en busca de errores de estilo y calidad.
