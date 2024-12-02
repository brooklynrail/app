import type { Font } from "satori"
import { ImageResponse } from "next/og"
import parse from "html-react-parser"
import { getArticleOGData } from "../../../../lib/utils/articles"

enum PageType {
  Contributor = "contributor",
  Person = "person",
  Article = "article",
  Event = "event",
}

export default async function getFonts(): Promise<Font[]> {
  const [UntitledSansMedium, UntitledSansMediumItalic] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fonts/untitled-sans/UntitledSansWeb-Medium.ttf`).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fonts/untitled-sans/UntitledSansWeb-MediumItalic.ttf`).then((res) =>
      res.arrayBuffer(),
    ),
  ])

  return [
    {
      name: "Untitled Sans",
      data: UntitledSansMedium,
      style: "normal",
      weight: 500,
    },
    {
      name: "Untitled Sans",
      data: UntitledSansMediumItalic,
      style: "italic",
      weight: 500,
    },
  ]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  const type = searchParams.get("type")

  if (!slug || !type) {
    return null
  }

  const fetchData = async (type: string, slug: string) => {
    switch (type) {
      case PageType.Article:
        return await getArticleOGData(slug, "published")
      default:
        console.log("Invalid type")
        return null
    }
  }

  const data = await fetchData(type, slug)

  if (!data) {
    return null
  }

  // Function to wrap each segment in inline-flex spans
  // Function to wrap each segment in its own flex container
  const flexWrap = (text: string): JSX.Element[] =>
    parse(text).map((node, index) => (
      <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {node}
      </div>
    ))

  const ogTitle = data.title
  // const ogExcerpt = data.excerpt
  const excerpt = `<span>This special occasion brings in conversation Vietnamese American artist An-My Lê with Vietnamese American writers, Monique Truong and Ocean Vuong. It is organized in conjunction with the exhibition</span> <em>An-My Lê: Between Two Rivers</span></em>.</span>`
  const ogExcerpt: JSX.Element[] = flexWrap(excerpt)
  console.log("ogExcerpt", ogExcerpt)
  const ogSection = data.section
  const ogIssue = data.issue
  const ogImage =
    data.image && `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=${encodeURIComponent(data.image)}&w=1200&q=85`
  const ogContributors = data.contributors

  function Label({ children }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
      <label
        style={{
          fontSize: 30,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
          margin: "0px 0 20px",
          color: "gray",
        }}
      >
        {children}
      </label>
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: "20px 40px",
          justifyContent: "center",
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: 50,
          backgroundColor: "#FEF9C3",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            padding: "20px 00px",
            justifyContent: "space-between",
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 50,
            backgroundColor: "#FEF9C3",
          }}
        >
          <Label style={{ display: "flex" }}>{ogIssue}</Label>
          <Label style={{ display: "flex" }}>{ogSection}</Label>
        </div>

        <div style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
          {ogImage && (
            <img
              src={ogImage}
              width="100%"
              height="400"
              alt=""
              tw="flex-1 w-full h-full"
              style={{ objectFit: "contain", objectPosition: "center", maxWidth: "100%", height: "400px" }}
            />
          )}
        </div>

        <div
          tw=""
          style={{
            marginTop: 30,
            marginBottom: 40,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            lineHeight: "1.1",
          }}
        >
          {ogTitle}
        </div>

        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
          <Label>By {ogContributors}</Label>
        </div>

        <div
          tw="flex text-lg mt-9"
          style={
            {
              // display: "flex",
              // fontStyle: "italic",
              // flexWrap: "wrap",
              // gap: 2,
            }
          }
        >
          {ogExcerpt}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FEF9C3",
            marginTop: "40px",
            justifyContent: "center",
          }}
        >
          <RailLogo />
        </div>
      </div>
    ),
    {
      width: 800,
      height: 1000,
      fonts: await getFonts(),
    },
  )
}

