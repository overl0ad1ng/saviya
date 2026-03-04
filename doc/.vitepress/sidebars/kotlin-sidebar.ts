import type { Sidebars } from "./index";

export const base = "/docs/backend/kotlin";

export const kotlinSidebar: Sidebars = [
	{
		text: '介绍',
		collapsable: true,
		items: [
			{ text: '序言', link: `${base}/primary/` },
			{ text: "基础", link: `${base}/primary/basic` },
			{
				text: "类",
				link: `${base}/primary/class/`,
				collapsed: true,
				items: [
					{ text: "数据类", link: `${base}/primary/class/data-class` },
					{ text: "接口", link: `${base}/primary/class/interfaces` },
					{ text: "抽象类和继承", link: `${base}/primary/class/abstract-and-inheritance` },
				]
			},
		]
	}
]