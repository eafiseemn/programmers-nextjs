/*
Next.js(app router)는 서버에서 fetch로 데어터를 가져올 때 Data Cache라는 저장소에 결과를 보관함
options.cache 옵션을 통해 fetch 결과를 어떻게 캐싱/재사용할지 제어함

cache: 'default'
 - 개발환경 : 항상 새로운 요청
 - 프로덕션 : build time에 데이터 캐싱 후 '우선' 정적 데이터 사용
 - Dynamic API => cookies(), headers(), searchParams => 동적 데이터를 사용
 👉🏻 Next.js가 자동으로 SSR / SSG를 판단해서 build

cache: 'force-cache'
 - 같은 URL 요청이 있으면 Data Cache에서 꺼내 사용, 데이터가 없으면 새로 패치해서 캐시에 저장, 이후 정적 데이터 사용
 - 강제로 캐시에 저장해서 사용하는 방식
 - 또는 Component에서 export const dynamic = 'force-static' 으로 지정하는 방식도 가능
 👉🏻 build 시 한 번만 fetch -> 이후 요청은 캐시된 데이터를 그대로 사용
 👉🏻 데이터가 바뀌거나 수정되어도 데이터를 가져오지 않음 (revalidate 하기 전까지)

cache: 'no-store'
- 데이터를 캐시하지 않고 매번 사이트에 들어갈 때마다(on-demand) 원본 서버에서 데이터를 새롭게 요청 (Dynamic SSR)
 - getServerSideProps 와 유사 / 실시간 데이터
 - export const dynamic = 'force-dynamic'
 👉🏻 항상 새로운 요청과 새로운 데이터 (데이터의 실시간성 보장)
 👉🏻 데이터 요청이 많을 경우 성능 저하
*/

import { Photo } from '@/@types/type';

export default async function fetchPhotos(
	limit: number = 10,
	init?: RequestInit
): Promise<Photo[]> {
	const END_POINT = `${process.env.NEXT_PUBLIC_BASE_URL}/v2/list?page=8&limit=${limit}`;

	try {
		const res = await fetch(END_POINT, { ...init });
		if (!res.ok) {
			throw new Error();
		}
		return await res.json();
	} catch {
		console.error('error!');
		return [];
	}
}
