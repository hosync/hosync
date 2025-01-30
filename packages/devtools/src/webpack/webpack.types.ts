export type WebpackMode = 'production' | 'development'
export type Package = 'api' | 'db' | 'design-system' | 'i18n' | 'utils'
export type ConfigArgs = {
  mode: WebpackMode
  packageName: Package
}
export type ModeArgs = {
  packageName: Package
  mode?: WebpackMode
  devServer?: boolean
  isAnalyze?: boolean
  port?: number
  analyzerPort?: number
  color?: string
  htmlOptions?: {
    title: string
    template: string
  }
}
