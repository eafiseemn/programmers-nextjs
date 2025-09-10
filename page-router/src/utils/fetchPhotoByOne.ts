import { Photo } from '@/@types/type';

export default async function fetchPhotoByOne(id: string): Promise<Photo | null> {
	const END_POINT = `https://picsum.photos/id/${id}/info`;
	try {
		const res = await fetch(END_POINT);
		if (!res.ok) {
			throw new Error(`Photo ${id} Fetch Failed`);
		}
		return await res.json();
	} catch (err) {
		console.error(`Photo ${id} Fetch Failed - Unexpected:`, err);
		return null;
	}
}
