import { HomepageProps } from "@/pages"
import PromoThumb from "../promo/thumb"

const EditorsMessage = (props: HomepageProps) => {
  const { editorsMessage, dateSlug } = props

  return (
    <div className="collection">
      <h3>Editor's Message</h3>
      <PromoThumb article={editorsMessage[0]} dateSlug={dateSlug} showImage={true} showSection={false} />
    </div>
  )
}

export default EditorsMessage
