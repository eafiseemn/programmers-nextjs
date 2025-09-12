export const getRandomPhotos = async () => {
	const promises = Array.from({ length: 10 }).map(
		(_, idx) =>
			fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/seed/${Date.now()}-${idx}-${Math.random()}/400/300`,
				{ next: { revalidate: 60 } }
			).then((res) => res.url)
		// Promise all -> 서버 컴포넌트에서는 같은 시간에 실행 -> 전부 같은 이미지를 가져옴
		// seed를 추가해서 다른 이미지를 가져오도록 설정
		// ISR은 { next: { revalidate: 60(s) } } 으로 설정
	);

	const urls = await Promise.all(promises);

	return urls;
};
