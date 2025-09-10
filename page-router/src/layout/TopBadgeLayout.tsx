function TopBadgeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<p className='bg-sky-200 text-center m-2 p-3 rounded-xl'>Lorem Picsum 🎨</p>
			{children}
		</div>
	);
}
export default TopBadgeLayout;
