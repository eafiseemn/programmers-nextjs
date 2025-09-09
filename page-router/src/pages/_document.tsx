import { Html, Head, Main, NextScript } from 'next/document';

// antialiased : 폰트 렌더링을 부드럽게 처리 (글꼴 가장자리쪽 부드럽게 보정)

export default function Document() {
	return (
		<Html lang='ko-KR'>
			<Head />
			<body className='antialiased'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
