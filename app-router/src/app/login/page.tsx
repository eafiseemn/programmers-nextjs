import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Triangle | Login',
	description: 'Triangle 서비스에 로그인하세요',
};

function Page() {
	return (
		<div className='flex flex-col gap-4 px-6'>
			<h2>Login Page</h2>
			<Link
				className='bg-blue-500 px-4 py-2 ml-3 rounded font-bold text-white text-center'
				href='/register'>
				회원가입
			</Link>
		</div>
	);
}
export default Page;
