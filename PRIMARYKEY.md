# Switching the PRIMARY_KEY for Articles

At the moment, we are using the `slug` as the PRIMARY_KEY for the Articles collection.

We are going to transition to using `id` as the PRIMARY_KEY.

We intend to do this work in both the Directus Schema editor and in the database itself.

## 1. Create the `id` field in Articles and generate the UUID

1. Create the `id` field in Directus, allow NULL values
2. Generate the UUIDs through a SQL query

```
UPDATE articles
SET id = gen_random_uuid()
WHERE id IS NULL;
```

3. Ensure that the field data is coming through and that the field is required, unique, non NULL, and not editable.
4. Make the ID field unique

```
ALTER TABLE articles
ADD CONSTRAINT unique_article_id UNIQUE (id);
```

## 2. Add the article_id to the join tables

All of the join tables currently have three columns:

- id
- articles_slug
- contributors_slug (changes)

1. Add the new `article_id` column to the join table:

```
ALTER TABLE articles_contributors
ADD COLUMN article_id UUID;
```

2. populate the new `article_id` column with the correct UUID values from the articles table by joining on the `article_slug`:

```
UPDATE articles_contributors jt
SET article_id = a.id
FROM articles a
WHERE jt.articles_slug = a.slug;
```

3. create a foreign key constraint on the `article_id` column in the join table:

```
ALTER TABLE articles_contributors
ADD CONSTRAINT fk_article_id
FOREIGN KEY (article_id)
REFERENCES articles(id);
```

## 3. Set the ID in Articles to be the PRIMARY_KEY

TKTK

## 4. Clear Directus Cache

## 5. Push any code changes that are needed to work with these changes
