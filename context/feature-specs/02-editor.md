We need the base chrome componnets that frame every editor screen - the top navbar and the left sidebar shell.
These will be reused and extended in every chapter that follows.

### Editor Navbar

Create `components/editor/editor-navbar.tsx`

Requirements :

- fixed-height top navbar
- left, center and right sections
- left section contains sidebar toggle button
- use `PanelLeftOpen` / `PanelLeftClose` icons based on sidebar state
- right section stays empty for now
- dark background with subtle bottom border

### Project Sidebar

Create `components/editor/project-sidebar.tsx`

Requirements :

- sidebar should float above the editor canvas
- opening it should no push page content
- slides in from the left
- accepts `isOpen` prop
- header with `Projects` title + close button
- shadcn `Tabs` :
  - My Projects
  - Shared
- both tabs show empty placeholder state
- full-width `New Project` button at bottom with `Plus` icon

### Dialog Pattern

Use the existing color tokens from `globals.css` for dialog styling

Support :

- title
- description
- footer actions

Do not build actual dialogs yet

### Check whnen done

- new components compile without TypeScript errors
- no lint errors
- dialog pattern is ready for future use

## Technical Constraints & Implementation Rules

### 1. State Management

- **UI Persistence**: Sidebar `isOpen` state must be managed via **Zustand** using the `persist` middleware.
- **User Intent**: The workspace layout must survive a page refresh to maintain a professional "Bicycle for the Mind" experience.

### 2. Performance & Animation

- **GPU Acceleration**: Sidebar transitions must use `translate-x` (transforms) rather than modifying `width` or `left` properties.
- **Zero-Reflow**: The sidebar is an **Overlay**; it must not trigger a DOM reflow of the main canvas or editor when toggling.

### 3. Layering & Invariants

- **Opaque Surfaces**: Sidebars and Navbars must use solid `bg-[--bg-surface]` or `bg-[--bg-base]` to prevent content bleed-through.
- **Visual Hierarchy**:
  - Navbar: `z-50`
  - Sidebar: `z-50`
  - Backdrop: `z-40`
- **Brutalist Borders**: Use `1px` solid borders (`border-[--border-default]`) as the primary depth indicator. Soft shadows are strictly forbidden.

### 4. Interactive Feedback

- **Hover States**: Use `bg-[--accent-muted]` and `text-[--accent-primary]` for interactive hover states on all ghost buttons.
- **Active States**: Tabs must use the `Hazard Orange` (`--accent-primary`) for high-visibility active markers.
