'use client';

import { useEffect, useRef } from 'react';

function ScrollSmootherProvider({ children }: { children: React.ReactNode }) {
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
		<div id='smooth-wrapper'>
			<div id='smooth-content'>{children}</div>
		</div>
	);
}
export default ScrollSmootherProvider;
