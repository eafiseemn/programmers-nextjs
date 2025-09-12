'use server';

import { cookies } from 'next/headers';

// import { revalidatePath, revalidateTag } from 'next/cache';
// import { redirect } from 'next/navigation';

// 서버에서 구동되는 action 함수라는 걸 표시
// server action (form의 onSubmit 대신 action으로 연결)

export default async function createUser(_: unknown, formData: FormData) {
	const email = (formData.get('email') ?? '').toString().trim();
	const password = (formData.get('password') ?? '').toString();

	if (!email || !password) throw new Error('이메일과 비밀번호를 입력해주세요.');

	const res = await fetch('https://jsonplaceholder.typicode.com/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, name: password }),
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('회원가입 실패');
	}

	// BE에서 token을 JSON으로 돌려준다고 가정
	const { accessToken, refreshToken } = await res.json();
	const cookieStore = await cookies(); // 쿠기 굽기

	// cookie setting은 BE 요청에 맞춰 진행
	// access_token : 짧은 수명 주기
	cookieStore.set('access_token', accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax', // 같은 사이트 = strict, 다른 도메인 = none, ...
		path: '/',
		maxAge: 60 * 15, // 15 min
	});

	// refresh_token : 긴 수명 주기
	cookieStore.set('refresh_token', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});

	// PURGE (cleansing...)
	// 강제 revalidate (CRUD 이후 페이지 데이터 상태 업데이트를 위해)
	// 업데이트할 path && : 업데이트 단위 : 'layout' (레이아웃 기준) || 'page' (페이지 기준)
	// revalidatePath('/', 'layout'); // -> 전체 페이지 fetching
	// revalidatePath('/(top-badge-layout)', 'layout');   // -> 특정 레이아웃을 갖는 페이지만
	// revalidatePath('/photos/${id}', 'page');  // -> 특정 페이지만
	// revalidateTag('user');

	// redirect('/login');
	return await res.json();
}
