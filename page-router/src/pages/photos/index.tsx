// import { User } from '@/@types/type';
import fetchPhotos from '@/utils/fetchPhotos';
// import { InferGetServerSidePropsType } from 'next';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/*
// Server Data Fetch용 함수: 이름 정해져있음 / 서버에서만 동작하고 클라이언트에서 실행되지 않음
export const getServerSideProps = async () => {
	// const res = await fetch('https://jsonplaceholder.typicode.com/users');
	// const data: User[] = await res.json();
	// console.log(data);

	// 페이지 요청(사용자가 페이지에 진입)마다 서버가 모든 res를 받은 다음에 렌더링을 시작하기 때문에 Data가 많거나 용량이 클 경우에는 페이지 로딩이 느려짐
	const data = await fetchPhotos(12);

	return {
		props: { data },
	};
};
*/

// build를 한 순간부터 res data를 받고 이 SSG를 CDN에 올려놓기 때문에 효율적인 렌더링 가능 (dev 서버에서는 확인 불가, build 이후 production에서만 적용됨)
// build 시 static/dynamic 이 아니라 (SSG) prerendered as static HTML (uses getStaticProps) 라고 표시됨
export const getStaticProps = async () => {
	const data = await fetchPhotos(12);
	return {
		props: { data },
	};
};

// function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const data = props.data;

	return (
		<>
			<Head>
				<title>Practice | Photos</title>
			</Head>
			<h1>Photos Page</h1>
			<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
				{data.map(({ id, author, download_url, width }) => (
					<li key={id} className='mb-4'>
						<Link href={`/photos/${id}`}>
							<Image
								src={download_url}
								alt={author}
								width={500}
								height={400}
								style={{ width: 'auto', height: '100%' }}
								priority={width > 4000}
							/>
						</Link>
						{/* priority 설정은 main에 Hero image 같은 중요한 이미지에 true로 설정해서 lazy loading을 disabled 시킴 -> head에 rel=preload로 끌고와서 미리 로딩시킴 */}
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
