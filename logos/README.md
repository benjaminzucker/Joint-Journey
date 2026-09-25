# Joint Journey - Logo Assets

High-resolution logo files for presentations, documents, and print.
Brand colours: **Three Farm Green `#475953`** and **Amber `#FF8F00`**.

All PNGs are rendered from the vector SVGs using headless Chrome (with the real
Inter webfont for the wordmark), so they are genuinely sharp - not upscaled.

## Which file do I use?

### For PowerPoint / Keynote / Word - use the maximum-quality PNGs
| Need | Best file (max quality) |
|------|-------------------------|
| Full logo on a **white / light** slide | `full-logo-light-bg-4800.png` |
| Full logo on a **dark / green** slide | `full-logo-dark-bg-4800.png` |
| Full logo as a self-contained **green banner** | `full-logo-on-green-4800.png` |
| Just the **icon** (no text) on a light slide | `icon-transparent-4096.png` |
| Just the **icon** on a green tile (app-icon look) | `icon-on-green-4096.png` |

- The **4096 / 4800** versions are maximum quality - use these for title slides, full-screen, or anything projected. They stay crisp however large you scale them.
- The **2048 / 2400** versions are provided as smaller alternatives for inline use (slide corners, headers) where file size matters.
- The transparent PNGs (light-bg, dark-bg, and both icons) have a see-through background, so they sit cleanly on any colour.

### For the web / scalable use - use the SVGs
The `.svg` files are vector - infinitely scalable with no quality loss. Use these
wherever the tool supports SVG (modern web, Figma, Illustrator). PowerPoint's SVG
support is patchy, which is why the high-res PNGs above are provided.

## Files

**Source (vector):**
- `icon-transparent.svg` - outlined mountain + amber flag, transparent bg
- `icon-on-green.svg` - filled mountain + flag on a rounded green tile
- `full-logo-light-bg.svg` - icon + "JointJourney" wordmark, dark green (for light bgs)
- `full-logo-dark-bg.svg` - icon + wordmark in white (for dark bgs)
- `full-logo-on-green.svg` - icon + white wordmark on a green banner

**Exported (raster PNG):**
- `icon-transparent-{2048,4096}.png`
- `icon-on-green-{2048,4096}.png`
- `full-logo-light-bg-{2400,4800}.png`
- `full-logo-dark-bg-{2400,4800}.png`
- `full-logo-on-green-{2400,4800}.png`

## Regenerating the PNGs (high quality)
PNGs are rendered with headless Chrome, which rasterises the vector at full
resolution (macOS's `sips` upscales a tiny bitmap and looks pixelated, so it is
not used). Each SVG is wrapped in an HTML page at a *logical* size, then Chrome
supersamples it with `--force-device-scale-factor=8`:

```bash
CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
# Example: icon at 512 logical x8 = 4096px; logo at 600x135 logical x8 = 4800x1080.
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=8 --default-background-color=00000000 \
  --virtual-time-budget=4000 --window-size=512,512 \
  --screenshot=icon-transparent-4096.png icon-transparent.render.html
```
(Drop `--default-background-color=00000000` for the solid-green versions. The
`.render.html` wrappers load Inter from Google Fonts so the wordmark matches the
website exactly. For higher still, increase the scale factor, e.g. x16 = 8192px.)

