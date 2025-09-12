'use client';

import { Photo } from '@/@types/type';
import fetchPhotos from '@/utils/fetchPhotos';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
// import { notFound } from 'next/navigation';

function Page() {
	const { data, isPending, isError, error } = useQuery<Photo[]>({
		queryKey: ['photos'],
		queryFn: () => fetchPhotos(12),
		staleTime: 1000 * 5, // staleTime 따로 설정하면 override 가능
	});

	if (isPending) {
		return (
			<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
				{Array.from({ length: 8 }).map((_, idx) => (
					<li key={idx} className='h-40 bg-slate-400 animate-pulse rounded'></li>
				))}
			</ul>
		);
	}

	// Client Component에서는 notFound 사용 불가
	// if (!data || data.length === 0 || isError) notFound();

	if (!data || data.length === 0 || isError) {
		console.error(error);
		return (
			<div className='flex flex-col p-4 gap-2'>
				<h2 className='text-xl font-bold'>Data Load Failed</h2>
				<p>데이터 로드에 실패했습니다. 🥲</p>
			</div>
		);
	}

	return (
		<>
			<h2 className='sr-only'>Photos Page</h2>
			<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
				{data.map(({ id, author, download_url, width }) => (
					<li key={id} className='mb-4'>
						<Link href={`/photos/${id}`}>
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
