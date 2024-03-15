/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const { loadCustomBuildParams } = require('./next-utils.config')
const { esmExternals = false, tsconfigPath } =
  loadCustomBuildParams()
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['apis.sonjoydev.com'],
  },
  env: {
    customKey: 'my-value',
  },
}

module.exports = nextConfig

