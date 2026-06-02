import { useQuery } from "@tanstack/vue-query";
import { getFetch } from "@/utils/getFetch";
import { useAuthStore } from "@/stores/auth";
import { unref, computed, type MaybeRefOrGetter } from "vue";

export interface GetQueryConfig<TData = any, TError = Error> {
  url: MaybeRefOrGetter<string>;
  isPrivate?: MaybeRefOrGetter<boolean>;
  queryParams?: MaybeRefOrGetter<Record<string, any>>;
  keys?: MaybeRefOrGetter<any[]>;
  enabled?: MaybeRefOrGetter<boolean>;
  staleTime?: MaybeRefOrGetter<number>;
  gcTime?: MaybeRefOrGetter<number>;
  refetchOnWindowFocus?: MaybeRefOrGetter<boolean | "always">;
  refetchOnReconnect?: MaybeRefOrGetter<boolean | "always">;
  refetchOnMount?: MaybeRefOrGetter<boolean | "always">;
  retry?: MaybeRefOrGetter<boolean | number | ((failureCount: number, error: TError) => boolean)>;
  [key: string]: any;
}

function toVal<T>(source: MaybeRefOrGetter<T> | undefined): T | undefined {
  if (source === undefined) return undefined;
  return typeof source === "function" ? (source as Function)() : unref(source);
}

function buildUrl(url: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return url;

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "") {
      if (Array.isArray(val)) {
        val.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(val));
      }
    }
  });

  const queryString = searchParams.toString();
  if (!queryString) return url;

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${queryString}`;
}

export function useGetQuery<TData = any, TError = Error>(
  config: GetQueryConfig<TData, TError>
) {
  const authStore = useAuthStore();
  const { url, isPrivate, queryParams, keys, ...queryOptions } = config;

  const queryEnabled = computed(() => {
    const isPrivateVal = toVal(isPrivate);
    const enabledOpt = queryOptions.enabled;
    const userEnabledVal = enabledOpt !== undefined
      ? (typeof enabledOpt === "function" ? (enabledOpt as Function)() : toVal(enabledOpt))
      : true;

    if (isPrivateVal) {
      return authStore.isAuthenticated && userEnabledVal;
    }
    return userEnabledVal;
  });

  return useQuery<TData, TError>({
    queryKey: () => {
      const urlVal = toVal(url) as string;
      const paramsVal = toVal(queryParams) || {};
      const extraKeysVal = toVal(keys) || [];
      return [urlVal, paramsVal, ...extraKeysVal];
    },
    queryFn: async () => {
      const urlVal = toVal(url) as string;
      const paramsVal = toVal(queryParams);
      const finalUrl = buildUrl(urlVal, paramsVal);

      const body = await getFetch<any>(finalUrl, {
        method: "GET",
        private: toVal(isPrivate),
      });

      return body.data;
    },
    ...queryOptions,
    enabled: queryEnabled,
  } as any);
}
