import { NextApiRequest, NextApiResponse } from 'next';

/* On-demand revalidation */
// http://localhost:3000/api/revalidate 로 접근
// Home에서 revalidate: 60 으로 정한 시간이 지나기 전에 캐시를 갱신할 필요가 있을 때 trigger 처리
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await res.revalidate('/');
		res.status(200).json({
			success: true,
			message: '✨ 모든 데이터가 갱신되었습니다! 캐시 반짝반짝 ✨',
			timestamp: new Date().toISOString(),
			path: '/',
		});
	} catch {
		return res.status(500).json({
			success: false,
			message: '🚨 API 요청 실패 🚨',
		});
	}
}
