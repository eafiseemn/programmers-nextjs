import { Photo } from '@/@types/type';

export default async function fetchPhotos(limit: number = 10): Promise<Photo[]> {
	const END_POINT = `https://picsum.photos/v2/list?page=5&limit=${limit}`;
	try {
		const res = await fetch(END_POINT);
		if (!res.ok) {
			throw new Error('Photos Fetch Failed');
		}
		return await res.json();
	} catch (err) {
		console.error('Photos Fetch Failed - Unexpected:', err);
		return [];
	}
}
