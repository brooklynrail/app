import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus(process.env.BASE_DIRECTUS_URL).with(rest());

export default directus;