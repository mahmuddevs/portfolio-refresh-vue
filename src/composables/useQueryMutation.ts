import { useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import { getFetch } from "@/utils/getFetch";
import { unref, type MaybeRefOrGetter } from "vue";

export interface QueryMutationConfig<TData = any, TError = Error, TVariables = void, TContext = unknown> {
  url: MaybeRefOrGetter<string> | ((variables: TVariables) => string);
  method?: MaybeRefOrGetter<"POST" | "PUT" | "PATCH" | "DELETE"> | ((variables: TVariables) => "POST" | "PUT" | "PATCH" | "DELETE");
  isPrivate?: MaybeRefOrGetter<boolean>;
  mutationOptions?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;
}

function toVal<T>(source: MaybeRefOrGetter<T> | undefined): T | undefined {
  if (source === undefined) return undefined;
  return typeof source === "function" ? (source as Function)() : unref(source);
}

export function useQueryMutation<TData = any, TError = Error, TVariables = void, TContext = unknown>(
  config: QueryMutationConfig<TData, TError, TVariables, TContext>
) {
  const { url, method = "POST", isPrivate = false, mutationOptions } = config;

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (variables: TVariables) => {
      // 1. Resolve URL
      const resolvedUrl = typeof url === "function"
        ? (url as (vars: TVariables) => string)(variables)
        : (toVal(url) as string);

      // 2. Resolve Method
      const resolvedMethod = typeof method === "function"
        ? (method as (vars: TVariables) => "POST" | "PUT" | "PATCH" | "DELETE")(variables)
        : (toVal(method) as "POST" | "PUT" | "PATCH" | "DELETE");

      // 3. Resolve Private status
      const resolvedIsPrivate = toVal(isPrivate);

      // 4. Dispatch fetch request
      const response = await getFetch<any>(resolvedUrl, {
        method: resolvedMethod,
        private: resolvedIsPrivate,
        body: variables,
      });

      // Return body.data if present to match useGetQuery behavior, fallback to full body response
      return response && typeof response === "object" && "data" in response
        ? response.data
        : response;
    },
    ...mutationOptions,
  });
}
