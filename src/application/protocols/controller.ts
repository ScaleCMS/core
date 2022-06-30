import { HttpRequest, HttpResponse } from '@/application/protocols'

export type Controller = {
  handle: (httpRequest: HttpRequest) => HttpResponse | undefined
}
