# RG Impermeabilizaciones y Pintura — Editorial Premium

Sitio web de experiencia premium para **RG Impermeabilizaciones y Pintura**, empresa de mantenimiento integral, albañilería, herrería, pintura y aire acondicionado.

## 🎯 Características

### Tecnología Frontend

- **HTML5** semántico y accesible
- **CSS3** moderno con variables CSS y media queries responsivas
- **JavaScript Vanilla** con GSAP 3.13.0 y ScrollTrigger para animaciones
- **Three.js** para efectos visuales avanzados

### Funcionalidades Principales

#### 1. **Modo Oscuro Persistente**

- Toggle elegante en la barra de navegación
- Persistencia mediante localStorage
- Fallback a preferencias del sistema (`prefers-color-scheme`)
- Paleta de colores completa para dark mode

#### 2. **Galería Interactiva Antes/Después**

- 3 sliders de comparación con rango deslizable
- Categorías de filtrado: Todo, Pintura, Remodelación, Aires
- Auto-demo en viewport (50% → 70% → 50%)
- Respeta `prefers-reduced-motion` para accesibilidad
- Se cancela automáticamente con interacción del usuario

#### 3. **Diseño Responsivo Premium**

Breakpoints optimizados:

- **1440px+** → Desktop completo
- **1220px** → Ajustes de espaciado
- **980px** → Navbar reordenada, brand con ellipsis
- **860px** → Layouts de 1 columna
- **640px** → Header compactado, theme-toggle reducido
- **580px** → Comparador mobile-friendly (aspect-ratio 16/11)

#### 4. **Animaciones y Efectos**

- Loader cinematográfico al entrar
- Hero section con canvas y floating cards
- Smooth page transitions con GSAP timelines
- Reveal animations en scroll
- Micro-interacciones en botones y componentes

#### 5. **Accesibilidad**

- ARIA labels en elementos interactivos
- Navegación por teclado completa
- Semántica HTML correcta
- Contraste de colores WCAG AA+
- Soporte para lectores de pantalla

## 📂 Estructura del Proyecto

```
rg-editorial/
├── index.html              # Home page con hero y servicios
├── servicios.html          # Catálogo de 5 servicios principales
├── coleccion.html          # Galería de proyectos con sliders comparadores
├── contacto.html           # Formulario de contacto
├── script.js              # JavaScript vanilla (1300+ líneas)
├── styles.css             # Estilos maestros (2600+ líneas)
├── assets/
│   ├── css/               # Estilos adicionales
│   └── js/                # Scripts modulares
├── media/                 # Imágenes de proyectos
├── INFO/                  # Datos de la empresa y media
├── LOGO/                  # Assets de branding
└── README.md
```

## 🚀 Inicio Rápido

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/rg-editorial.git
cd rg-editorial
```

### 2. Abrir Localmente

Simplemente abre `index.html` en tu navegador, o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con VS Code
# Instala "Live Server" extension y click derecho → "Open with Live Server"
```

Luego accede a `http://localhost:8000`

## 🎨 Paleta de Colores

### Light Mode

- **Primario**: `#8c5b2d` (marrón premium)
- **Fondo**: `#f4f1ec` (crema)
- **Texto**: `#1a1a1a` (negro suave)
- **Acento**: `#c9a961` (oro)

### Dark Mode

- **Primario**: `#f4f1ec` (crema)
- **Fondo**: `#0d0d0d` (casi negro)
- **Texto**: `#e8e4df` (gris claro)
- **Acento**: `#d4af37` (oro vibrante)

## 🔧 Tecnologías Utilizadas

| Tecnología        | Versión | Propósito                 |
| ----------------- | ------- | ------------------------- |
| **GSAP**          | 3.13.0  | Animaciones y timelines   |
| **ScrollTrigger** | Latest  | Animations on scroll      |
| **Three.js**      | 0.164.1 | Gráficos 3D (canvas hero) |
| **Lenis**         | 1.1.14  | Smooth scrolling          |
| **Google Fonts**  | Latest  | Manrope, Sora             |

## 📱 Responsive Design

El sitio está optimizado para:

- ✅ Desktop (1440px+)
- ✅ Laptop (1220px, 980px)
- ✅ Tablet (860px, 640px)
- ✅ Mobile (580px, 380px)

Todas las media queries están centralizadas en `styles.css` para facilitar mantenimiento.

## 🎬 Animaciones Clave

### Auto-demo del Comparador

Cuando el slider de comparación entra en viewport (55% visible):

1. Se ejecuta una vez por slider
2. Mueve de 50% → 70% en 0.8s (ease-out)
3. Retorna 70% → 50% en 0.75s
4. Se cancela automáticamente si el usuario interactúa (drag, input, teclado)
5. Respeta `prefers-reduced-motion` del sistema

### Modo Oscuro

- Toggle suave (0.2s transition)
- Se persiste en localStorage (`"rg-theme-mode"`)
- Remapea 100+ propiedades CSS
- No causa parpadeos al recargar

## 🔐 Atributos de Accesibilidad

```html
<!-- Ejemplos implementados -->
<button aria-label="Cambiar apariencia" title="Cambiar apariencia"></button>
<nav id="mainNav" aria-hidden="true"></nav>
<button aria-expanded="false" aria-controls="mainNav"></button>
```

## 🚀 Deployment

### Opciones Recomendadas:

1. **GitHub Pages** (gratis)

   ```bash
   # Crea repo público y activa GitHub Pages en Settings
   ```

2. **Netlify** (gratis + características)
   - Conecta repo de GitHub
   - Deploy automático en cada push

3. **Vercel** (gratis + performance)
   - Conecta repo de GitHub
   - Optimización automática de imágenes

## 📊 Performance

- **Lazy loading** en imágenes de galería
- **CSS variables** para temas sin necesidad de reflow
- **GSAP optimizado** con timelines reutilizables
- **localStorage** para persistencia local sin network calls
- **Preload** de fuentes Google

## 🔄 Control de Versiones

```bash
# Ver historial
git log --oneline

# Crear rama para cambios
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Enviar a GitHub
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

## 📝 Licencia

© 2026 RG Impermeabilizaciones y Pintura. Todos los derechos reservados.

Diseño editorial premium por [Daniel Vélez](https://www.danielvelez-webdev.com)

## ✉️ Contacto

- **WhatsApp/Teléfono**: +52 984 130 3765
- **Ubicación**: México
- **Servicios**: Impermeabilización, Pintura, Albañilería, Herrería, Aire Acondicionado, Mantenimiento Integral

---

**¿Preguntas o sugerencias?** Abre un [Issue](https://github.com/tu-usuario/rg-editorial/issues) en GitHub.
