import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'hangangwater',
  brand: {
    displayName: '한강물', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3274EC', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: 'https://static.toss.im/appsintoss/20337/687416c4-3a87-4c84-b229-546692f3258e.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
  },
  web: {
    // Toss 인앱이 이 주소로 접속함. PC IP가 바뀌면 수정 (ifconfig en0 inet)
    host: '192.168.0.101',
    port: 5173,
    commands: {
      dev: 'vite --host',
      build: 'tsc -b && vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
