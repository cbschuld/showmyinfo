import type {
  ClientInfo,
  ScreenInfo,
  HardwareInfo,
  BatteryInfo,
  ConnectionInfo,
  StorageInfo,
  FeatureDetection,
  MediaDevices,
  PermissionsInfo,
  PermissionStateValue,
  PrivacyInfo,
  BrowserInfo,
  TimezoneInfo,
} from '@showmyinfo/shared';
import { getCanvasFingerprint } from './canvas';
import { getWebGLInfo } from './webgl';
import { getAudioFingerprint } from './audio';
import { getFontDetection } from './fonts';
import { getWebRTCInfo } from './webrtc';

function getScreenInfo(): ScreenInfo {
  return {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
    pixelRatio: window.devicePixelRatio,
    orientation: screen.orientation?.type,
  };
}

function getHardwareInfo(): HardwareInfo {
  return {
    deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
}

async function getBatteryInfo(): Promise<BatteryInfo | undefined> {
  try {
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{
        charging: boolean;
        chargingTime: number;
        dischargingTime: number;
        level: number;
      }>;
    };

    if (!nav.getBattery) return undefined;

    const battery = await nav.getBattery();
    return {
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
      level: battery.level,
    };
  } catch {
    return undefined;
  }
}

function getConnectionInfo(): ConnectionInfo | undefined {
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
      type?: string;
    };
  };

  if (!nav.connection) return undefined;

  return {
    effectiveType: nav.connection.effectiveType,
    downlink: nav.connection.downlink,
    rtt: nav.connection.rtt,
    saveData: nav.connection.saveData,
    type: nav.connection.type,
  };
}

function getStorageInfo(): StorageInfo {
  let localStorage = false;
  let sessionStorage = false;

  try {
    localStorage = !!window.localStorage;
    window.localStorage.setItem('test', 'test');
    window.localStorage.removeItem('test');
    localStorage = true;
  } catch {
    localStorage = false;
  }

  try {
    sessionStorage = !!window.sessionStorage;
    window.sessionStorage.setItem('test', 'test');
    window.sessionStorage.removeItem('test');
    sessionStorage = true;
  } catch {
    sessionStorage = false;
  }

  return {
    localStorage,
    sessionStorage,
    indexedDB: !!window.indexedDB,
    cookies: navigator.cookieEnabled,
  };
}

function getFeatureDetection(): FeatureDetection {
  return {
    webAssembly: typeof WebAssembly === 'object',
    webGL: !!document.createElement('canvas').getContext('webgl'),
    webGL2: !!document.createElement('canvas').getContext('webgl2'),
    webGPU: 'gpu' in navigator,
    serviceWorker: 'serviceWorker' in navigator,
    webWorker: typeof Worker !== 'undefined',
    sharedWorker: typeof SharedWorker !== 'undefined',
    webSocket: typeof WebSocket !== 'undefined',
    webRTC: !!(window.RTCPeerConnection || (window as unknown as { webkitRTCPeerConnection?: unknown }).webkitRTCPeerConnection),
    notifications: 'Notification' in window,
    geolocation: 'geolocation' in navigator,
    bluetooth: 'bluetooth' in navigator,
    usb: 'usb' in navigator,
    midi: 'requestMIDIAccess' in navigator,
    gamepad: 'getGamepads' in navigator,
    speechSynthesis: 'speechSynthesis' in window,
    speechRecognition: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window,
    vibration: 'vibrate' in navigator,
    clipboard: 'clipboard' in navigator,
    fullscreen: 'fullscreenEnabled' in document || 'webkitFullscreenEnabled' in document,
    pictureInPicture: 'pictureInPictureEnabled' in document,
    pointerLock: 'pointerLockElement' in document,
    wakeLock: 'wakeLock' in navigator,
  };
}

