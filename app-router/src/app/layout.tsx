import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollSmootherProvider from '@/components/ScrollSmootherProvider';

export const metadata: Metadata = {
	title: 'Triangle App',
	description: '다양한 작가, 다양한 사진',
	openGraph: {
		title: 'Triangle - Gallery Project',
		description: '다양한 작가, 다양한 사진',
		url: 'https://kindtiger.com',
		type: 'website',
		siteName: 'Triangle',
		images: [
			{
				url: 'https://img.com/og-image.png',
				width: 1200,
				height: 600,
				alt: 'Triangle 사이트 이미지',
			},
		],
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Triangle - Gallery Project',
		description: '다양한 작가, 다양한 사진',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ko-KR'>
			<body className={'antialiased'}>
				<ScrollSmootherProvider>
					<div className='flex flex-col min-h-screen'>
						<Header />
						<main className='flex-1'>{children}</main>
						<Footer />
					</div>
				</ScrollSmootherProvider>
			</body>
		</html>
	);
}
