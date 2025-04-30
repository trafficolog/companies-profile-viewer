import { render, screen } from '@testing-library/react';
import CompanyTable from '../company/list/table';
import { server } from '@/mocks/server';
import { HttpResponse, http } from 'msw';
import { mockCompany } from '@/mocks/test-utils';
import { NormalizedCompany } from '@/types/company';
import { normalizeCompany } from '@/lib/normalizers';

describe('CompanyTable', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // Create a normalized mock company for testing
  const normalizedMockCompany: NormalizedCompany = normalizeCompany(mockCompany);

  it('should render company data', async () => {
    server.use(
      http.get('*/company-profiles', () => {
        return HttpResponse.json({
          data: [mockCompany],
          meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 } }
        });
      })
    );

    render(
      <CompanyTable 
        data={[normalizedMockCompany]} 
        sorting={[{ id: 'name', desc: false }]} 
        onSortingChange={() => {}}
      />
    );
    
    // Updated test to check for actual data from the mock
    expect(await screen.findByText(normalizedMockCompany.name)).toBeInTheDocument();
    if (normalizedMockCompany.industry) {
      expect(screen.getByText(normalizedMockCompany.industry.displayName)).toBeInTheDocument();
    }
  });

  it('should show empty state', async () => {
    server.use(
      http.get('*/company-profiles', () => {
        return HttpResponse.json({
          data: [],
          meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } }
        });
      })
    );

    render(
      <CompanyTable 
        data={[]} 
        sorting={[{ id: 'name', desc: false }]} 
        onSortingChange={() => {}}
      />
    );
    expect(await screen.findByText('Нет данных для отображения')).toBeInTheDocument();
  });
});