import { HttpResponse } from '@/application/helpers'

export type Controller = {
  handle: (httpRequest: any) => HttpResponse | undefined
}
