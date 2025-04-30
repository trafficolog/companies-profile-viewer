import { companyProfileApi } from '@/lib/api/companies';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { mockCompany, mockIndustry } from '@/mocks/test-utils';

describe('CompanyProfile API', () => {
  describe('CRUD Operations', () => {
    it('should fetch companies with pagination', async () => {
      server.use(
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
        })
      );

      const result = await companyProfileApi.find();
      expect(result.data).toEqual([mockCompany]);
      expect(result.meta.pagination.total).toBe(1);
    });

    it('should fetch companies with filters', async () => {
      // Проверка на правильное преобразование фильтров в запрос
      server.use(
        http.get('*/company-profiles', ({ request }) => {
          const url = new URL(request.url);
          const filters = url.searchParams.get('filters');
          
          // Проверяем, что параметр filters есть и это валидный JSON
          if (filters) {
            const parsedFilters = JSON.parse(filters);
            if (parsedFilters.priceTier === 'premium') {
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
            }
          }
          
          return new HttpResponse(null, { status: 400 });
        })
      );

      const result = await companyProfileApi.find({
        filters: { priceTier: 'premium' }
      });
      
      expect(result.data).toEqual([mockCompany]);
    });

    it('should fetch single company by ID', async () => {
      server.use(
        http.get('*/company-profiles/:id', ({ params }) => {
          return HttpResponse.json({
            data: {
              ...mockCompany,
              id: Number(params.id)
            }
          });
        })
      );

      const result = await companyProfileApi.findOne('1');
      expect(result.id).toBe(1); // Проверяем как число, не строку
      expect(result.name).toBe(mockCompany.name);
    });

    it('should fetch company with populated relations', async () => {
      server.use(
        http.get('*/company-profiles/:id', ({ request }) => {
          const url = new URL(request.url);
          // Проверяем, что запрос содержит параметр populate
          const hasPopulate = url.searchParams.has('populate[industry]') || 
                             url.searchParams.has('populate');
          
          return HttpResponse.json({
            data: {
              ...mockCompany,
              industry: hasPopulate ? {
                id: 1,
                name: mockIndustry.name, 
                slug: mockIndustry.slug
              } : undefined
            }
          });
        })
      );

      const result = await companyProfileApi.findOne('1', ['industry']);
      expect(result.industry?.id ?? undefined).toBe(1);
      expect(result.industry?.name ?? undefined).toBeDefined();
    });

    it('should count companies', async () => {
      server.use(
        http.get('*/company-profiles/count', () => {
          return HttpResponse.json({ count: 5 });
        })
      );

      const result = await companyProfileApi.count();
      expect(result.count).toBe(5);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 error', async () => {
      server.use(
        http.get('*/company-profiles/:id', () => {
          return new HttpResponse('Not found', { status: 404 });
        })
      );

      await expect(companyProfileApi.findOne('999')).rejects.toThrow();
    });

    it('should handle 500 error', async () => {
      server.use(
        http.get('*/company-profiles', () => {
          return new HttpResponse('Server error', { status: 500 });
        })
      );

      await expect(companyProfileApi.find()).rejects.toThrow();
    });

    it('should handle timeout error', async () => {
      server.use(
        http.get('*/company-profiles', async () => {
          // Имитация таймаута
          await new Promise(resolve => setTimeout(resolve, 100));
          return new HttpResponse(null, { status: 200 });
        })
      );

      // Для тестирования таймаута нам бы пришлось модифицировать API_TIMEOUT,
      // но вместо этого мы просто проверяем корректную обработку любой ошибки
      const originalFetch = global.fetch;
      global.fetch = jest.fn().mockImplementation(() => {
        throw new DOMException('The user aborted a request.', 'AbortError');
      });

      await expect(companyProfileApi.find()).rejects.toThrow();
      
      global.fetch = originalFetch;
    });
  });
});