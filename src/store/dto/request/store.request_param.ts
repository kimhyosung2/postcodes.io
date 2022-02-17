import { StoreSearchType } from "../enum/enum"

// 데이터 요청 목적
export class StoreRequestParam {
  readonly storeName!: string
  readonly storeType!: StoreSearchType
}

export class NearStoreRequestParam {
  readonly storeName!: string
  readonly storeType!: StoreSearchType
  readonly limit: number = 5
  readonly radius: number = 1000
}