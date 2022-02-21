import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  readMe(): string {
    return `
    <br>
    # postcodes.io
    <br><br>

    *작업 목적
    <br>
    - postcodes.io 를 사용하여 주어진 데이터(store.json)로 요구사항에 만족할 수 있도록 해야한다.<br>
    - 완료 접근 방식이 아닌 아키텍처 품질 위주.<br>
    <br><br>
    
    *사용 프레임워크 <br>
    - nest.js <br>
    <br><br>
    
    * 사용 언어<br>
    - TypeScript<br>
    <br><br>

    *API 요구사항<br>
    1. Stores.json에서 상점 목록을 얻을 수 있어야 한다.<br>
    2. Stores.json에서 상점의 특정 항목을 가져올 수 있어야 한다.<br>
    3. API 소비자는 이름으로 항목을 식별할 수 있어야 한다.  <br>
    4. 각 우편 번호에 대한 위도와 경도를 얻을 수 있어야 한다.<br>
    (postcodes.io를 사용하여 각 우편번호의 위도와 경도를 얻을 수 있다.)<br>
    5. postcodes.io를 사용하여 우편번호의 주어진 반경에 있는 상점 목록을 반환할 수 있는 기능이 있어야 한다.<br>
     (목록은 북쪽에서 남쪽으로 정렬되어야 한다.)
     <br><br>
    
    * 아키텍처 품질 향상을 위해 작업한 개발자의 개인적 견해<br>
    - any type의 명확하지 않은 데이터 형태를 class로 도식화 하였다.<br>
      &nbsp&nbsp postcodes.io 를사용하여 반환받은 값은 any 타입의 객체 정보이다.<br>
      &nbsp&nbsp 이 정보를 any 로만 취급한다면 데이터 접근이 힘들고 곧 유지보수에 불편함이 많을것이라 생각되어, <br>
      &nbsp&nbsp 반환받은 정보를 클래스화 하여 구조를 잡는데 중점을 두고 코드의 가독성을 높일려는 목적이 있었다. <br>
      <br>
    - service 내부에 기능을 모아두었고,<br>
      &nbsp&nbsp 중복으로 사용되거나 자주 사용이 될 것으로 추측되는 코드는 분리사용 하였다.<br>
      <br><br>
    - dto 사용위해 model 에 반환받은 데이터 타입을 모두 지정하되,<br>
      &nbsp&nbsp 이후 모델안에서 필요한 정보만을 pick 하여 원하는 요소만으로 클래스 생성을 간편하게 할 수 있도록 조치 하였다. <br>
      &nbsp&nbsp PartialType / PickType / OmitType 은 상황에 맞게 사용 한다.<br>
    - request 형식 response 형식을 해당 기능의 dto 내에서 관리한다.<br>
    <br><br>

    *테스트방법<br>
    1. npm install<br>
    2. npm run start dev<br>
    <br>
    storeName 엔 store.json 파일안의 name / postcode 값이 들어갈 수 있다<br>
    storeType 엔 name / postcode 인지 타입을 지정해주어야 한다.<br>
    limit엔 반경 몇개의 store를 찾을지 수를 정해주어야 한다.<br>
    radius 주변 store를 살필 크기의 범위이다<br>
    <br>
     - store.json 내에 정보를 모두 불러온다<br>
     * http://localhost:3000/store<br>
     <br> 
     - storeName에 해당하는 정보를 불러온다<br>
     * http://localhost:3000/store/{storeName}/{storeType}<br>
     * 예시) http://localhost:3000/store/AL1 2RJ/postcode<br>
     <br>
     - storeName의 근처에 존재하는 store 정보를 불러온다<br>
     * http://localhost:3000/store/near/{storeName}/{storeType}/{limit}/{radius}<br>
     * 예시) http://localhost:3000/store/near/St_Albans/name/5/1000<br>
     <br>
     `
  }
}
