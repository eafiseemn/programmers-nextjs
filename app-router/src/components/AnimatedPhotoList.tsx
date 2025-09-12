'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function AnimatedPhotoList({ data }: { data: string[] }) {
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		let ctx: gsap.Context | undefined;

		(async () => {
			if (typeof window === 'undefined' || !listRef) return;

			const gsap = (await import('gsap')).default;
			const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			ctx = gsap.context(() => {
				const items = gsap.utils.toArray<HTMLLIElement>('.photo-item');

				items.forEach((el) => {
					gsap.from(el, {
						opacity: 0,
						y: 30,
						duration: 0.6,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 65%',
							toggleActions: 'play none none reverse',
							markers: true, // scroll Start/End Point 표시
						},
					});
				});
			}, listRef);
		})();

		return () => ctx?.revert();
	}, []);

	return (
		<ul className='flex flex-col gap-20 p-3 items-center' ref={listRef}>
			{data.map((url, idx) => (
				<li key={`${url}-${idx}`} className='photo-item'>
					<Image src={url} alt='' width={400} height={300} />
				</li>
			))}
		</ul>
	);
}
export default AnimatedPhotoList;
