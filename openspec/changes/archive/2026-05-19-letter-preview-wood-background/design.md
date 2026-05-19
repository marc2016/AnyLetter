## Context

`LetterPreview.tsx` renders a scrollable flex container with a white DIN A4 page (`210mm × 297mm`, `shadow-4`) centered on a neutral `surface-200` splitter panel. The asset `src/assets/background_letter_wood.png` is already in the repo. PDF export uses `@react-pdf/renderer` separately and must not pick up preview-only styling.

## Goals / Non-Goals

**Goals:**

- Show the wood texture as the preview pane backdrop (full scroll area behind the page).
- Present the A4 page slightly smaller so the wood border is visible on all sides.
- Keep the page readable against the busy grain (existing/enhanced drop shadow).
- Preserve exact DIN layout inside the page (mm dimensions, `cqw` font sizing, fold marks).

**Non-Goals:**

- Changing PDF output, `dinLayout.ts`, or form behavior.
- Replacing the splitter panel's `surface-200` globally (only the preview inner area gets the wood image).
- Tiling or repeating the background (the photo is not a seamless pattern; use `cover`).

## Decisions

### 1. Background on the scroll container, not the A4 page

**Choice:** Apply `background_letter_wood.png` to the inner `overflow-auto` flex wrapper in `LetterPreview`, not to the white page `motion.div`.

**Rationale:** The letter page stays white for WYSIWYG fidelity; the desk metaphor is chrome around the sheet.

**Alternative considered:** Background on the splitter panel — rejected because the PDF export button and toast live in the outer `relative` wrapper; keeping background on the scroll area avoids painting under fixed controls incorrectly.

### 2. Zoom out via CSS `transform: scale()` on a page wrapper

**Choice:** Wrap the existing `210mm × 297mm` page in a wrapper and apply `transform: scale(0.88)` (tune visually in implementation, target ~85–90%) with `transform-origin: top center`.

**Rationale:** Internal mm sizing and `containerType: inline-size` / `cqw` units remain unchanged; only visual presentation shrinks.

**Alternative considered:** Reducing `width`/`height` in mm — would break container-query font sizes relative to the page box.

### 3. Import asset via Vite bundler

**Choice:** `import woodBackground from "../../../assets/background_letter_wood.png"` and pass to inline `backgroundImage` or a CSS module.

**Rationale:** Matches existing Vite/React asset handling; path is stable at build time.

### 4. Background CSS: `cover`, centered, no repeat

**Choice:** `background-size: cover; background-position: center; background-repeat: no-repeat;`

**Rationale:** Matches the non-repeating photo asset; fills the preview area on resize.

### 5. Remove redundant gray fill where wood shows

**Choice:** Drop `surface-200` from the preview splitter panel class in `LetterEditor.tsx` (or use transparent) so the wood is not hidden behind PrimeReact surface color.

**Rationale:** The wood image replaces the gray preview chrome.

## Risks / Trade-offs

- **[Busy background reduces contrast]** → Keep/enhance `shadow-4` on the white page; optional slightly stronger shadow if needed during implementation.
- **[Scale + scroll height]** → Wrapper must reserve layout space for the scaled page (e.g. wrapper sized to unscaled dimensions with scale transform, or explicit min-height) so scrolling and centering behave correctly.
- **[Large image asset]** → Single static PNG; acceptable for desktop Tauri app; no runtime fetch.

## Migration Plan

Single frontend deploy; no data migration. Revert by removing background styles and scale wrapper.

## Open Questions

(None — scale factor can be finalized visually during implementation, default ~0.88.)
