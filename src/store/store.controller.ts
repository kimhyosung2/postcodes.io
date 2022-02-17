import { Controller, Get, Param } from '@nestjs/common';
import { NearStoreRequestParam, StoreRequestParam } from './dto/request/store.request_param';
import { StoreResponseBody } from './dto/response/store.response_body';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  /**
   * http://localhost:3000/store
   * store 정보를 모두 불러온다
   */
  @Get()
  async findAll(): Promise<StoreResponseBody> {
    return await this.storeService.getAllStoreInfo();
  }

  /**
   * http://localhost:3000/store/{storeName}/{storeType}
   * 예시) http://localhost:3000/store/St_Albans/name
   * storeName에 해당하는 정보를 불러온다
   * storeName 엔 store.json 파일안의 name / postcode 값이 들어갈 수 있고
   * storeType 엔 name / postcode 인지 타입을 지정해주어야 한다.
   */
  @Get('/:storeName/:storeType')
  async searchStore(
    @Param() params: StoreRequestParam
  ): Promise<StoreResponseBody> {
    return await this.storeService.getStoreInfo(params.storeName, params.storeType);
  }

  /**
   * http://localhost:3000/store/near/{storeName}/{storeType}/{limit}/{radius}
   * 예시) http://localhost:3000/store/near/St_Albans/name
   * storeName의 근처에 존재하는 store 정보를 불러온다
   * storeName 엔 store.json 파일안의 name / postcode 값이 들어갈 수 있고
   * storeType 엔 name / postcode 인지 타입을 지정해주어야 한다.
   */
  @Get('/near/:storeName/:storeType/:limit/:radius')
  async nearStoreInfo(
    @Param() params: NearStoreRequestParam
  ): Promise<StoreResponseBody> {
    return await this.storeService.getNearStoreInfo(params);
  }
}
