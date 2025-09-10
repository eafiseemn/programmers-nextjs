function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<p className='bg-fuchsia-200 text-center m-2 p-3 rounded-xl'>Lorem Picsum 🎨</p>
			{children}
		</div>
	);
}
export default Layout;

// 컴포넌트별 레이아웃은 layout.tsx로 지정
// (group) 으로 묶으면 자동으로 공통 레이아웃으로 지정됨 (경로에는 영향을 주지 않음): colocation
