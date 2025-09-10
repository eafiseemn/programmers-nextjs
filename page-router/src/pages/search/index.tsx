import { Photo } from '@/@types/type';
import TopBadgeLayout from '@/layout/TopBadgeLayout';
import fetchPhotos from '@/utils/fetchPhotos';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const getStaticProps = async () => {
	const data = await fetchPhotos(12);
	return {
		props: { data },
	};
};

function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
	const router = useRouter();
	const query = router.query.q ?? '';

	const data = props.data;
	const [filtered, setFiltered] = useState<Photo[]>([]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const input = e.currentTarget.querySelector('#search') as HTMLInputElement;
		const keyword = input.value.trim();
		const normalized = keyword.toLowerCase().replace(/\" "/g, '');

		router.push({
			pathname: router.pathname, // '/search'
			query: keyword ? { q: keyword } : {},
		});

		const filter = query
			? data.filter((item) => item.author.toLowerCase().replace(/\" "/g, '').includes(normalized))
			: [];
		setFiltered(filter);

		input.value = '';
		input.focus();
	};

	return (
		<>
			<Head>
				<title>Practice | Search</title>
			</Head>
			<h2 className='sr-only'>Search Page</h2>
			<div>
				<form
					className='border border-slate-400 m-4 p-2 rounded flex justify-center items-center'
					onSubmit={onSubmit}>
					<label htmlFor='search'>
						<input
							type='search'
							id='search'
							className='border border-b-blue-600 rounded indent-2 py-0.5'
						/>
					</label>
					<button type='submit' className='bg-blue-500 px-2 rounded py-1 font-bold ml-2 text-white'>
						검색
					</button>
				</form>
			</div>
			<div>
				{query && (
					<h3 className='px-4 text-lg'>
						<strong>{query}</strong> 검색 결과 : {filtered.length} 건
					</h3>
				)}
				<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
					{filtered.map(({ id, author, download_url, width }) => (
						<li key={id} className='mb-4'>
							<Link href={`/photos/${id}`} aria-label={`${id} 페이지로 이동`}>
								<Image
									src={download_url}
									alt={author}
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
			</div>
		</>
	);
}
export default Page;

// Component 이름은 무관
// pages 폴더 안에 routing 경로 폴더 > index.tsx 가 있으면 해당 페이지로 접근 가능
// (localhost:3000/search 로 접근)

// nesting page는 해당 폴더 안에 jsx component 이름(contact.tsx)으로 만들면 ~/search/contact 이런 식으로 접근 가능

// 해당 페이지에서만 적용되는 레이아웃 만들기 : Component이름 + .getLayout()
Page.getLayout = (page: React.ReactNode) => {
	return <TopBadgeLayout>{page}</TopBadgeLayout>;
};
