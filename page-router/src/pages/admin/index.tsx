import { useState } from 'react';

function Admin() {
	const [msg, setMsg] = useState('');
	const [time, setTime] = useState('');

	// On-Demand Revalidation using Route Handler
	const handleRevalidate = async () => {
		const res = await fetch('/api/revalidate');
		const data = await res.json();

		setMsg(data.message);
		setTime(data.timestamp);
	};

	return (
		<div className='p-8'>
			<h2 className='text-2xl font-bold mb-2'>Admin Page</h2>
			<button
				type='button'
				className='px-4 py-2 bg-blue-500 text-white rounded cursor-pointer'
				onClick={handleRevalidate}>
				🔄 캐시 갱신하기
			</button>
			{msg && <p className='m-3'>{msg}</p>}
			{time && <p className='m-3'>{time}</p>}
		</div>
	);
}
export default Admin;
