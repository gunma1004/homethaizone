import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://homethaizone.netlify.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 검색 노출을 제외할 관리자나 API 경로가 있다면 아래에 추가
      // disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}