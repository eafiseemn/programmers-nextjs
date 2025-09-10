import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect, useRef } from 'react';
import type { ScrollSmoother } from 'gsap/dist/ScrollSmoother';

function GlobalLayout({ children }: { children: React.ReactNode }) {
	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) return;
		let smoother: ScrollSmoother | undefined;

		(async () => {
			if (typeof window === 'undefined') return;

			try {
				const gsap = (await import('gsap')).default;
				const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
				const { ScrollSmoother } = await import('gsap/dist/ScrollSmoother');

				gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

				// DOM load가 모두 끝난 뒤에 실행
				await new Promise((resolve) => {
					if (document.readyState === 'complete') {
						resolve(true);
					} else {
						window.addEventListener('load', () => resolve(true));
					}
				});

				smoother = ScrollSmoother.create({
					wrapper: '#smooth-wrapper',
					content: '#smooth-content',
					smooth: 1.2,
					effects: true,
				});

				initialized.current = true;
			} catch {
				console.error('ScrollSmoother Initialization Failed');
			}
		})();

		return () => {
			if (smoother) {
				smoother.kill();
				initialized.current = false;
			}
		};
	}, []);

	return (
		<>
			<Head>
				<title>Next.js Practice</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content='페이지 라우터를 통해 배우는 Next.js' />
				{/* <link rel='shortcut icon' href='/vercel.svg' /> */}
			</Head>
			<div id='smooth-wrapper'>
				<div className='flex flex-col min-h-screen' id='smooth-content'>
					<Header />
					<main className='flex-1'>{children}</main>
					<Footer />
				</div>
			</div>
		</>
	);
}
export default GlobalLayout;
