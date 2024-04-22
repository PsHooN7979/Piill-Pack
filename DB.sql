Table user_t {
  idx bigint [pk, not null]
  username varchar(50) [not null]
  email varchar(50) [unique, not null]
  password varchar(255) [not null] // 해시코드가 들어가므로 충분히 큰 크기로 설정
  role varchar [default: "USER", not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

// 게시글 카테고리
Table post_category_t {
  idx int [pk, not null]
  name varchar(50) [not null]
}

// 공지 카테고리
Table notice_category_t {
  idx int [pk, not null]
  name varchar(50) [not null]
}

Table post_t {
  idx bigint [pk, not null]
  user_t_idx bigint [not null]
  post_category_idx int [not null]
  title varchar(100) [not null]
  image_paths varchar(255)
  content text [not null]
  price int [not null]
  status varchar(30) [not null, default: '판매 중'] // 상태 (판매중, 예약중, 거래완료)
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

Table notice_t {
  idx bigint [pk, not null] 
  user_t_idx bigint [not null]  // 관리자 ID
  notice_category_t_idx int [not null]
  title varchar(100) [not null]
  image_paths varchar(255)
  content text [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

Table comment_t {
  idx int [pk, not null] 
  post_t_idx bigint [not null]
  user_t_idx bigint [not null]
  content text [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
  updated_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

Table chat_t {
  idx bigint [pk, not null]
  sender_user_t_idx bigint [not null] // 보내는 사람 ID
  receiver_user_t_idx bigint [not null] // 받는 사람 ID
  post_t_idx int [not null]
  message text [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

// 사용자의 찜 리스트를 조회하기 위해 like 테이블을 따로 뺌
Table like_t {
  idx int [pk, not null]
  post_t_idx bigint [not null]
  user_t_idx bigint [not null]
  created_at timestamp [default: `CURRENT_TIMESTAMP`, not null]
}

ref: post_t.user_t_idx > user_t.idx [delete: cascade, update: no action]
ref: post_t.post_category_idx > post_category_t.idx

ref: notice_t.user_t_idx > user_t.idx
ref: notice_t.notice_category_t_idx > notice_category_t.idx

ref: comment_t.post_t_idx > post_t.idx [delete: cascade, update: no action]
ref: comment_t.user_t_idx > user_t.idx [delete: cascade, update: no action]

ref: chat_t.sender_user_t_idx > user_t.idx
ref: chat_t.receiver_user_t_idx > user_t.idx
ref: chat_t.post_t_idx > post_t.idx

ref: like_t.post_t_idx > post_t.idx [delete: cascade, update: no action]
ref: like_t.user_t_idx > user_t.idx [delete: cascade, update: no action]
