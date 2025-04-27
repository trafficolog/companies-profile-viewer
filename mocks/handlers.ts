import { http, HttpResponse } from 'msw';
import { mockCompany } from './test-utils';

export const handlers = [
  http.get('*/health', () => {
    return HttpResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      services: {
        database: true,
        cache: true,
        storage: true
      }
    });
  }),

  http.get('*/company-profiles', () => {
    return HttpResponse.json({
      data: [mockCompany],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 1,
          total: 1
        }
      }
    });
  }),

  http.get('*/company-profiles/:id', ({ params }) => {
    return HttpResponse.json({
      data: {
        ...mockCompany,
        id: params.id
      }
    });
  }),

  http.get('*/company-profiles/count', () => {
    return HttpResponse.json({ count: 1 });
  }),
];
