/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript'

import info from '@functions/info'

const serverlessConfiguration: AWS = {
  service: 'api-showmyinfo-net',
  frameworkVersion: '2',
  custom: {
    domains: {
      prod: 'api.showmyinfo.net',
      dev: 'dev-api.showmyinfo.net'
    },
    customDomain: {
      http: {
        domainName: '${self:custom.domains.${opt:stage}}',
        basePath: '',
        certificateName: 'showmyinfo.net',
        createRoute53Record: true,
        endpointType: 'regional',
        securityPolicy: 'tls_1_2'
      }
    },
    prune: {
      automatic: true,
      number: 3
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack', 'serverless-domain-manager', 'serverless-prune-plugin'],
  provider: {
    name: 'aws',
    region: 'us-west-2',
    profile: 'showmyinfo',
    httpApi: {
      cors: {
        allowedHeaders: ['Content-Type', 'Authorization', 'Company'],
        allowedMethods: ['GET']
      }
    },
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    lambdaHashingVersion: '20201221'
  },
  // import the function via paths
  functions: { info }
}

module.exports = serverlessConfiguration
