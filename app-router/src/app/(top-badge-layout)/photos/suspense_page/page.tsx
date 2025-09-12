'use client';

import { Photo } from '@/@types/type';
import fetchPhotos from '@/utils/fetchPhotos';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
// import { notFound } from 'next/navigation';

function Page() {
	const { data } = useSuspenseQuery<Photo[]>({
		queryKey: ['photos'],
		queryFn: () => fetchPhotos(12),
		staleTime: 1000 * 5, // staleTime 따로 설정하면 override 가능
	});
	// useSuspenseQuery를 사용하면 기본 loading.tsx 사용

	return (
		<>
			<h2 className='sr-only'>Photos Page</h2>
			<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
				{data.map(({ id, author, download_url, width }) => (
					<li key={id} className='mb-4'>
						<Link href={`/photos/suspense_page/${id}`}>
							<Image
								src={download_url}
								alt={`${author}의 작품 - ${id}`}
								width={500}
								height={400}
								style={{ width: 'auto', height: '100%' }}
								priority={width > 4000}
							/>
						</Link>
						<span className='block w-10/12 overflow-hidden text-ellipsis whitespace-nowrap'>
							Author : {author}
						</span>
					</li>
				))}
			</ul>
		</>
	);
}
export default Page;
