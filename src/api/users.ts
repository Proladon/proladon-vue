import { adminApi } from '@/libs/axios'

export const GetUsers = ({
  name,
  start,
  limit
}: {
  name?: string
  start?: number
  limit?: number
}) => {
  return adminApi.request({ method: 'GET', url: `/users`, params: { name, start, limit } })
}

export const FindUser = ({ id }: { id: string }) => {
  return adminApi.request({ method: 'GET', url: `/users/${id}` })
}
