import type { ServerInfo, GeoLocation, NetworkInfo, TLSInfo, HttpHeaders } from '@showmyinfo/shared';

export function handleInfo(request: Request, cf: CfProperties | undefined): ServerInfo {
  const headers = request.headers;

  const geo: GeoLocation = {
    country: cf?.country as string | undefined,
    countryCode: cf?.country as string | undefined,
    region: cf?.region as string | undefined,
    regionCode: cf?.regionCode as string | undefined,
    city: cf?.city as string | undefined,
    postalCode: cf?.postalCode as string | undefined,
    latitude: cf?.latitude as string | undefined,
    longitude: cf?.longitude as string | undefined,
    timezone: cf?.timezone as string | undefined,
    isEU: cf?.isEUCountry === '1',
  };

  const network: NetworkInfo = {
    ip: headers.get('cf-connecting-ip') || headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown',
    asn: cf?.asn as number | undefined,
    asnOrganization: cf?.asOrganization as string | undefined,
    colo: cf?.colo as string | undefined,
  };

  const tls: TLSInfo = {
    version: cf?.tlsVersion as string | undefined,
    cipher: cf?.tlsCipher as string | undefined,
    protocol: cf?.httpProtocol as string | undefined,
  };

  const httpHeaders: HttpHeaders = {
    userAgent: headers.get('user-agent') || undefined,
    acceptLanguage: headers.get('accept-language') || undefined,
    acceptEncoding: headers.get('accept-encoding') || undefined,
    accept: headers.get('accept') || undefined,
    dnt: headers.get('dnt') || undefined,
    secFetchDest: headers.get('sec-fetch-dest') || undefined,
    secFetchMode: headers.get('sec-fetch-mode') || undefined,
    secFetchSite: headers.get('sec-fetch-site') || undefined,
    secFetchUser: headers.get('sec-fetch-user') || undefined,
    secChUa: headers.get('sec-ch-ua') || undefined,
    secChUaPlatform: headers.get('sec-ch-ua-platform') || undefined,
    secChUaMobile: headers.get('sec-ch-ua-mobile') || undefined,
    secChUaFullVersion: headers.get('sec-ch-ua-full-version') || undefined,
    secChUaPlatformVersion: headers.get('sec-ch-ua-platform-version') || undefined,
    secChUaArch: headers.get('sec-ch-ua-arch') || undefined,
    secChUaBitness: headers.get('sec-ch-ua-bitness') || undefined,
    secChUaModel: headers.get('sec-ch-ua-model') || undefined,
    referer: headers.get('referer') || undefined,
    cacheControl: headers.get('cache-control') || undefined,
    connection: headers.get('connection') || undefined,
  };

  return {
    network,
    geo,
    tls,
    headers: httpHeaders,
    timestamp: new Date().toISOString(),
  };
}
