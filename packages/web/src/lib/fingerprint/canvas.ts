import type { CanvasFingerprint } from '@showmyinfo/shared';

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function getCanvasFingerprint(): Promise<CanvasFingerprint> {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return { hash: '', supported: false };
    }

    canvas.width = 200;
    canvas.height = 50;

    // Draw text with various styles
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);

    ctx.fillStyle = '#069';
    ctx.fillText('ShowMyInfo.net', 2, 15);

    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Canvas FP', 4, 17);

    // Add more complexity
    ctx.strokeStyle = '#0aa';
    ctx.arc(50, 25, 15, 0, Math.PI * 2);
    ctx.stroke();

    const dataUrl = canvas.toDataURL();
    const hash = await hashString(dataUrl);

    return {
      hash: hash.substring(0, 32),
      supported: true,
    };
  } catch {
    return { hash: '', supported: false };
  }
}