const RailLogo = () => {
  return (
    <svg width="60" height="60" transform="scale(1)">
      <path
        d="M0 0 C164.15789474 0 164.15789474 0 185 20 C198.75658407 36.11179691 201.14829997 55.55836512 201.203125 75.9453125 C201.20736607 77.01686899 201.20736607 77.01686899 201.21169281 78.11007309 C201.22661681 81.89337269 201.23588816 85.67663486 201.24023438 89.45996094 C201.24569841 93.32596698 201.269702 97.1916172 201.29820633 101.05751228 C201.31702406 104.0673618 201.32204842 107.077129 201.32357025 110.08703232 C201.32655614 111.5100994 201.33444302 112.93316652 201.34775543 114.35617447 C201.49400191 131.19500357 198.81069242 149.13329273 187 162 C181.22884621 167.84314323 175.08828432 172.1747677 167 174 C167.75023437 174.40089844 168.50046875 174.80179688 169.2734375 175.21484375 C185.27653282 184.10321281 195.17190805 195.55857776 201 213 C203.84511718 223.78773599 205.14618964 234.3771808 205.16113281 245.50439453 C205.16609772 246.40820358 205.17106262 247.31201263 205.17617798 248.24320984 C205.19067338 251.20641874 205.19758089 254.1695741 205.203125 257.1328125 C205.20736607 258.66448877 205.20736607 258.66448877 205.21169281 260.227108 C205.22663524 265.63252771 205.23589555 271.03792108 205.24023438 276.44335938 C205.2457073 281.98733202 205.26972489 287.53105764 205.29820633 293.07495308 C205.3169572 297.37330805 205.32204492 301.67160502 205.32357025 305.96999741 C205.32656999 308.01185326 205.3345062 310.05370876 205.34775543 312.09552383 C205.46758102 331.98294679 204.1534218 351.59247753 190 367 C189.45085937 367.60328125 188.90171875 368.2065625 188.3359375 368.828125 C146.97416792 409.27884239 14.99666428 388 0 388 C0 259.96 0 131.92 0 0 Z M72 63 C72 90.06 72 117.12 72 145 C105.06944868 147.2902425 105.06944868 147.2902425 119 141 C123.21790819 136.78209181 124.1206859 133.37186717 124.16113281 127.53808594 C124.17074036 126.41972351 124.1803479 125.30136108 124.19024658 124.14910889 C124.1966214 122.33506561 124.1966214 122.33506561 124.203125 120.484375 C124.20882507 119.240047 124.21452515 117.99571899 124.22039795 116.71368408 C124.22985234 114.07747746 124.23674669 111.44138478 124.24023438 108.80517578 C124.24462053 106.10874914 124.25851683 103.41264221 124.28125 100.71630859 C124.31174789 96.82639866 124.32228706 92.93689125 124.328125 89.046875 C124.3404718 87.84560974 124.3528186 86.64434448 124.36553955 85.40667725 C124.34579659 77.96649476 124.19323749 72.19323749 118.6875 66.6875 C104.97157798 58.07517687 87.08704194 63 72 63 Z M72 209 C72 247.61 72 286.22 72 326 C102.31857154 328.2250205 102.31857154 328.2250205 128 317 C135.1837428 308.711066 134.30062303 297.62848787 134.265625 287.2890625 C134.26697582 285.87096083 134.26891982 284.45285962 134.27142334 283.03475952 C134.27435691 280.07456009 134.2701356 277.11448209 134.26074219 274.15429688 C134.24936966 270.39009191 134.25590436 266.62617295 134.26788712 262.86197853 C134.27517172 259.93630891 134.27278743 257.01070521 134.26763153 254.08503342 C134.26631211 252.69858134 134.26788171 251.31212296 134.27259064 249.92567825 C134.50626167 232.82405354 134.50626167 232.82405354 127 218 C112.08031492 204.18775547 91.1009014 209 72 209 Z "
        fill="#71717A"
        transform="translate(152,181)"
      />
      <path
        d="M0 0 C170.60893855 0 170.60893855 0 188.15234375 17.09765625 C204.66745563 34.53540008 205.32996765 59.65294979 205.265625 82.3515625 C205.26697766 84.06635594 205.26892315 85.78114901 205.27142334 87.49594116 C205.2743448 91.06080842 205.27017319 94.62557436 205.26074219 98.19042969 C205.249332 102.71976574 205.25593617 107.24886505 205.26788712 111.77819252 C205.2751721 115.30959809 205.27278789 118.84094905 205.26763153 122.37235641 C205.26631422 124.04101974 205.26787395 125.70968831 205.27259064 127.37834549 C205.32051443 149.07972014 203.02641263 171.24325261 187.46875 187.734375 C182.13834284 192.62620435 176.01936017 196.15279996 169 198 C169.68964844 198.20753906 170.37929688 198.41507813 171.08984375 198.62890625 C183.06015146 202.55332812 191.32656071 209.55479041 197.4375 220.59765625 C203.6223864 233.39079926 205.14387341 246.52983367 205.15771484 260.54980469 C205.16279556 261.68261871 205.16787628 262.81543274 205.17311096 263.98257446 C205.18377532 266.43243397 205.19241077 268.88230298 205.19923019 271.33217621 C205.21107672 275.21753423 205.23054423 279.10278395 205.25234985 282.98809814 C205.31397477 294.03173952 205.36820146 305.07537423 205.40136719 316.11914062 C205.42177281 322.88470319 205.45772756 329.65005792 205.50212479 336.41550446 C205.51623136 338.98452643 205.52499507 341.55358379 205.52817917 344.12264252 C205.53311855 347.72617894 205.55635441 351.3291888 205.58349609 354.93261719 C205.58048996 355.98029266 205.57748383 357.02796814 205.5743866 358.10739136 C205.70381856 369.74968814 208.29316368 377.72769462 214 388 C185.95 388 157.9 388 129 388 C128.96261719 378.89921875 128.92523437 369.7984375 128.88671875 360.421875 C128.85642923 354.64321416 128.82539527 348.86457306 128.79101562 343.0859375 C128.73663039 333.92156806 128.68521321 324.75725338 128.65356445 315.59277344 C128.63049571 308.91685563 128.59699978 302.24108281 128.55129844 295.5652802 C128.52748502 292.03477833 128.50867888 288.50441899 128.50238609 284.97383881 C128.4951423 281.01983533 128.46460492 277.06618695 128.43237305 273.11230469 C128.43380814 271.95855347 128.43524323 270.80480225 128.4367218 269.61608887 C128.30313147 257.96508066 126.60770289 248.0282806 118.5 239.3125 C105.83621502 230.94535635 86.45178122 233.44839271 73 233 C73 284.15 73 335.3 73 388 C48.91 388 24.82 388 0 388 C0 259.96 0 131.92 0 0 Z M73 63 C73 99.3 73 135.6 73 173 C98.66713173 175.19134555 98.66713173 175.19134555 121.3125 167.875 C129.261738 159.371164 128.59226094 149.33772449 128.53125 138.375 C128.5339494 136.6606423 128.53783555 134.9462861 128.54284668 133.23193359 C128.54872068 129.65121788 128.54024701 126.07090321 128.52148438 122.49023438 C128.49869584 117.92072622 128.51183027 113.35215807 128.53577423 108.78268433 C128.55028933 105.24626699 128.5456002 101.71006929 128.53526306 98.17364502 C128.53261152 96.4896839 128.53580964 94.80570227 128.54518127 93.12176514 C128.8792281 80.42273894 128.8792281 80.42273894 124 69 C110.2524897 56.09292733 91.67361395 63 73 63 Z "
        fill="#71717A"
        transform="translate(384,181)"
      />
    </svg>
  )
}
