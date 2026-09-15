/** @type {import('next').NextConfig} */
const nextConfig = {
  // 根据环境自动选择输出模式：
  // - Cloudflare Pages (CF_PAGES 或 STATIC_EXPORT) → 静态导出
  // - Vercel 或 Docker → standalone
  // - 其他 → 默认（不设置 output）
  ...(process.env.CF_PAGES || process.env.STATIC_EXPORT
    ? { output: 'export' }
    : process.env.VERCEL || process.env.DOCKER_BUILD
    ? { output: 'standalone' }
    : {}),

  reactStrictMode: false,

  // Next.js 16 使用 Turbopack，配置 SVG 加载
  turbopack: {
    root: __dirname,
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // 性能优化：包体积优化和模块化导入
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      'framer-motion',
      'react-icons',
    ],
  },

  // 图片优化配置
  images: {
    // 静态导出时必须禁用 Next.js 图片优化，否则构建会报错
    unoptimized: process.env.CF_PAGES || process.env.STATIC_EXPORT ? true : false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
