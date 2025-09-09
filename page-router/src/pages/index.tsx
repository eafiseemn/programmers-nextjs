// import { useEffect } from 'react';

export default function Home() {
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
		<div>
			<h1>Home Page</h1>
		</div>
	);
}
