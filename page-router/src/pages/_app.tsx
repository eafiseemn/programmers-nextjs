import GlobalLayout from '@/components/GlobalLayout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalLayout>
				<Component {...pageProps} />
			</GlobalLayout>
		</>
	);
}

// 모든 페이지에 공통으로 적용되는 global layout 지정
// _document 안의 <Main /> 실행 시 App이 호출되는 구조
// <Component {...pageProps} />; 는 pages 안에 있는 폴더의 index.tsx들을 라우팅
