<h2 align="center">나만의 작은 건강비서: Pill-Pack (필팩)</h2>

<p align="center">
  환자의 복약 스케줄과 부작용을 AI로 관리하는 통합 헬스케어 솔루션
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Project Status">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <img src="https://img.shields.io/github/languages/top/starbox7/ai-healthcare" alt="Top Language">
</p>

## 📋 목차

- [🧐 프로젝트 소개](#-프로젝트-소개)
- [✨ 기능 설명](#-기능-설명)
- [💻 기술 스택](#-기술-스택)
- [⚙️ 설치 및 실행 방법](#️-설치-및-실행-방법)
- [📱 사용법](#-사용법)
- [🤝 기여 방법](#-기여-방법)
- [📄 라이선스](#-라이선스)

## 🧐 프로젝트 소개

**나만의 작은 건강비서: Pill-Pack**은 환자의 의약품 복용을 AI로 분석하고, 부작용 발생 위험을 환자에게 알림으로 제공하는 서비스입니다. 이 프로젝트는 환자들이 안전하게 약물을 복용할 수 있도록 돕고, 부작용을 사전에 예방하는 것을 목표로 합니다.

## ✨ 기능 설명

- **복약 기록**: 처방전을 기록하고 복약 스케줄에 따라 정보를 제공하여 복용 누락을 방지합니다.
- **부작용 모니터링**: AI가 환자의 상태와 의약품 성분을 분석하여 부작용이 예상될 경우 알림을 제공합니다.
- **의료 데이터 분석**: 복약 패턴을 분석하여 개인 맞춤형 관리 서비스를 제공합니다.
- **약물 상호작용 분석**: 복용 중인 의약품와 보유 질병 간 상호작용을 분석하여 위험을 사전에 인지합니다.

## 💻 기술 스택

- **Frontend**: React, Android
- **Backend**: Spring-Boot
- **Database**: PostgreSQL
- **AI 모델**: OpenAI API 
- **모바일**: Hybrid Web App (iOS & Android 지원)
- **CI/CD**: GitHub

### 1. 백엔드 서버 설치

```bash
# 필요 라이브러리 설치
cd server
./gradlew install

# .env 예시 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_healthcare
DB_USER=your_username
DB_PASSWORD=your_password
```

### 2. 프론트엔드 설치

```bash
# Node.js 설치
cd frontend
npm install
npm run dev
```

### 3. 모바일 앱 설치

```bash
# android 애뮬레이터 준비
```

---

## 📱 사용법

1. **회원 가입**: 초기 설정 과정에서 환자 정보를 등록합니다.
2. **복약 스케줄 설정**: 복용할 약물과 복약 시간을 설정하여 알림을 받습니다.
3. **부작용 발생 보고**: 부작용 발생 시 앱에서 보고하고 AI가 분석하여 환자에게 실시간으로 확인할 수 있습니다.
4. **알림 수신**: 복약 및 부작용 알림을 통해 복약을 관리하고 필요 시 즉시 지원을 받습니다.

## 🤝 기여 방법

1. 이슈를 확인하고 작업을 선택합니다.
2. 새로운 기능 추가나 버그 수정을 위해 브랜치를 생성합니다.

```bash
git checkout -b feature/새기능
```

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 

<p align="center">
  Made with ❤️ by the 404 Not Found Team
</p>
