import GlobalLayout from '@/layout/GlobalLayout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
	getLayout: (page: React.ReactNode) => React.ReactNode;
};

export default function App({
	Component,
	pageProps,
}: AppProps & {
	Component: NextPageWithLayout;
}) {
	const getLayout = Component.getLayout ?? ((page) => page);
	// console.log(getLayout);
	return (
		<>
			<GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
		</>
	);
}

// 모든 페이지에 공통으로 적용되는 global layout 지정
// _document 안의 <Main /> 실행 시 App이 호출되는 구조
// <Component {...pageProps} />; 는 pages 안에 있는 폴더의 index.tsx들을 라우팅
