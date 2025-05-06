# Quibe Frontend

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## 배포 가이드

### Docker 이미지 빌드 및 배포

1. `.env` 파일 생성:

```bash
# Docker 레지스트리 주소
DOCKER_REGISTRY=your-registry.example.com

# 이미지 태그 (기본값: git 커밋 해시)
IMAGE_TAG=latest
```

2. Docker 이미지 빌드 및 레지스트리 푸시:

```bash
./deploy/build.sh
```

### Kubernetes 배포

1. 배포 매니페스트 적용:

```bash
kubectl apply -f deploy/deployment-ready.yaml
```

2. 배포 상태 확인:

```bash
kubectl get pods -l app=quibe-fe
kubectl get svc quibe-fe-service
kubectl get ingress quibe-fe-ingress
```

### 배포 구성요소

- `Dockerfile`: 다단계 빌드를 사용하여 React 앱을 빌드하고 Nginx로 서빙
- `deploy/nginx.conf`: SPA 애플리케이션을 위한 Nginx 설정
- `deploy/deployment.yaml`: Kubernetes 배포 매니페스트 (Deployment, Service, Ingress)
- `deploy/build.sh`: Docker 이미지 빌드 및 배포 스크립트
