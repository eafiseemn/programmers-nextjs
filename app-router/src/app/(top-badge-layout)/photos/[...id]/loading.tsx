function Loading() {
	return (
		<div className='p-6'>
			<div className='h-8 w-1/3 bg-slate-500 rounded mb-2 animate-pulse' />
			<div className='h-3 w-1/4 bg-slate-500 rounded mb-2 animate-pulse' />
			<div className='h-68 w-full bg-slate-500 rounded mb-3 animate-pulse' />
			<div className='h-4 w-1/4 bg-slate-500 rounded mb-2 animate-pulse' />
			<div className='h-4 w-2/3 bg-slate-500 rounded animate-pulse' />
		</div>
	);
}
export default Loading;

// React의 Suspense 와 유사 - 해당 페이지에 loading.tsx라는 이름으로 만들면 자동으로 폴백
