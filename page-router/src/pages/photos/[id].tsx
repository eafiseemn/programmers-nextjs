import fetchPhotoByOne from '@/utils/fetchPhotoByOne';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

/*
export const getServerSideProps = async (props: GetServerSidePropsContext) => {
	const { id } = props.query;
	const data = await fetchPhotoByOne(id as string);

	return {
		props: { data },
	};
};
*/

// Static은 모든 데이터에 대한 페이지를 다 만들어놓을 수 없기 때문에 StaticPaths를 지정해야함
// fallback = false면 StaticPath로 지정하지 않은 페이지는 다 404로 떨어짐
export const getStaticPaths = () => {
	return {
		paths: [{ params: { id: '48' } }, { params: { id: '49' } }, { params: { id: '50' } }],
		fallback: true,
	};
};
export const getStaticProps = async (props: GetStaticPropsContext) => {
	const { id } = props.params!;
	const data = await fetchPhotoByOne(id as string);

	return {
		props: { data },
	};
};

// function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	const query = router.query.id;
	// console.log(router.query.id);

	if (router.isFallback) return <div>Loading...</div>;
	if (!props.data) {
		return (
			<div>
				<h2>Image Load Failed</h2>
				<p>이미지 로드에 실패했습니다. 🥲</p>
			</div>
		);
	}
	const { id, author, width, height, url, download_url } = props.data;

	return (
		<div className='flex flex-col p-4 gap-2'>
			<h2 className='text-xl font-bold'>👀 작품 자세히 보기 📸</h2>
			<h3>
				# {query} | Author : {author}
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

/* Dynamic Route 방식 */
// [slug] 형태로 만들면  "/photos/1", "/photos/2", ... 으로 접근 가능

/* Catch-all Segments */
// [...slug] 형태로 만들면 "/photos/10/5" 등 slug 이후 들어오는 모든 pathname도 커버 가능
// useRouter().query.id = ['10', '5'] 와 같은 식으로 배열로 들어옴
