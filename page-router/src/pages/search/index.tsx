import TopBadgeLayout from '@/layout/TopBadgeLayout';
import Head from 'next/head';

function Page() {
	return (
		<>
			<Head>
				<title>Practice | Search</title>
			</Head>
			<h1>Search Page</h1>
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
