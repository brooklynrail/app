import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitIcon } from "./searchBox"

const SearchField = () => {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query)
      router.push(`/search/?brooklynrail%5Bquery%5D=${encodedQuery}`)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full py-2.5 px-3 rounded-sm shadow-lg text-sm text-zinc-800 focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1"
        />
        <button type="submit">
          <SubmitIcon />
        </button>
      </form>
    </div>
  )
}
export default SearchField
