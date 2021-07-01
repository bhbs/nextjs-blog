/* eslint-disable */
// prettier-ignore
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
      iporker: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/iporker' as const, hash: url?.hash })
      },
      reversi: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/reversi' as const, hash: url?.hash })
      },
      tictactoe: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/game/tictactoe' as const, hash: url?.hash })
      }
    },
    media: {
      line: {
        $url: (url?: { hash?: string }) => ({ pathname: '/lab/media/line' as const, hash: url?.hash })
      }
    },
    vite: {
      $url: (url?: { hash?: string }) => ({ pathname: '/lab/vite' as const, hash: url?.hash })
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

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
export const staticPath = {
  robots_txt: '/robots.txt',
  sitemap_xml: '/sitemap.xml'
} as const

// prettier-ignore
export type StaticPath = typeof staticPath
