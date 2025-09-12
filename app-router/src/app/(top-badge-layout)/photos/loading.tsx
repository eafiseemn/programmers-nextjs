function Loading() {
	return (
		<div className='p-2'>
			<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
				{Array.from({ length: 8 }).map((_, idx) => (
					<li key={idx} className='p-2 animate-pulse'>
						<div className='w-full h-36 bg-slate-500 rounded mb-2' />
						<div className='w-3/4 h-4 bg-slate-500 rounded' />
					</li>
				))}
			</ul>
		</div>
	);
}
export default Loading;
