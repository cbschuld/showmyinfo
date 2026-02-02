import { useEffect } from 'preact/hooks';
import {
  serverInfo,
  clientInfo,
  isLoading,
  error,
  setServerInfo,
  setClientInfo,
  setLoading,
  setError,
} from './lib/store';
import { fetchServerInfo } from './lib/api';
import { collectClientInfo } from './lib/fingerprint';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Section } from './components/Section';
import { InfoRow } from './components/InfoRow';
import { FeatureGrid } from './components/FeatureGrid';
import { IPDisplay } from './components/IPDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ExportButtons } from './components/ExportButtons';

export function App() {
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [server, client] = await Promise.all([fetchServerInfo(), collectClientInfo()]);

        setServerInfo(server);
        setClientInfo(client);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />

      <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {isLoading.value ? (
          <LoadingSpinner />
        ) : error.value ? (
          <div class="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg">
            <p class="font-semibold">Error loading data</p>
            <p class="text-sm">{error.value}</p>
          </div>
        ) : (
          <div class="space-y-6">
            {/* IP Display */}
            <IPDisplay />

            {/* Export Buttons */}
            <div class="flex justify-end">
              <ExportButtons />
            </div>

            {/* Grid Layout */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Network & Geolocation */}
              <Section
                title="Network & Geolocation"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <InfoRow label="IP Address" value={serverInfo.value?.network.ip} mono />
                <InfoRow label="ASN" value={serverInfo.value?.network.asn} />
                <InfoRow label="ISP" value={serverInfo.value?.network.asnOrganization} />
                <InfoRow label="Datacenter" value={serverInfo.value?.network.colo} />
                <InfoRow label="Country" value={serverInfo.value?.geo.country} />
                <InfoRow label="Region" value={serverInfo.value?.geo.region} />
                <InfoRow label="City" value={serverInfo.value?.geo.city} />
                <InfoRow label="Postal Code" value={serverInfo.value?.geo.postalCode} />
                <InfoRow label="Coordinates" value={serverInfo.value?.geo.latitude && serverInfo.value?.geo.longitude ? `${serverInfo.value.geo.latitude}, ${serverInfo.value.geo.longitude}` : undefined} />
                <InfoRow label="Timezone" value={serverInfo.value?.geo.timezone} />
                <InfoRow label="EU Country" value={serverInfo.value?.geo.isEU} />
              </Section>

              {/* TLS & Protocol */}
              <Section
                title="TLS & Protocol"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              >
                <InfoRow label="TLS Version" value={serverInfo.value?.tls.version} />
                <InfoRow label="Cipher Suite" value={serverInfo.value?.tls.cipher} mono />
                <InfoRow label="HTTP Protocol" value={serverInfo.value?.tls.protocol} />
              </Section>

              {/* HTTP Headers */}
              <Section
                title="HTTP Headers"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                }
              >
                <InfoRow label="User-Agent" value={serverInfo.value?.headers.userAgent} mono />
                <InfoRow label="Accept-Language" value={serverInfo.value?.headers.acceptLanguage} />
                <InfoRow label="Accept-Encoding" value={serverInfo.value?.headers.acceptEncoding} />
                <InfoRow label="DNT" value={serverInfo.value?.headers.dnt} />
                <InfoRow label="Sec-CH-UA" value={serverInfo.value?.headers.secChUa} mono />
                <InfoRow label="Platform" value={serverInfo.value?.headers.secChUaPlatform} />
                <InfoRow label="Mobile" value={serverInfo.value?.headers.secChUaMobile} />
              </Section>

              {/* Screen & Display */}
              <Section
                title="Screen & Display"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              >
                <InfoRow label="Resolution" value={clientInfo.value ? `${clientInfo.value.screen.width} x ${clientInfo.value.screen.height}` : undefined} />
                <InfoRow label="Available" value={clientInfo.value ? `${clientInfo.value.screen.availWidth} x ${clientInfo.value.screen.availHeight}` : undefined} />
                <InfoRow label="Color Depth" value={clientInfo.value?.screen.colorDepth ? `${clientInfo.value.screen.colorDepth}-bit` : undefined} />
                <InfoRow label="Pixel Ratio" value={clientInfo.value?.screen.pixelRatio} />
                <InfoRow label="Orientation" value={clientInfo.value?.screen.orientation} />
              </Section>

              {/* Hardware */}
              <Section
                title="Hardware"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                }
              >
                <InfoRow label="CPU Cores" value={clientInfo.value?.hardware.hardwareConcurrency} />
                <InfoRow label="Device Memory" value={clientInfo.value?.hardware.deviceMemory ? `${clientInfo.value.hardware.deviceMemory} GB` : undefined} />
                <InfoRow label="Touch Support" value={clientInfo.value?.hardware.touchSupport} />
                <InfoRow label="Max Touch Points" value={clientInfo.value?.hardware.maxTouchPoints} />
              </Section>

              {/* Battery */}
              {clientInfo.value?.battery && (
                <Section
                  title="Battery"
                  icon={
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2M5 12a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  }
                >
                  <InfoRow label="Level" value={clientInfo.value.battery.level !== undefined ? `${Math.round(clientInfo.value.battery.level * 100)}%` : undefined} />
                  <InfoRow label="Charging" value={clientInfo.value.battery.charging} />
                </Section>
              )}

              {/* Connection */}
              {clientInfo.value?.connection && (
                <Section
                  title="Network Connection"
                  icon={
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  }
                >
                  <InfoRow label="Effective Type" value={clientInfo.value.connection.effectiveType} />
                  <InfoRow label="Downlink" value={clientInfo.value.connection.downlink ? `${clientInfo.value.connection.downlink} Mbps` : undefined} />
                  <InfoRow label="RTT" value={clientInfo.value.connection.rtt ? `${clientInfo.value.connection.rtt} ms` : undefined} />
                  <InfoRow label="Data Saver" value={clientInfo.value.connection.saveData} />
                </Section>
              )}

              {/* WebGL */}
              <Section
                title="WebGL"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                }
              >
                <InfoRow label="Supported" value={clientInfo.value?.webgl.supported} />
                <InfoRow label="Vendor" value={clientInfo.value?.webgl.vendor} />
                <InfoRow label="Renderer" value={clientInfo.value?.webgl.renderer} />
                <InfoRow label="Version" value={clientInfo.value?.webgl.version} mono />
              </Section>

              {/* Canvas & Audio */}
              <Section
                title="Fingerprints"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                }
              >
                <InfoRow label="Canvas Hash" value={clientInfo.value?.canvas.hash} mono />
                <InfoRow label="Audio Hash" value={clientInfo.value?.audio.hash} mono />
                <InfoRow label="Fonts Detected" value={clientInfo.value?.fonts.total} />
              </Section>

              {/* WebRTC */}
              <Section
                title="WebRTC"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                }
              >
                <InfoRow label="Supported" value={clientInfo.value?.webrtc.supported} />
                <InfoRow label="Local IPs" value={clientInfo.value?.webrtc.localIPs.join(', ') || 'None detected'} mono />
              </Section>

              {/* Browser */}
              <Section
                title="Browser"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                }
              >
                <InfoRow label="Language" value={clientInfo.value?.browser.language} />
                <InfoRow label="Languages" value={clientInfo.value?.browser.languages.join(', ')} />
                <InfoRow label="Platform" value={clientInfo.value?.browser.platform} />
                <InfoRow label="Vendor" value={clientInfo.value?.browser.vendor} />
                <InfoRow label="Cookies Enabled" value={clientInfo.value?.browser.cookieEnabled} />
                <InfoRow label="PDF Viewer" value={clientInfo.value?.browser.pdfViewerEnabled} />
              </Section>

              {/* Timezone */}
              <Section
                title="Timezone"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <InfoRow label="Name" value={clientInfo.value?.timezone.name} />
                <InfoRow label="Offset" value={clientInfo.value?.timezone.offsetString} />
              </Section>

              {/* Privacy */}
              <Section
                title="Privacy"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              >
                <InfoRow label="Do Not Track" value={clientInfo.value?.privacy.doNotTrack} />
                <InfoRow label="Ad Blocker" value={clientInfo.value?.privacy.adBlockerDetected} />
                <InfoRow label="Cookies Enabled" value={clientInfo.value?.privacy.cookiesEnabled} />
              </Section>

              {/* Media Devices */}
              <Section
                title="Media Devices"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                }
              >
                <InfoRow label="Audio Inputs" value={clientInfo.value?.media.audioInputCount} />
                <InfoRow label="Audio Outputs" value={clientInfo.value?.media.audioOutputCount} />
                <InfoRow label="Video Inputs" value={clientInfo.value?.media.videoInputCount} />
              </Section>

              {/* Storage */}
              <Section
                title="Storage"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                }
              >
                <InfoRow label="Local Storage" value={clientInfo.value?.storage.localStorage} />
                <InfoRow label="Session Storage" value={clientInfo.value?.storage.sessionStorage} />
                <InfoRow label="IndexedDB" value={clientInfo.value?.storage.indexedDB} />
                <InfoRow label="Cookies" value={clientInfo.value?.storage.cookies} />
              </Section>
            </div>

            {/* Feature Detection - Full Width */}
            {clientInfo.value && (
              <Section
                title="Browser Features"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                }
              >
                <FeatureGrid features={clientInfo.value.features} />
              </Section>
            )}

            {/* Detected Fonts */}
            {clientInfo.value && clientInfo.value.fonts.detected.length > 0 && (
              <Section
                title="Detected Fonts"
                icon={
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              >
                <div class="flex flex-wrap gap-2">
                  {clientInfo.value.fonts.detected.map((font) => (
                    <span
                      key={font}
                      class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {font}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
