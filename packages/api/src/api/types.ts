export type FieldMap = { [key: string]: string }

export type ItemData = {
  [key: string]: any
}

export type DataResponse<T> = {
  items?: T[]
  error?: {
    code: string
    message: string
  }
  pagination?: {
    totalItems: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
  [key: string]: any
}

export interface ICRUDHandler {
  getAll: (
    page: number,
    size: number,
    limit: boolean,
    cache: boolean,
    params: any
  ) => Promise<DataResponse<any>>
  getOne: (id: string, cache: boolean) => Promise<DataResponse<any>>
  getBy: (field: string, value: string) => Promise<DataResponse<any>>
  create: (itemData: any) => Promise<DataResponse<any>>
  update: (id: string, itemData: any) => Promise<DataResponse<any>>
  delete: (id: string) => Promise<DataResponse<any>>
}
