import RegisterForm from '@/components/RegisterForm';

function Page() {
	return (
		<>
			<h2 className='text-3xl text-center font-bold p-10'>회원가입</h2>
			<div className='border border-slate-400 p-5 m-5 rounded'>
				<RegisterForm />
			</div>
		</>
	);
}
export default Page;
