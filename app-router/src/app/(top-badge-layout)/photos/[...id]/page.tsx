import fetchPhotoByOne from '@/utils/fetchPhotoByOne';
import Image from 'next/image';
// import { notFound } from 'next/navigation';

// 특정 데이터는 dynamic으로 불러오지 않도록 미리 SSG로 설정
export async function generateStaticParams() {
	return [{ id: ['84'] }, { id: ['85'] }, { id: ['87'] }, { id: ['88'] }];
	// catch-all segement라서 배열로 전달 / single은 {id: '84'}, 요렇게
}

export const dynamicParams = true;
// default = true; 블로킹 콜백 => 없으면 dynamic하게 생성 / 있으면 SSG 사용
// false; pre-patch한 데이터 외 나머지 페이지에 접근할 경우 무조건 404로 떨어뜨림

// dynamic page 에서 dynamic 하게 metaData 지정
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return {
		title: `Triangle | Photos #${id}`,
	};
}

// App-router의 server component의 props는 params, searchParams가 떨어짐
// params는 Promise 객체이므로 await으로 호출 필요
async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	// catch-all segment[...id]이면 ['id'] 배열, 일반 segemnt [id]면 string id로 떨어짐

	const data = await fetchPhotoByOne(id);

	// custom fallback
	if (!data) {
		return (
			<div className='flex flex-col p-4 gap-2'>
				<h2 className='text-xl font-bold'>Image Load Failed</h2>
				<p>이미지 로드에 실패했습니다. 🥲</p>
			</div>
		);
	}

	// notFound fallback (server component에서만 사용 가능)
	// if (!data) notFound();

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
