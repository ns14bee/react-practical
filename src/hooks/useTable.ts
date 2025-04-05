import {  useCallback, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export enum SortOrder {
  ASC = 'asc',  
  DESC = 'desc'
}

export enum  PaginationAction {
  Prev = 'Prev',
  Next = 'Next'
}

export type Pagination = {
  page: number;
  limit: number;
}

export type Filter = { 
  search: string;
  pagination: Pagination;
  sort: {
    field: string;
    order: SortOrder;
  }
 }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTable =  <T extends Record<string, any>>(data: T[]) => {
  const [filter, setfilter] = useState<Filter>({
    search: '', 
    pagination: {
      page: 1,
      limit: 10,
    },
    sort: { 
      field: '',
      order: SortOrder.ASC
    }
  });

  const search = useDebounce(filter.search, 300);

  const filteredData = useMemo(() => {  
    if(search !== ''){
      return data.filter((item) => {
        if(Object.values(item).join('').toLowerCase().includes(search.toLowerCase())){
          return true;
        }
        return false;
      });
    }
    return data;
  }, [data, search]);

  const sortedData =  useMemo(() => {
    if(!filter.sort.field) return filteredData;
    const isAsc = filter.sort.order === SortOrder.ASC;
  
    return filteredData?.sort((a, b) => {
      const valueA = a[filter.sort.field];
      const valueB = b[filter.sort.field];
      if(valueA > valueB){
        return isAsc ? 1 : -1;
      } else if(valueA < valueB){
        return isAsc ? -1 : 1;
      } else {
        return 0;
      }
    })
    
  } , [filteredData, filter.sort.field, filter.sort.order]);
    
  const paginationData  = useMemo(() => {
    if(sortedData){
      const { page, limit } = filter.pagination;
      const totalPage = Math.ceil(sortedData?.length / limit);
      const start = (page - 1) * limit;
      const end = start + limit;
      return { data: sortedData?.slice(start, end), totalPage };
    }
    return { data: [], totalPage: 0 }
  }, [sortedData, filter.pagination]);

  const handleSetFileter = (newFilter: Partial<Filter>) => { 
    setfilter((prev) => ({
      ...prev,
      ...newFilter
    }))
  }

  const handleSortColumn = useCallback((field: string) => { 
    const sameField = filter.sort.field === field;
    const asc = !sameField ? SortOrder.ASC : filter.sort.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    handleSetFileter({sort: {field, order: asc}})
  },[filter.sort.field, filter.sort.order])

  const handlePagination = useCallback((action: PaginationAction) => {
    const {page, limit} = filter.pagination;
    if(action === PaginationAction.Prev && page <= 1) return;
    if(action === PaginationAction.Next && page >= paginationData.totalPage) return;
    const newPage = action === PaginationAction.Prev ? page - 1 : page + 1;
    handleSetFileter({pagination: {page: newPage, limit}})
  },[filter.pagination, paginationData.totalPage]);


  return {
     totalPage: paginationData.totalPage,
     data: paginationData.data,
     handleSetFileter,
     handleSortColumn,
     handlePagination
  }
}