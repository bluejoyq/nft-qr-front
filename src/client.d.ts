interface ImportMetaEnv {
  /**
   * @description: 알케미 API 키
   */
  readonly VITE_ALCHEMEY_API_KEY: string;
  readonly VITE_SERVER_BASE_URL: string;
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
