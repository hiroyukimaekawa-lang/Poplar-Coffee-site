/**
 * API設定ファイル
 */

export const API_CONFIG = {
  BASE_URL: 'https://www.cafe-eikokuya.jp/wp-json/wp/v2',
  ENDPOINTS: {
    POSTS: '/posts',
    PAGES: '/pages',
    CATEGORIES: '/categories',
    TAGS: '/tags',
  },
  DEFAULT_PARAMS: {
    _embed: true,
    per_page: 10,
  },
}

/**
 * APIリクエストの共通処理
 */
export async function apiCall(endpoint, params = {}) {
  try {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`)
    
    // デフォルトパラメータをマージ
    const finalParams = {
      ...API_CONFIG.DEFAULT_PARAMS,
      ...params,
    }

    // URLパラメータを追加
    Object.entries(finalParams).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

/**
 * ニュース記事を取得
 */
export function fetchNews(params = {}) {
  return apiCall(API_CONFIG.ENDPOINTS.POSTS, {
    per_page: 6,
    ...params,
  })
}

/**
 * ページ情報を取得
 */
export function fetchPage(slug) {
  return apiCall(API_CONFIG.ENDPOINTS.PAGES, {
    slug,
  })
}
