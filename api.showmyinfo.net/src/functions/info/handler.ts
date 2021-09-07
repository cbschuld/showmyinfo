import 'source-map-support/register'
import { APIGatewayProxyHandlerV2 } from 'aws-lambda'
import { detect } from 'detect-browser'

export const main: APIGatewayProxyHandlerV2 = async (event, _context) => {
  const ip = event?.requestContext?.http?.sourceIp
  const userAgent = event?.requestContext?.http?.userAgent

  const browser = detect(userAgent)

  return {
    statusCode: 200,
    body: JSON.stringify({ ip, userAgent, browser })
  }
}
