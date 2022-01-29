import useSWR from 'swr'
import api from '@/lib/api'

export const fetcher = async (url: string) =>
  await api.get(url).then((response) => response.data)

export const useGet = <T = any>(route: string, ...args: string[]) => {
  const { data, error } = useSWR<T>(`/${route}/${args.join('/')}`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
