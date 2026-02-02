import type { WebRTCInfo } from '@showmyinfo/shared';

export async function getWebRTCInfo(): Promise<WebRTCInfo> {
  const RTCPeerConnection = window.RTCPeerConnection || (window as unknown as { webkitRTCPeerConnection: typeof window.RTCPeerConnection }).webkitRTCPeerConnection;

  if (!RTCPeerConnection) {
    return { localIPs: [], supported: false };
  }

  try {
    const localIPs = new Set<string>();

    const pc = new RTCPeerConnection({
      iceServers: [],
    });

    pc.createDataChannel('');

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await new Promise<void>((resolve) => {
      const timeout = setTimeout(() => resolve(), 1000);

      pc.onicecandidate = (event) => {
        if (!event.candidate) {
          clearTimeout(timeout);
          resolve();
          return;
        }

        const candidate = event.candidate.candidate;
        const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}|([a-f0-9]{1,4}:){7}[a-f0-9]{1,4}/gi;
        const matches = candidate.match(ipRegex);

        if (matches) {
          for (const ip of matches) {
            // Filter out STUN/TURN server IPs (usually public)
            if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
              localIPs.add(ip);
            }
          }
        }
      };
    });

    pc.close();

    return {
      localIPs: Array.from(localIPs),
      supported: true,
    };
  } catch {
    return { localIPs: [], supported: false };
  }
}
