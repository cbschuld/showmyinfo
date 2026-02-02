import type { AudioFingerprint } from '@showmyinfo/shared';

async function hashFloat32Array(arr: Float32Array): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(arr.toString());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function getAudioFingerprint(): Promise<AudioFingerprint> {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;

    if (!AudioContext) {
      return { supported: false };
    }

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const analyser = context.createAnalyser();
    const gain = context.createGain();
    const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

    gain.gain.value = 0; // Mute
    oscillator.type = 'triangle';
    oscillator.frequency.value = 10000;

    oscillator.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(gain);
    gain.connect(context.destination);

    oscillator.start(0);

    const fingerprint = await new Promise<Float32Array | null>((resolve) => {
      const timeout = setTimeout(() => {
        resolve(null);
      }, 1000);

      scriptProcessor.onaudioprocess = (event) => {
        clearTimeout(timeout);
        const output = event.inputBuffer.getChannelData(0);
        const copy = new Float32Array(output.length);
        copy.set(output);
        resolve(copy);
      };
    });

    oscillator.stop();
    await context.close();

    if (!fingerprint) {
      return { supported: false };
    }

    const hash = await hashFloat32Array(fingerprint);

    return {
      hash: hash.substring(0, 32),
      supported: true,
    };
  } catch {
    return { supported: false };
  }
}
