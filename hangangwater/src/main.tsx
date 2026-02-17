import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// StrictMode 제거: Toss 인앱에서 스크린/이벤트가 두 번 쌓이는 것 방지 (개발 시 이중 마운트 때문)
createRoot(document.getElementById('root')!).render(<App />)
