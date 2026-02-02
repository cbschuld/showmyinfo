// ============================================================================
// Server-Side Data (from Cloudflare Worker)
// ============================================================================

export interface GeoLocation {
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  timezone?: string;
  isEU?: boolean;
}

export interface NetworkInfo {
  ip: string;
  asn?: number;
  asnOrganization?: string;
  colo?: string;
}

export interface TLSInfo {
  version?: string;
  cipher?: string;
  protocol?: string;
}

export interface HttpHeaders {
  userAgent?: string;
  acceptLanguage?: string;
  acceptEncoding?: string;
  accept?: string;
  dnt?: string;
  secFetchDest?: string;
  secFetchMode?: string;
  secFetchSite?: string;
  secFetchUser?: string;
  secChUa?: string;
  secChUaPlatform?: string;
  secChUaMobile?: string;
  secChUaFullVersion?: string;
  secChUaPlatformVersion?: string;
  secChUaArch?: string;
  secChUaBitness?: string;
  secChUaModel?: string;
  referer?: string;
  cacheControl?: string;
  connection?: string;
}

export interface ServerInfo {
  network: NetworkInfo;
  geo: GeoLocation;
  tls: TLSInfo;
  headers: HttpHeaders;
  timestamp: string;
}

// ============================================================================
// Client-Side Data (from Browser JavaScript)
// ============================================================================

export interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelDepth: number;
  pixelRatio: number;
  orientation?: string;
}

export interface HardwareInfo {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  maxTouchPoints: number;
  touchSupport: boolean;
}

export interface BatteryInfo {
  charging?: boolean;
  chargingTime?: number;
  dischargingTime?: number;
  level?: number;
}

export interface ConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  type?: string;
}

export interface WebRTCInfo {
  localIPs: string[];
  supported: boolean;
}

export interface CanvasFingerprint {
  hash: string;
  supported: boolean;
}

export interface WebGLInfo {
  vendor?: string;
  renderer?: string;
  version?: string;
  shadingLanguageVersion?: string;
  extensions: string[];
  supported: boolean;
}

export interface AudioFingerprint {
  hash?: string;
  supported: boolean;
}

export interface FontDetection {
  detected: string[];
  total: number;
}

export interface StorageInfo {
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  cookies: boolean;
  quota?: {
    usage?: number;
    quota?: number;
  };
}

export interface FeatureDetection {
  webAssembly: boolean;
  webGL: boolean;
  webGL2: boolean;
  webGPU: boolean;
  serviceWorker: boolean;
  webWorker: boolean;
  sharedWorker: boolean;
  webSocket: boolean;
  webRTC: boolean;
  notifications: boolean;
  geolocation: boolean;
  bluetooth: boolean;
  usb: boolean;
  midi: boolean;
  gamepad: boolean;
  speechSynthesis: boolean;
  speechRecognition: boolean;
  vibration: boolean;
  clipboard: boolean;
  fullscreen: boolean;
  pictureInPicture: boolean;
  pointerLock: boolean;
  wakeLock: boolean;
}

export interface MediaDevices {
  audioInputCount: number;
  audioOutputCount: number;
  videoInputCount: number;
}

export type PermissionStateValue = 'granted' | 'denied' | 'prompt';

export interface PermissionsInfo {
  notifications?: PermissionStateValue;
  geolocation?: PermissionStateValue;
  camera?: PermissionStateValue;
  microphone?: PermissionStateValue;
  clipboard?: PermissionStateValue;
}

export interface PrivacyInfo {
  doNotTrack: boolean;
  adBlockerDetected: boolean;
  cookiesEnabled: boolean;
  thirdPartyCookies?: boolean;
}

export interface BrowserInfo {
  language: string;
  languages: string[];
  platform: string;
  vendor?: string;
  cookieEnabled: boolean;
  pdfViewerEnabled: boolean;
  javaEnabled: boolean;
  plugins: string[];
  mimeTypes: string[];
}

export interface TimezoneInfo {
  name: string;
  offset: number;
  offsetString: string;
}

export interface ClientInfo {
  screen: ScreenInfo;
  hardware: HardwareInfo;
  battery?: BatteryInfo;
  connection?: ConnectionInfo;
  webrtc: WebRTCInfo;
  canvas: CanvasFingerprint;
  webgl: WebGLInfo;
  audio: AudioFingerprint;
  fonts: FontDetection;
  storage: StorageInfo;
  features: FeatureDetection;
  media: MediaDevices;
  permissions: PermissionsInfo;
  privacy: PrivacyInfo;
  browser: BrowserInfo;
  timezone: TimezoneInfo;
  timestamp: string;
}

// ============================================================================
// Combined API Response
// ============================================================================

export interface InfoResponse {
  server: ServerInfo;
  client?: ClientInfo;
}
