# API 아키텍처

이 프로젝트는 클라이언트, Next.js API 라우트, 그리고 외부 API 서버와의 통신을 다음과 같은 계층 구조로 관리합니다:

```
[클라이언트 사이드]
useAuth (hooks)
    │
    │ fetch("/api/auth/...")
    ▼
[서버 사이드]
Next.js API Routes (app/api/auth/...)
    │
    │ authApi.login(), authApi.register(), ...
    ▼
auth.ts (lib/api/auth)
    │
    │ apiClient.post(), apiClient.get(), ...
    ▼
api-client.ts (lib/api/api-client)
    │
    │ fetch to external API
    ▼
[외부 API 서버]
http://localhost:4000/api/...
```

## 각 레이어의 역할

### 1. 클라이언트 사이드 (`useAuth`)

- 사용자 인터페이스와 상호작용
- React Query를 사용한 상태 관리
- Next.js API 라우트로 요청 전송
- 토스트 메시지 표시, 페이지 이동 등 UI 작업

### 2. Next.js API Routes (`/api/auth/...`)

- 클라이언트의 요청을 받아 처리
- 입력값 검증
- 에러 처리 및 적절한 HTTP 상태 코드 반환

### 3. auth.ts & api-client.ts

- 외부 API와의 통신을 담당
- 서버 사이드에서만 실행
- 토큰 관리나 인증 관련 로직 처리

## 장점

- 보안성 향상: 민감한 로직과 토큰이 서버 사이드에서만 처리됨
- 명확한 책임 분리: 각 레이어가 독립적인 역할을 수행
- 유지보수성: 각 레이어를 독립적으로 수정/개선 가능

클라이언트 → Next.js API 라우트: fetch 사용 (단순한 내부 통신)
Next.js API 라우트 → 외부 API: axios 사용 (복잡한 외부 통신)

# TipTap Editor with Font Size Control

## 폰트 사이즈 기능 구현 방법

TipTap 에디터에 폰트 사이즈 기능을 추가하는 과정에서 발생한 문제와 해결 방법에 대한 정리입니다.

### 문제 상황

- TipTap 에디터에서 폰트 사이즈를 변경하려고 했으나 `editor.chain().focus().setFontSize is not a function` 에러 발생
- TextStyle 확장을 사용해 시도했으나 명령이 제대로 등록되지 않음

### 해결 방법

1. **Extension 방식으로 구현**:

   - Mark 대신 Extension을 사용하여 TextStyle을 확장
   - TextStyle 확장의 속성으로 fontSize를 추가

2. **핵심 코드 구현 방법**:

```typescript
// lib/extensions/FontSize.ts
import { Extension } from "@tiptap/core";

export interface FontSizeOptions {
  types: string[];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
    };
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: "16px",
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
    };
  },
});
```

3. **타입 정의**:

```typescript
// types/tiptap-fontsize.d.ts
import "@tiptap/core";

declare module "@tiptap/extension-text-style" {
  interface TextStyleAttributes {
    fontSize?: string;
  }
}
```

4. **에디터 설정**:

```typescript
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      // 설정...
    }),
    TextStyle, // TextStyle 확장을 먼저 등록
    FontSize.configure({
      types: ["textStyle"],
    }),
    // 기타 확장...
  ],
});
```

5. **사용 방법**:

```typescript
// 폰트 사이즈 변경 함수
const setFontSize = (size: string) => {
  if (!editor) return;
  editor.chain().focus().setFontSize(size).run();
};

// 현재 폰트 사이즈 가져오기
const currentFontSize = editor?.getAttributes("textStyle").fontSize || "16px";
```

### 해결 포인트

1. **확장 방식 변경**: Mark → Extension
2. **TextStyle과 연동**: TextStyle의 속성으로 fontSize를 추가
3. **명령어 체인 수정**: textStyle 마크에 fontSize 속성을 설정하는 방식으로 변경
4. **타입 선언 위치**: 타입 선언을 TextStyle에 확장하는 방식으로 구현
5. **확장 순서**: TextStyle을 먼저 등록한 후 FontSize 확장을 등록

이 접근 방식의 핵심은 별도의 마크를 만드는 대신 기존 TextStyle 확장의 기능을 확장하는 것입니다.
# devoo-front
