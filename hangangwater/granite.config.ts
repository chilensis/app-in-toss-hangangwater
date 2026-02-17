import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'hangangwater',
  brand: {
    displayName: 'hangangwater', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: 'https://static.toss.im/appsintoss/20337/ff2ff75e-f9ff-47fb-90cc-6a9e75a54796.png', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
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
