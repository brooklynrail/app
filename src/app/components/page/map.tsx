import { Pages } from "../../../../lib/types"

interface PageHeadProps {
  pageData: Pages
}

const MapEmbed = (props: PageHeadProps) => {
  const { map_key } = props.pageData

  if (!map_key) {
    return <></>
  }

  return (
    <div className="map">
      <iframe src={map_key} width="100%" height="600" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
  )
}
export default MapEmbed
