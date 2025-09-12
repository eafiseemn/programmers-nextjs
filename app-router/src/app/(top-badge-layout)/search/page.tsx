// App Router에서는 경로 폴더명 + index가 아니라 page.tsx 로 메인 페이지 지정 필요
// 중첩 라우팅은 폴더a > 폴더b > page.tsx 로 만들어야 "~~/폴더a/폴더b/" 페이지로 접근 가능
// 동적 라우팅은 [folder] > page.tsx 로 만들어서 접근

import SearchForm from '@/components/SearchForm';
import fetchPhotos from '@/utils/fetchPhotos';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Triangle | Search',
	description: '작가의 이름을 검색하고 작품을 감상하세요',
};

async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	// searchParams를 읽으면 해당 페이지는 dynamic으로 분류 (fetchPhotos.ts 참조)
	const { q } = await searchParams;
	const query = q ?? '';

	const data = await fetchPhotos(12, { cache: 'no-store' });
	const filtered = q ? data.filter((p) => p.author.toLowerCase().includes(q?.toLowerCase())) : [];

	return (
		<div>
			<SearchForm />
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
		</div>
	);
}
export default Page;

// Metadata를 설정하는 Page Component는 Server Component여야함
// Eventhandler를 받는 Component는 Client Component 여야함
// -> 컴포넌트를 따로 분리해서 불러오기
