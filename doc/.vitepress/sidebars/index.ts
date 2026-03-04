export interface Item {
	text: string,
	collapsable?: boolean,
	collapsed?: boolean,
	link?: string;
	items?: Item[];
}

export type Sidebars = Item[];