import type { FontDetection } from '@showmyinfo/shared';

const TEST_FONTS = [
  // Windows
  'Arial',
  'Arial Black',
  'Calibri',
  'Cambria',
  'Comic Sans MS',
  'Consolas',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Segoe UI',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  // macOS
  'Avenir',
  'Futura',
  'Geneva',
  'Gill Sans',
  'Helvetica',
  'Helvetica Neue',
  'Lucida Grande',
  'Menlo',
  'Monaco',
  'Optima',
  'Palatino',
  'San Francisco',
  'SF Pro',
  // Linux
  'DejaVu Sans',
  'DejaVu Serif',
  'Droid Sans',
  'Fira Sans',
  'Liberation Mono',
  'Liberation Sans',
  'Noto Sans',
  'Roboto',
  'Ubuntu',
  // Common
  'Century Gothic',
  'Copperplate',
  'Franklin Gothic',
  'Garamond',
  'Rockwell',
];

export function getFontDetection(): FontDetection {
  try {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return { detected: [], total: 0 };
    }

    // Get base widths
    const baseWidths: Record<string, number> = {};
    for (const baseFont of baseFonts) {
      ctx.font = `${testSize} ${baseFont}`;
      baseWidths[baseFont] = ctx.measureText(testString).width;
    }

    const detected: string[] = [];

    for (const font of TEST_FONTS) {
      let isDetected = false;

      for (const baseFont of baseFonts) {
        ctx.font = `${testSize} '${font}', ${baseFont}`;
        const width = ctx.measureText(testString).width;

        if (width !== baseWidths[baseFont]) {
          isDetected = true;
          break;
        }
      }

      if (isDetected) {
        detected.push(font);
      }
    }

    return {
      detected,
      total: detected.length,
    };
  } catch {
    return { detected: [], total: 0 };
  }
}
