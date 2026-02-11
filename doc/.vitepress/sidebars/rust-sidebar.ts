import { DefaultTheme } from "vitepress";

export const rustSidebar = [
	{
		text: '初级',
		collapsable: true,
		items: [
			{ text: '序言', link: '/docs/backend/rust/primary/' },
			{ text: 'Hello, World!', link: '/docs/backend/rust/primary/hello-world' },
			{ text: 'Rust 的基本语法', link: '/docs/backend/rust/primary/basic-syntax' }
		]
	}
];