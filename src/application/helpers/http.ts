import { ServerError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export const ok = <T = any> (body: T): HttpResponse<T> => ({
  statusCode: 200,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})