async function getMediaDevices(): Promise<MediaDevices> {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return {
      audioInputCount: devices.filter((d) => d.kind === 'audioinput').length,
      audioOutputCount: devices.filter((d) => d.kind === 'audiooutput').length,
      videoInputCount: devices.filter((d) => d.kind === 'videoinput').length,
    };
  } catch {
    return { audioInputCount: 0, audioOutputCount: 0, videoInputCount: 0 };
  }
}

async function getPermissionsInfo(): Promise<PermissionsInfo> {
  const permissions: PermissionsInfo = {};

  if (!('permissions' in navigator)) return permissions;

  const queries: Array<{ name: PermissionName; key: keyof PermissionsInfo }> = [
    { name: 'notifications', key: 'notifications' },
    { name: 'geolocation', key: 'geolocation' },
    { name: 'camera' as PermissionName, key: 'camera' },
    { name: 'microphone' as PermissionName, key: 'microphone' },
    { name: 'clipboard-read' as PermissionName, key: 'clipboard' },
  ];

  for (const { name, key } of queries) {
    try {
      const result = await navigator.permissions.query({ name });
      permissions[key] = result.state as PermissionStateValue;
    } catch {
      // Permission not supported
    }
  }

  return permissions;
}

function getPrivacyInfo(): PrivacyInfo {
  // Check for ad blocker
  let adBlockerDetected = false;
  try {
    const ad = document.createElement('div');
    ad.textContent = '\u00A0'; // Non-breaking space
    ad.className = 'adsbox ad-banner ad-placement';
    ad.style.cssText = 'position:absolute;left:-9999px;';
    document.body.appendChild(ad);
    adBlockerDetected = ad.offsetHeight === 0 || ad.clientHeight === 0;
    document.body.removeChild(ad);
  } catch {
    adBlockerDetected = false;
  }

  return {
    doNotTrack: navigator.doNotTrack === '1' || (window as Window & { doNotTrack?: string }).doNotTrack === '1',
    adBlockerDetected,
    cookiesEnabled: navigator.cookieEnabled,
  };
}

function getBrowserInfo(): BrowserInfo {
  const plugins: string[] = [];
  const mimeTypes: string[] = [];

  for (let i = 0; i < navigator.plugins.length; i++) {
    const plugin = navigator.plugins[i];
    if (plugin) plugins.push(plugin.name);
  }

  for (let i = 0; i < navigator.mimeTypes.length; i++) {
    const mimeType = navigator.mimeTypes[i];
    if (mimeType) mimeTypes.push(mimeType.type);
  }

  return {
    language: navigator.language,
    languages: [...navigator.languages],
    platform: navigator.platform,
    vendor: navigator.vendor,
    cookieEnabled: navigator.cookieEnabled,
    pdfViewerEnabled: 'pdfViewerEnabled' in navigator ? navigator.pdfViewerEnabled : false,
    javaEnabled: navigator.javaEnabled?.() ?? false,
    plugins,
    mimeTypes,
  };
}

function getTimezoneInfo(): TimezoneInfo {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';

  return {
    name: Intl.DateTimeFormat().resolvedOptions().timeZone,
    offset: -offset, // Convert to standard offset (positive = east of UTC)
    offsetString: `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
  };
}

export async function collectClientInfo(): Promise<ClientInfo> {
  const [canvas, webgl, audio, webrtc, battery, media, permissions] = await Promise.all([
    getCanvasFingerprint(),
    Promise.resolve(getWebGLInfo()),
    getAudioFingerprint(),
    getWebRTCInfo(),
    getBatteryInfo(),
    getMediaDevices(),
    getPermissionsInfo(),
  ]);

  return {
    screen: getScreenInfo(),
    hardware: getHardwareInfo(),
    battery,
    connection: getConnectionInfo(),
    webrtc,
    canvas,
    webgl,
    audio,
    fonts: getFontDetection(),
    storage: getStorageInfo(),
    features: getFeatureDetection(),
    media,
    permissions,
    privacy: getPrivacyInfo(),
    browser: getBrowserInfo(),
    timezone: getTimezoneInfo(),
    timestamp: new Date().toISOString(),
  };
}
