import { PickType } from '@nestjs/swagger'
import { StoreModel } from '../model/store.model'

// postcodes.io 를 사용하여 나온 데이터를 원하는 정보만 사용하여
// 클래스화 할 목적으로 사용
export class StoreBody extends PickType(
  StoreModel, ['query', 'latitude', 'longitude', 'postcode']
) {
  readonly storeName?: string
}

export class NearStoreBody extends PickType(
  StoreModel, ['latitude', 'longitude', 'postcode', 'northings']
) {
}

// 데이터 반환 목적
export class StoreResponseBody {
  result!: StoreBody[]
  status!: number
}

export class NearStoreResponseBody {
  result!: NearStoreBody[]
  status!: number
}

