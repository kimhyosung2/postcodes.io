import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { plainToResponse } from 'src/common.service';
import { StoreSearchType } from './dto/enum/enum';
import { NearStoreRequestParam } from './dto/request/store.request_param';
import { NearStoreBody, NearStoreResponseBody, StoreBody, StoreResponseBody } from './dto/response/store.response_body';

@Injectable()
export class StoreService {
  private postcodes = require('node-postcodes.io');

  // 해당하는 store의 반경에 존재하는 store의
  // 이름, 타입, 반경, 근처 store 최대 수 정보를 불러온다
  async getNearStoreInfo(
    param: NearStoreRequestParam
  ): Promise<StoreResponseBody> {
    const postList = param.storeType === StoreSearchType.NAME ? this.getStorebyName(param.storeName) : this.getStorebyPostcode(param.storeName)
    
    if (!postList) {
      throw new BadRequestException()
    }

    let result = await this.postcodes.nearest(postList.postcode, {
      filter: 'postcode,longitude,latitude',
      radius: param.radius,
      limit: param.limit,
    })
    return plainToClass(NearStoreResponseBody, {
      result: this.convert2NearStoreClassType(result).sort(function(a, b) {
        return b.northings - a.northings
      }),
      status: result.status
    })
  }

  // 해당하는 타입과 이름의 store 정보를 불러온다
  async getStoreInfo(
    storeName: string,
    storeType: StoreSearchType
  ): Promise<StoreResponseBody> {
    const postList = storeType === StoreSearchType.NAME ? this.getStorebyName(storeName) : this.getStorebyPostcode(storeName)

    if (!postList) {
      throw new BadRequestException()
    }

    const result = await this.postcodes.lookup([postList.postcode], {
      filter: 'postcode,longitude,latitude',
    });

    return plainToClass(StoreResponseBody, {
      result: this.convert2StoreClassType(result, postList.name),
      status: result.status
    })
  }

  // 모든 store 정보를 불러온다 
  async getAllStoreInfo(): Promise<StoreResponseBody> {
    // store.json 파일 정보를 불러온다
    const postList = this.getStoreList()

    const postCdList: string[] = []
    const nameList: string[] = []

    for(let i = 0; i < postList.length; i++) {
      // 우편번호만 추출하여 string 배열에 담는다
      postCdList.push(postList[i].postcode)
      // 이름만 추출하여 string 배열에 담는다
      nameList.push(postList[i].name)
    }

    // 보고싶은 정보는 우편번호 경도 위도 이기에 filter 사용
    const result = await this.postcodes.lookup(postCdList, {
      filter: 'postcode,longitude,latitude',
    });

    return plainToClass(StoreResponseBody, {
      result: this.convert2StoreClassType(result, nameList),
      status: result.status
    })
  }

  // store json 정보 가져오기
  private getStoreList() {
    const jsonData = require('./dto/model/store.json');
    return jsonData
  }

  // postcode를 이용하여 해당하는 store 정보 가져오기
  private getStorebyPostcode(storeName?: string) {
    const jsonData = require('./dto/model/store.json');
    if (storeName !== undefined) {
      return (jsonData.find(i => i.postcode === storeName) != {}) ? jsonData.find(i => i.postcode === storeName): undefined;
    }
    return jsonData
  }

  // name을 이용하여 해당하는 store 정보 가져오기
  private getStorebyName(storeName?: string) {
    const jsonData = require('./dto/model/store.json');
    if (storeName !== undefined) {
      return (jsonData.find(i => i.name === storeName) != {}) ? jsonData.find(i => i.name === storeName): undefined;
    }
    return jsonData
  }

  // any 형식을 class 형식으로 변환 하는 역할
  private convert2StoreClassType(result: any, nameList: string[] | string) {
    const storeResponseBody: StoreBody[] = []
    let pluralFlag = false

    if (typeof nameList === 'string') {
      // nameList 가 string 형태
      pluralFlag = true
    } else {
      // nameList 가 string[] 형태
      pluralFlag = false
    }

    for (let i = 0; i < result.result.length; i++) {
      if (result.result[i].result === null) {
        continue
      }
      storeResponseBody.push(plainToClass(StoreBody, {
        storeName: pluralFlag ? nameList : nameList[i],
        query: result.result[i].query,
        latitude: result.result[i].result.latitude,
        longitude: result.result[i].result.longitude,
        postcode: result.result[i].result.postcode
      }))
    }
    return storeResponseBody
  }

  // any 형식을 class 형식으로 변환 하는 역할
  private convert2NearStoreClassType(result: any) {
    const storeResponseBody: NearStoreBody[] = []

    for (let i = 0; i < result.result.length; i++) {
      if (result.result[i].result === null) {
        continue
      }
      storeResponseBody.push(plainToClass(NearStoreBody, {
        latitude: result.result[i].latitude,
        longitude: result.result[i].longitude,
        postcode: result.result[i].postcode,
        northings: result.result[i].northings
      }))
    }
    return storeResponseBody
  }
}
