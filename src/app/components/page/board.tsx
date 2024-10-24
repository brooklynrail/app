import { PageBodyProps } from "./pageBody"

enum BoardGroup {
  BoardOfDirectors = "Board of Directors",
  AdvisoryBoard = "Advisory Board",
}

const Board = (props: PageBodyProps) => {
  const { pageData } = props

  if (!pageData.board) {
    return <></>
  }

  const boardOfDirectors = pageData.board.map((member, i) => {
    if (member.group !== BoardGroup.BoardOfDirectors) {
      return null
    }
    return (
      <li key={i}>
        <span>{member.name}</span>
      </li>
    )
  })

  const advisoryBoard = pageData.board.map((member, i) => {
    if (member.group !== BoardGroup.AdvisoryBoard) {
      return null
    }
    return (
      <li key={i}>
        <span>{member.name}</span>
      </li>
    )
  })

  // divide the advisoryBoard into two arrays
  const half = Math.ceil(advisoryBoard.length / 2)
  const advisory1 = advisoryBoard.slice(0, half)
  const advisory2 = advisoryBoard.slice(half, advisoryBoard.length)

  return (
    <div className="py-12 space-y-12">
      <div className="space-y-3">
        <h3 className="font-bold text-sm uppercase">{BoardGroup.BoardOfDirectors}</h3>
        <ul className="text-lg space-y-2">{boardOfDirectors}</ul>
      </div>
      {advisoryBoard && (
        <div className="space-y-3">
          <h3 className="font-bold text-sm uppercase">{BoardGroup.AdvisoryBoard}</h3>
          <div className="flex gap-3">
            <ul className="text-lg space-y-2 w-mobile">{advisory1}</ul>
            <ul className="text-lg space-y-2 w-mobile">{advisory2}</ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Board
