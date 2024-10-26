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
      router.push(`/search/?archive%5Bquery%5D=${encodedQuery}`)
    }
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSearch} className="mt-4 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button type="submit">
          <SubmitIcon />
        </button>
      </form>
    </div>
  )
}
export default SearchField
