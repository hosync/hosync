export type Mode = 'production' | 'development'

export enum DeploymentType {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development'
}

export interface Configuration {
  siteTitle: string
  domainName: string
  theme?: {
    defaultTheme: 'light' | 'dark'
  }
  homeUrl?: string
  hostname?: string
  mode?: string
  api: {
    uri: string
  }
  files: {
    extensions: {
      images: Record<string, string[]>
      docs: Record<string, string[]>
    }
  }
}

const isProduction = process.env.NODE_ENV === 'production'
const isLocal = process.env.LOCAL === 'true'
const isLocalProduction = isProduction && isLocal

export const globalConfig: Configuration = {
  siteTitle: 'Hosync | Booking Control',
  domainName: 'hosync.com',
  theme: {
    defaultTheme: 'dark'
  },
  api: {
    uri: ''
  },
  files: {
    extensions: {
      images: {
        'image/jpeg': ['jpg', 'jpeg'],
        'image/png': ['png']
      },
      docs: {
        'application/pdf': ['pdf']
      }
    }
  }
}

const buildConfig = (): Configuration => {
  const config: Configuration = {
    ...globalConfig,
    api: {
      uri:
        isProduction && !isLocalProduction
          ? `https://${globalConfig.domainName}/graphql`
          : 'http://localhost:4000/graphql'
    },
    homeUrl: `https://${globalConfig.domainName}`,
    hostname:
      isProduction && !isLocalProduction
        ? globalConfig.domainName
        : 'localhost',
    mode: isProduction ? 'production' : 'development'
  }

  return config
}

const Config = buildConfig()

export default Config
