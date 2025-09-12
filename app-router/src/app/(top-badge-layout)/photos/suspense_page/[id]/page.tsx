import fetchPhotoByOne from '@/utils/fetchPhotoByOne';
import Image from 'next/image';

export async function generateStaticParams() {
	return [{ id: '84' }, { id: '85' }, { id: '87' }, { id: '88' }];
	// catch-all segement라서 배열로 전달 / single은 {id: '84'}, 요렇게
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return {
		title: `Triangle | Photos #${id}`,
	};
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const data = await fetchPhotoByOne(id);

	if (!data) {
		return (
			<div className='flex flex-col p-4 gap-2'>
				<h2 className='text-xl font-bold'>Image Load Failed</h2>
				<p>이미지 로드에 실패했습니다. 🥲</p>
			</div>
		);
	}

	const { author, width, height, url, download_url } = data;

	return (
		<div className='flex flex-col p-4 gap-2'>
			<h2 className='text-xl font-bold'>👀 작품 자세히 보기 📸</h2>
			<h3>
				# {id} | Author : {author}
			</h3>
			<Image
				src={download_url}
				alt={author}
				key={id}
				width={width}
				height={height}
				priority={width > 4000}
			/>
			<p>
				🔗 Image URL :{' '}
				<a href={url} className='text-indigo-500' rel='noreferrer noopenner'>
					{url}
				</a>
			</p>
		</div>
	);
}
export default Page;
