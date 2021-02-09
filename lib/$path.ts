/* eslint-disable */
export const pagesPath = {
  lab: {
    amp: {
      hybrid: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/amp/hybrid' as const, hash: url?.hash })
      },
      normal: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/amp/normal' as const, hash: url?.hash })
      },
      stories: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/amp/stories' as const, hash: url?.hash })
      }
    },
    apps: {
      aspect_module: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/apps/aspect.module' as const, hash: url?.hash })
      },
      aspect: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/apps/aspect' as const, hash: url?.hash })
      }
    },
    form: {
      contact: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/form/contact' as const, hash: url?.hash })
      }
    },
    game: {
      reversi: {
        index_module: {
          $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/reversi/index.module' as const, hash: url?.hash })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/reversi' as const, hash: url?.hash })
      },
      tictactoe: {
        index_module: {
          $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/tictactoe/index.module' as const, hash: url?.hash })
        },
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/tictactoe' as const, hash: url?.hash })
      }
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/lab' as const, hash: url?.hash })
  },
  posts: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  images: {
    profile_jpg: '/images/profile.jpg'
  },
  sitemap_xml: '/sitemap.xml'
} as const

export type StaticPath = typeof staticPath
