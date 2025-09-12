'use client';

import createUser from '@/actions/createUser.action';
import { useActionState } from 'react';

function RegisterForm() {
	const [state, submitAction, isPending] = useActionState(createUser, null);
	console.log(state);

	return (
		<form action={submitAction}>
			<div>
				<label htmlFor='email'>
					이메일 :
					<input type='email' name='email' id='email' className='border-b m-2 w-1/2' />
				</label>
			</div>
			<div>
				<label htmlFor='password'>
					비밀번호 :
					<input type='password' name='password' id='password' className='border-b m-2 w-1/2' />
				</label>
			</div>
			<button
				type='submit'
				className='w-full bg-emerald-600 px-3 py-2 rounded mt-10 font-bold text-white disabled:bg-emerald-600/40 disabled:cursor-not-allowed'
				disabled={isPending}>
				{isPending ? '처리 중...' : '회원가입'}
			</button>
		</form>
	);
}
export default RegisterForm;
