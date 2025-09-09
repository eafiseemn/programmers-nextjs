import { navItems } from '@/utils/navigation';
import tw from '@/utils/tw';
import Link from 'next/link';
import { useRouter } from 'next/router';
// next/navigation의 useRouter은 AppRouter용

function Header() {
	const router = useRouter();
	// console.log(router.pathname);

	return (
		<header className='bg-amber-50 text-slate-500 px-4 py-2 flex justify-between items-center'>
			<h1>
				<Link href='/'>🐹</Link>
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
									router.pathname === href && 'text-blue-500 underline'
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
