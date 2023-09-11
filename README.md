# CheckCommit

그날 깃허브에 커밋을 했는지 안 했는지 바로 확인할 수 있는 **크롬 확장 프로그램**

(2022.11 ~ 2022.12) - 개인 mini 프로젝트

## 개요

참여자 : 이진경 ([@dooli1971039](https://github.com/dooli1971039)) - 개발, 권승연([@seungyeon](https://github.com/kwon-seungyeon)) - UI 조언  
개발 언어 : HTML, CSS, JS  
개발 기간 : 2022.11 ~ 2022.12

## 구현 기능

-   깃허브 캘린더 불러오기
    -   github calendar API 사용 (UTC기준이라 9시간의 차이가 발생)
-   깃허브 내역 불러와서 오늘 커밋 여부를 보여주기
    -   github events API 사용
-   색상 바꾸기
-   매번 로그인이나 색상을 변경하지 않도록, localstorage에 데이터를 저장해둠

## 예시 화면

![image](https://user-images.githubusercontent.com/70802352/208286498-e3b5a13f-fb9f-42bb-aba3-a5e9c84c0460.png)
![image](https://user-images.githubusercontent.com/70802352/208286545-a18f4454-5d82-4f40-9460-758437e76dff.png)
