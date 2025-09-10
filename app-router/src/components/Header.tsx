'use client';
// client base로 설정하지 않으면 server에서 무조건 실행되기 때문에 useRouter를 쓰려면 client component로 명시해줘야함

import { navItems } from '@/utils/navigation';
import tw from '@/utils/tw';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/navigation';

function Header() {
	// const router = useRouter();
	const pathname = usePathname();
	// console.log(pathname);

	return (
		<header className='bg-amber-50 text-slate-500 px-4 py-2 flex justify-between items-center'>
			<h1 className='text-3xl'>
				<Link href='/'>🐤</Link>
			</h1>
			<nav>
				<h2 className='sr-only'>메인 메뉴</h2>
				<ul className='flex gap-3'>
					{navItems.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								className={tw(
									'hover:text-red-400 transition-colors font-bold',
									pathname === href && 'text-red-500 underline'
								)}>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
export default Header;
