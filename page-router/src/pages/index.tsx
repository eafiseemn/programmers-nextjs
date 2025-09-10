// import { useEffect } from 'react';

import { getRandomPhotos } from '@/utils/getRandomPhotos';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

export const getStaticProps = async () => {
	const data = await getRandomPhotos();
	return {
		props: { data },
		revalidate: 60,
	};
};
// static으로 받아버리면 random이 아니게 됨
// serverSide로 받으면 random이긴 하지만 main 들어갈 때마다 과하게 fetch
// -> 주기적인(Incremental) static regeneration (ISR)이 필요
// revalidate로 60s 마다 한 번씩 새롭게 데이터를 fetching함 (data의 stale 상태를 validate)

export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
	/*
	console.log('main page');
	// 콘솔은 서버에서 한 번 실행되어서 터미널에 찍히고, 이후 클라이언트에서 한 번 실행되어 브라우저 콘솔에 찍힘
	// 일반적으로 클라이언트에서만 확인할 수 있는 로그는 서버에서 에러가 날 수 있음
	useEffect(() => {
		console.log(window.location);
		console.log(new Date());
		// window같이 클라이언트에서만 확인할 수 있거나, Date 처럼 서버에서 실행 시간과 클라이언트 실행 시간이 달라질 수 있는 것들은
		// useEffect 안에 넣고 실행시켜야 에러가 나지 않음
	});
  */

	return (
		<>
			<Head>
				<title>Next.js Practice | Home</title>
			</Head>
			<div>
				<h2 className='text-center p-10'>
					<strong className='text-3xl'>Triangle에서</strong>
					<span className='block'>다양한 작가들의</span>
					<span>사진들을 만나보세요</span>
				</h2>
				<ul className='flex flex-col gap-20 p-3 items-center'>
					{data.map((url, idx) => (
						<li key={`${url}-${idx}`}>
							<Image src={url} alt='' width={700} height={600} />
						</li>
					))}
				</ul>
			</div>
		</>
	);
}
