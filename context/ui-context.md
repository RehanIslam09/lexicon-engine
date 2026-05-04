# UI Context

## Theme

Dark only. No light mode. The design language is **"Cyber-Monolith"**—a dark, brutalist technical workspace designed for intense, distraction-free focus. It features carbon-black backgrounds, structured grid layouts, zero-pixel border radii, and a vivid "Hazard Orange" accent for interactive elements. It should feel like an industrial-grade terminal built for narrative engineering.

## Colors

All components must use these CSS custom properties. Hardcoded hex values are strictly forbidden in Tailwind classes.

| Role            | CSS Variable       | Value       | Description                                               |
| --------------- | ------------------ | ----------- | --------------------------------------------------------- |
| Page background | `--bg-base`        | `#0A0A0A`   | Deep carbon black. The void.                              |
| Surface         | `--bg-surface`     | `#141414`   | Slightly elevated panels (sidebars, cards).               |
| Primary text    | `--text-primary`   | `#EDEDED`   | High-contrast off-white for prose and headings.           |
| Muted text      | `--text-muted`     | `#878787`   | Concrete gray for metadata, timestamps, and hints.        |
| Primary accent  | `--accent-primary` | `#FF4D00`   | Phosphor/Hazard Orange. Used sparingly for active states. |
| Accent muted    | `--accent-muted`   | `#FF4D0033` | 20% opacity orange for subtle hover states or selections. |
| Border          | `--border-default` | `#2A2A2A`   | Harsh, visible structural lines.                          |
| Error           | `--state-error`    | `#FF2A2A`   | Pure crimson for destructive actions/logic errors.        |
| Success         | `--state-success`  | `#00E676`   | Toxic green for successful saves/syncs.                   |

## Typography

To match the "Engineering" vibe, we avoid overly decorative serif fonts, leaning into clean, machine-like typography.

| Role      | Font               | Variable       | Usage                                                |
| --------- | ------------------ | -------------- | ---------------------------------------------------- |
| UI text   | Geist Sans         | `--font-sans`  | Menus, sidebars, buttons, and general UI.            |
| Prose     | Geist Sans / Inter | `--font-prose` | The main editor text (large, highly readable).       |
| Code/mono | JetBrains Mono     | `--font-mono`  | Node IDs, variable names, entity tags, and metadata. |

## Border Radius

The Cyber-Monolith style relies on absolute brutalism. **There are no rounded corners.** Everything is sharp and mechanical.

| Context           | Class          |
| ----------------- | -------------- |
| Inline / small UI | `rounded-none` |
| Cards / panels    | `rounded-none` |
| Modals / overlays | `rounded-none` |

## Component Library

- **shadcn/ui** installed on top of Tailwind CSS.
- Components live in `src/components/ui/`.
- Use the CLI to add new components.
- **Mandatory Override:** Upon generating any shadcn component, immediately strip out `rounded-md`, `rounded-sm`, etc., replacing them with `rounded-none` to enforce the monolith theme. Remove soft `shadow-sm` classes and replace them with solid border lines.

## Layout Patterns

- **The Tri-Pane Split:** The primary workspace consists of a Left Sidebar (World Bible/Directory), Center Canvas (Editor/Flow Map), and Right Sidebar (Context/Properties).
- **Harsh Borders:** Sidebars and panels do not use shadows to show depth. They use fixed widths separated by a rigid `border-r border-[--border-default]`.
- **Modals:** Centered overlay with a heavy dark backdrop blur (`backdrop-blur-sm bg-black/80`). Modal containers must have a solid 1px border.
- **The Editor Canvas:** The text editor is centrally constrained (max-width `65ch` for readability) but sits within an infinite dark canvas.
- **The Node Map:** The React Flow canvas background uses a dotted coordinate grid (`--text-muted` at 10% opacity) rather than a blank void.

## Icons

- **Lucide React**.
- Stroke-based icons only.
- Stroke width: `1.5px` (keep it looking sharp and technical, not thick and bubbly).
- Sizes: `h-4 w-4` for inline hints and sidebar items, `h-5 w-5` for primary action buttons.

---

### We are fully grounded.
