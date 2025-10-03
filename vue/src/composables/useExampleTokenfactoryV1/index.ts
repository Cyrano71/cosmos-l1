/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions, type InfiniteData  } from "@tanstack/vue-query";
import { useClient } from '../useClient';

export default function useExampleTokenfactoryV_1() {
  const client = useClient();

  type QueryParamsMethod = typeof client.ExampleTokenfactoryV_1.query.queryParams;
  type QueryParamsData = Awaited<ReturnType<QueryParamsMethod>>["data"];
  const QueryParams = ( options: Partial<UseQueryOptions<QueryParamsData>>) => {
    const key = { type: 'QueryParams',  };    
    return useQuery<QueryParamsData>({ queryKey: [key], queryFn: async () => {
      const res = await client.ExampleTokenfactoryV_1.query.queryParams();
        return res.data;
    }, ...options});
  }
  

  type QueryGetDenomMethod = typeof client.ExampleTokenfactoryV_1.query.queryGetDenom;
  type QueryGetDenomData = Awaited<ReturnType<QueryGetDenomMethod>>["data"];
  const QueryGetDenom = (denom: string,  options: Partial<UseQueryOptions<QueryGetDenomData>>) => {
    const key = { type: 'QueryGetDenom',  denom };    
    return useQuery<QueryGetDenomData>({ queryKey: [key], queryFn: async () => {
      const { denom } = key
      const res = await client.ExampleTokenfactoryV_1.query.queryGetDenom(denom);
        return res.data;
    }, ...options});
  }
  
  type QueryListDenomMethod = typeof client.ExampleTokenfactoryV_1.query.queryListDenom;
  type QueryListDenomData = Awaited<ReturnType<QueryListDenomMethod>>["data"] & { pageParam: number };
  const QueryListDenom = (query:  NonNullable<Parameters<QueryListDenomMethod>[0]>, options:  Partial<UseInfiniteQueryOptions<QueryListDenomData, unknown, InfiniteData<QueryListDenomData,number>, Array<string | unknown>, number>> , perPage: number) => {
    const key = { type: 'QueryListDenom', query };    
    return useInfiniteQuery<QueryListDenomData, unknown, InfiniteData<QueryListDenomData,number>, Array<string | unknown>, number>({ queryKey: [key], queryFn: async (context: {pageParam?: number}) => {
      const { pageParam=1 } = context;
      const {query } = key

      query['pagination.limit']=perPage;
      query['pagination.offset']= (pageParam-1)*perPage;
      query['pagination.count_total']= true;
      const res = await client.ExampleTokenfactoryV_1.query.queryListDenom(query ?? undefined);
        return { ...res.data, pageParam }; 
    }, ...options,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => { if ((lastPage.pagination?.total ?? 0) >((lastPage.pageParam ?? 0) * perPage)) {return lastPage.pageParam+1 } else {return undefined}},
      getPreviousPageParam: (firstPage, allPages) => { if (firstPage.pageParam==1) { return undefined } else { return firstPage.pageParam-1}}
    }
    );
  }
  
  return {QueryParams,QueryGetDenom,QueryListDenom,
  }
}
