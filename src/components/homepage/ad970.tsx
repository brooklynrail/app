import { Ads } from "../../../lib/types"
import Image from "next/image"

interface AdsTileProps {
  ads: Array<Ads>
}

const Ad970 = (props: AdsTileProps) => {
  const { ads } = props

  return (
    <>
      <div className="ad ad_970 visible">
        <p>Advertisement</p>
        <div>
          <div className="ad">
            <a
              href=" https://goldenartistcolors.com/products/qor-artist-watercolors-ali-cavanaugh-portrait-colors-set"
              target="_blank"
            >
              <img
                className="image_desktop"
                alt="Advertisement: Golden Paint"
                src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/WPRHHsf09kftsowSoocwdw/bFfgTXwUcSXU_KF-bns9k9cC17wLV7bUTLxqzLPdIS5s_kzE-MwVfRDQlw1Fi4ebAoH3TriX1fucMASdR71tIged4YryIsSoSTwmZR6mN09gotzN8nAfbDqtVeZu-6yvkKs00pBg9R2-5WORpyM9gsL_UklFQ2WgFsFl3K_jutk/ze9x4wGsY8b1gtwCVVg3JHuwUpL9RRWZE5Qma1wRFUs"
              />
              <img
                className="image_mobile"
                alt="Advertisement: Golden Paint"
                src="https://v5.airtableusercontent.com/v3/u/25/25/1707890400000/wikViUKRbFNARAlP535NxQ/Y3gZJWISdLBtIXs_yE-4JR1ZE7UCHEuxu8MUCDw4wbUm-pUU2zkHGB5GvR--qcwFqfVW8s6HQISMEf0Xd_4uSTZ9Zc49EwZ9jE7eu18NAXKQz3kVBzIPq99i3bKVs3FdY9ssReTnZ05-nZ7pPLyDNDdiVGrOqJXyU1WUlTcKpLM/amEK1rNRESuTmjSEMZxMTQkU7vkpgl84WP5G9bBVbzQ"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ad970
