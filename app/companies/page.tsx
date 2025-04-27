"use client";

import { useState, useEffect } from "react";
import { title, subtitle } from "@/components/primitives";
import LayoutWrapper from "../layout-wrapper";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import CompanyTable from "@/components/company-table";
import { companyProfileApi } from "@/lib/api";
import { NormalizedCompany } from "@/types/company";
import { SearchIcon, FilterIcon } from "@/components/icons";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<NormalizedCompany[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'name',
    direction: 'ascending' as const
  });

  useEffect(() => {
    const loadCompanies = async () => {
      setIsLoading(true);
      
      const sortString = `${sortDescriptor.column}:${sortDescriptor.direction === 'ascending' ? 'asc' : 'desc'}`;
      const filters: Record<string, any> = {};
      
      if (search.trim()) {
        filters.name = { $containsi: search.trim() };
      }
      
      try {
        const result = await companyProfileApi({
          page,
          pageSize,
          sort: sortString,
          filters,
        });

        
        console.log(result);
        
        setCompanies(result.data);
        setTotalPages(result.meta.pagination.pageCount);
      } catch (error) {
        console.error("Error loading companies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompanies();
  }, [page, pageSize, search, sortDescriptor]);

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h1 className={title({ size: "md" })}>Компании</h1>
          <p className={subtitle()}>
            База данных компаний из различных публичных источников
          </p>
        </div>
        
        <Card className="shadow-none border">
          <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2 w-full">
              <Input
                classNames={{
                  base: "w-full sm:max-w-[500px]",
                  inputWrapper: "h-10",
                }}
                placeholder="Поиск по названию компании..."
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                type="search"
                value={search}
                onValueChange={setSearch}
              />
              <Button
                color="primary"
                endContent={<FilterIcon />}
                size="sm"
                variant="flat"
              >
                Фильтры
              </Button>
            </div>
            <div className="ml-auto">
              <Chip color="secondary" variant="flat">
                Найдено: {isLoading ? "..." : companies.length}
              </Chip>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" color="primary" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <CompanyTable
                    companies={companies}
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                  />
                </div>
              </>
            )}
          </CardBody>
          {totalPages > 1 && (
            <>
              <Divider />
              <CardFooter className="flex justify-center">
                <Pagination
                  total={totalPages}
                  initialPage={page}
                  onChange={(newPage) => setPage(newPage)}
                  showControls
                />
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </LayoutWrapper>
  );
}
