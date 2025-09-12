'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

function QueryProvider({ children }: { children: React.ReactNode }) {
	// useState로 감싸서 한 번만 실행시킴
	const [client] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60, // 1분동안 데이터가 신선하다고 판단
						gcTime: 1000 * 60 * 10, // Gabage Collector가 모든 데이터를 가져가는 시간 = 10분
						refetchOnWindowFocus: false, // tab focus 됐을 때 refetch 여부
						refetchIntervalInBackground: false, // background에서 refetch 여부
						retry: 1, // fetch 시도 횟수
					},
				},
			})
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
export default QueryProvider;
