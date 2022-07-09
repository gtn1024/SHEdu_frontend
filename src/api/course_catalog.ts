import type { CourseCatalogListResponse } from '@/model/response/course_catalog';
import { request } from 'umi';

// TODO: 分层
/** 退出登录接口 GET /api/course/catalog/all */
export async function getAllCourseCatalogs(options?: Record<string, any>) {
  return request<CourseCatalogListResponse>('/api/course/catalog/all', {
    method: 'GET',
    ...(options || {}),
  });
}
