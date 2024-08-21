import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  EntityResponse,
  OutlayRowDeleteRequest,
  OutlayRowFullRequest,
  OutlayRowUpdateFullRequest,
  RecalculatedRows,
  TreeResponse,
} from "./tableApi.types";

const tableApi = createApi({
  reducerPath: "tableApi",
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "http://185.244.172.108:8081/" }),
  endpoints: (builder) => ({
    getTreeRows: builder.query<TreeResponse, number>({
      query: (eID) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/list`,
        params: {
          eID,
        },
      }),
    }),
    createEntity: builder.mutation<EntityResponse, void>({
      query: () => ({
        url: "/v1/outlay-rows/entity/create",
        method: "POST",
      }),
    }),
    createRowInEntity: builder.mutation<RecalculatedRows, OutlayRowFullRequest>(
      {
        query: ({ eID, request }) => ({
          url: `/v1/outlay-rows/entity/${eID}/row/create`,
          eID,
          request,
        }),
      }
    ),
    updateRow: builder.mutation<RecalculatedRows, OutlayRowUpdateFullRequest>({
      query: ({ eID, rID, request }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        eID,
        rID,
        request,
      }),
    }),
    deleteRow: builder.mutation<RecalculatedRows, OutlayRowDeleteRequest>({
      query: ({ eID, rID }) => ({
        url: `/v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
        eID,
        rID,
      }),
    }),
  }),
});

export const {
  useGetTreeRowsQuery,
  useCreateEntityMutation,
  useCreateRowInEntityMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = tableApi;

export default tableApi;
