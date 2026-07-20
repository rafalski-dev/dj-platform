import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'DJ-platform',
	description: "Universal platform for dj's and bands."
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='min-h-full flex flex-col'>{children}</body>
		</html>
	);
}
