
import { readItems, readItem } from '@directus/sdk';
import { notFound } from 'next/navigation';
import directus from '../lib/directus';

async function getIssue(slug:string) {
	try {
		const page = await directus.request(readItem('issue', slug));
		return page;
	} catch (error) {
		notFound();
	}
}

export default async function DynamicPage({ params }:any) {
	const page = await getIssue(params.slug);
	return (
		<div>
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.content }}></div>
		</div>
	);
}
