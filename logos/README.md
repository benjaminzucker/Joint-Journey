# Joint Journey - Logo Assets

High-resolution logo files for presentations, documents, and print.
Brand colours: **Three Farm Green `#475953`** and **Amber `#FF8F00`**.

## Which file do I use?

### For PowerPoint / Keynote / Word (use the PNGs)
| Need | File |
|------|------|
| Full logo on a **white / light** slide | `full-logo-light-bg-2400.png` |
| Full logo on a **dark / green** slide | `full-logo-dark-bg-2400.png` |
| Full logo as a self-contained **green banner** | `full-logo-on-green-2400.png` |
| Just the **icon** (no text) on a light slide | `icon-transparent-2048.png` |
| Just the **icon** on a green tile (app-icon look) | `icon-on-green-2048.png` |

- Use the **2400 / 2048** versions for anything full-screen or projected - they're razor-sharp.
- Use the **1200 / 1024 / 512** versions for smaller placements (slide corners, headers) to keep file size down.
- The transparent PNGs have a see-through background, so they sit cleanly on any colour.

### For the web / scalable use (use the SVGs)
The `.svg` files are vector - infinitely scalable with no quality loss. Use these
wherever the tool supports SVG (modern web, Figma, Illustrator). PowerPoint's SVG
support is patchy, which is why PNGs are provided above.

## Files

**Source (vector):**
- `icon-transparent.svg` - outlined mountain + amber flag, transparent bg
- `icon-on-green.svg` - filled mountain + flag on a rounded green tile
- `full-logo-light-bg.svg` - icon + "JointJourney" wordmark, dark green (for light bgs)
- `full-logo-dark-bg.svg` - icon + wordmark in white (for dark bgs)
- `full-logo-on-green.svg` - icon + white wordmark on a green banner

**Exported (raster PNG):**
- `icon-transparent-{512,1024,2048}.png`
- `icon-on-green-{512,1024,2048}.png`
- `full-logo-light-bg-{1200,2400}.png`
- `full-logo-dark-bg-{1200,2400}.png`
- `full-logo-on-green-{1200,2400}.png`

## Regenerating the PNGs
From this folder, using macOS's built-in `sips`:
```bash
for sz in 512 1024 2048; do
  sips -s format png --resampleWidth $sz icon-transparent.svg --out icon-transparent-${sz}.png
  sips -s format png --resampleWidth $sz icon-on-green.svg --out icon-on-green-${sz}.png
done
for sz in 1200 2400; do
  sips -s format png --resampleWidth $sz full-logo-light-bg.svg --out full-logo-light-bg-${sz}.png
  sips -s format png --resampleWidth $sz full-logo-dark-bg.svg --out full-logo-dark-bg-${sz}.png
  sips -s format png --resampleWidth $sz full-logo-on-green.svg --out full-logo-on-green-${sz}.png
done
```
