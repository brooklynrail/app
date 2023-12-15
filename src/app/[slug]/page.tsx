
import { readItems } from '@directus/sdk';
import directus from '../../../lib/directus';

async function getIssues() {
	return directus.request(
		readItems('issues', {
			fields: ['slug', 'title', 'year', 'month'],
			sort: ['-title'],
		})
	);
}

export default async function DynamicPage() {
	const issues = await getIssues();
	return (
		<div>
			<h1>Issues</h1>
      <ul>
        {issues.map((issue) => {
          return (
            <li key={issue.slug}>
              <a href={`/blog/${issue.slug}`}>
                <h2>{issue.title}</h2>
              </a>
              <span>
                {issue.year} &bull; {issue.month}
              </span>
            </li>
          );
        })}
      </ul>
		</div>
	);
}