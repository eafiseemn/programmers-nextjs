import { delay } from '@/utils/delay';
import fetchPhotos from '@/utils/fetchPhotos';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Triangle | Photos',
	description: '다양한 작가의 다양한 작품을 감상하세요',
};

async function Page() {
	const data = await fetchPhotos(12, { cache: 'force-cache' });

	if (!data) notFound(); // 404 NotFound로 Fallback

	await delay();

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
			<div className='flex gap-6 w-full justify-center items-center my-6'>
				<Link
					href={`/photos/query_page`}
					className='border border-blue-500 w-1/3 text-blue-500 px-auto py-1 rounded text-center'>
					Query Page
				</Link>
				<Link
					href={`/photos/suspense_page`}
					className='bg-blue-500 w-1/3 text-white px-auto py-1 rounded text-center'>
					Suspense Page
				</Link>
			</div>
		</>
	);
}
export default Page;
