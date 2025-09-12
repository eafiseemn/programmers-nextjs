import AnimatedPhotoList from '@/components/AnimatedPhotoList';
import { getRandomPhotos } from '@/utils/getRandomPhotos';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Triangle | Home',
};

export default async function Home() {
	const data = await getRandomPhotos();

	return (
		<div className='pb-5'>
			<h2 className='text-center p-10 flex flex-col gap-1'>
				<strong className='text-3xl mb-1.5'>Triangle에서</strong>
				<span className='block'>다양한 작가들의</span>
				<span>사진들을 만나보세요</span>
			</h2>
			<AnimatedPhotoList data={data} />
		</div>
	);
}
