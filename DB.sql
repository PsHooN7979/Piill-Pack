// 유저 테이블
table user {
  idx bigint [pk, increment]
  nick_name varchar(50) [not null] // 사용자 닉네임
  email varchar(50) [not null, unique] // 이메일 형식의 Unique 아이디
  password varchar(255) [not null] // 비밀번호
  region_idx bigint [ref: > region.idx] // 유저가 소속된 지역 참조
  role varchar(15) [not null, default: "ROLE_USER"] // 관리자 권한 여부 (ROLE_ADMIN)
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null] // 생성 날짜
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null] // 업데이트 날짜
}

// 지역 테이블
table region {
  idx bigint [pk, increment]
  region_name varchar(50) [not null] // 지역 이름
}

// 게시물 테이블
table news {
  idx bigint [pk, increment]
  title varchar(100) [not null] // 게시물 제목
  content text [not null] // 본문
  hit bigint [default: 0] // 조회수
  img_paths text // 이미지 경로 (서버에서 제공하는 이미지 경로, 각 경로는 ';' 로 구분)
  like_num bigint [default: 0] // 좋아요 개수
  user_idx bigint [ref: > user.idx] // 사용자 참조
  region_idx bigint [ref: > region.idx] // 지역 참조
  is_official bool [default: false] // 공안 뉴스 여부(개념글 같은 개념?)
  is_ai_generated bool [default: false] // OpenAI를 통해 변환되었는지 여부
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

// 댓글 테이블
table comment {
  idx bigint [pk, increment]
  content text [not null] // 댓글 내용
  user_idx bigint [ref: > user.idx] // 사용자 참조
  news_idx bigint [ref: > news.idx] // 게시물 참조
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

// 신고 테이블
table report {
  idx bigint [pk, increment]
  news_idx bigint [ref: > news.idx] // 게시물 참조
  reason text [not null] // 신고 사유 내용
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

// 지역 페이지 쓰기 접근 권한 테이블
table user_region_authentication {
  idx bigint [pk, increment]
  user_idx bigint [ref: > user.idx] // 사용자 참조
  region_idx bigint [ref: > region.idx] // 지역 참조
  is_authenticated bool [default: false] // 권한 여부
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}