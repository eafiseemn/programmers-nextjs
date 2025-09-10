// App Router에서는 경로 폴더명 + index가 아니라 page.tsx 로 메인 페이지 지정 필요
// 중첩 라우팅은 폴더a > 폴더b > page.tsx 로 만들어야 "~~/폴더a/폴더b/" 페이지로 접근 가능
// 동적 라우팅은 [folder] > page.tsx 로 만들어서 접근

function Page() {
	return <div>Search Page</div>;
}
export default Page;
