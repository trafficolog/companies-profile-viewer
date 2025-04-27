import { render, screen } from '@testing-library/react';
import CompanyTable from '../company-table';
import { server } from '@/mocks/server';
import { HttpResponse, http } from 'msw';
import { mockCompany } from '@/mocks/test-utils';

describe('CompanyTable', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render company data', async () => {
    server.use(
      http.get('*/company-profiles', () => {
        return HttpResponse.json({
          data: [mockCompany],
          meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 } }
        });
      })
    );

    render(<CompanyTable data={[mockCompany]} />);
    
    expect(await screen.findByText('Технологическая компания')).toBeInTheDocument();
    expect(screen.getByText('IT и разработка ПО')).toBeInTheDocument();
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

    render(<CompanyTable data={[]} />);
    expect(await screen.findByText('Нет данных для отображения')).toBeInTheDocument();
  });
});
