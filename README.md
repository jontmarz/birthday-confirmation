# 🎂 Invitación y Confirmación para Fiesta de Cumpleaños

Una aplicación web moderna construida con Next.js para gestionar invitaciones y confirmar la asistencia a una fiesta de cumpleaños. El proyecto está diseñado para ser desplegado fácilmente en la plataforma de Firebase.

---

## ✨ Características Principales

- **Interfaz Moderna:** Construida con las últimas versiones de React y Next.js.
- **Diseño Responsivo:** Estilos creados con Tailwind CSS y componentes de Shadcn/ui.
- **Formularios Robustos:** Validación de datos segura y eficiente usando `react-hook-form` y `zod`.
- **Despliegue Sencillo:** Configurado para un despliegue rápido en Firebase Hosting y Cloud Functions.
- **Potencial de IA:** Incluye las dependencias de `Genkit` para integrar fácilmente funcionalidades de IA con Google Gemini.

---

## 🚀 Tecnologías Utilizadas

- **Framework:** Next.js 15
- **Librería UI:** React 19
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn/ui
- **Validación:** React Hook Form & Zod
- **Backend & Despliegue:** Firebase (Hosting, Cloud Functions)

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
    Crea un archivo `.env.local` en la raíz del proyecto y añade las configuraciones necesarias de Firebase que encontrarás en la consola de tu proyecto.

4.  **Ejecutar el servidor de desarrollo**
    ```bash
    npm run dev
    ```
    Abre http://localhost:9002 en tu navegador para ver la aplicación.

---

## ☁️ Despliegue en Firebase

El proyecto está pre-configurado para desplegarse en Firebase.

1.  **Asegúrate de tener la Firebase CLI** y de haber iniciado sesión (`firebase login`).
2.  Ejecuta el comando de despliegue desde la raíz del proyecto:
    ```bash
    firebase deploy
    ```

---

## 📜 Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo de desarrollo con Turbopack.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Ejecuta la versión de producción compilada.
- `npm run lint`: Revisa el código en busca de errores de estilo y calidad.
