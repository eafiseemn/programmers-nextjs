'use client';

import { usePathname, useRouter } from 'next/navigation';

function SearchForm() {
	const router = useRouter();
	const pathname = usePathname();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const input = e.currentTarget.querySelector('#search') as HTMLInputElement;
		const keyword = input.value.trim();

		router.push(`${pathname}?q=${keyword}`);
		input.value = '';
	};

	return (
		<form
			className='border border-slate-400 p-2 m-4 rounded flex justify-center items-center'
			onSubmit={handleSubmit}>
			<label htmlFor='search'>
				<input
					type='search'
					id='search'
					className='border border-slate-400 rounded indent-2 py-0.5 w-xs'
				/>
			</label>
			<button className='bg-blue-500 px-2 py-1 ml-2 rounded font-bold text-white'>검색</button>
		</form>
	);
}
export default SearchForm;
