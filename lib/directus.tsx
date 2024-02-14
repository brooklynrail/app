import { createDirectus, rest } from "@directus/sdk"
import { CustomDirectusTypes } from "./types"

const path = process.env.BASE_DIRECTUS_URL ? process.env.BASE_DIRECTUS_URL : "http://localhost:8055"
const directus = createDirectus<CustomDirectusTypes>(path).with(rest())

export default directus
