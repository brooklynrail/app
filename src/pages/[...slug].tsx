import directus from '../../lib/directus';
import { notFound } from 'next/navigation';
import { readItem, readItems } from '@directus/sdk';

function Page(props:any) {
	const title = props[0].title;
	const year = props[0].year;
	const month = props[0].month;
	return <><h3>{title}</h3> <p>{year} / {month}</p></>
}

export default Page


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }:any) {
	const slug = params.slug.join('/'); // Combines the array back into a string
	const year = params.slug[0];
	const month = params.slug[1];

	const issueData = await directus.request(
		readItems('issues', {
			fields: ['slug', 'year', 'month', 'title'],
			filter: {_and: [{ year: { _eq: year } }, { month: { _eq: month } }]},
		})
	);

	return {
		props: {
			...issueData,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	}

}
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
	const issues = await directus.request(
		readItems('issues', {
			fields: ['slug'],
		})
	);
	
	// console.log("issues ====================");
	// console.log(issues);
	
	const paths = issues.map(issue => ({
    params: { slug: issue.slug.split('/') },
  }));
 
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
 



