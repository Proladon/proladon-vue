import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface Meta {
  title: string
  permissions?: string[]
  keepAlive?: boolean
  icon?: string
  hidden?: boolean
  layout?: string
}

export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw
}
