import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Triangle App',
	description: '다양한 작가 다양한 사진',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko-KR'>
			<body className={'antialiased'}>{children}</body>
		</html>
	);
}
