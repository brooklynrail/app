import Link from "next/link"
import Image from "next/image"

const RailPartners = () => {
  return (
    <div className="related rail_partners">
      <Link href="https://www.metabolicstudio.org/" target="out-rail">
        <Image src="/images/banners-left/metabolic-studio.png" width="124" height="62" alt="Metabolic Studio" />
      </Link>

      <Link href="https://www.philipguston.org/home" target="out-rail">
        <Image src="/images/banners-left/guston-foundation.jpg" width="124" height="40" alt="The Guston Foundation" />
      </Link>

      <Link href="http://louiscomforttiffanyfoundation.org/" target="out-rail">
        <Image
          src="/images/banners-left/LCTF_darkgrey_6.png"
          width="124"
          height="62"
          alt="The Louis Comfort Tiffany Foundation"
        />
      </Link>

      <Link href="https://www.dedalusfoundation.org/" target="out-rail">
        <Image
          src="/images/banners-left/DEDALUS_FOUNDATION_Logotype2.jpg"
          width="124"
          height="61"
          alt="The Dedalus Foundation"
        />
      </Link>

      <Link href="https://www.ulae.com/" target="out-rail">
        <Image src="/images/banners-left/ulae-logo.png" width="124" height="124" alt="Universal Limited Art Editions" />
      </Link>

      <Link href="http://anthologyfilmarchives.org/" target="out-rail">
        <Image src="/images/banners-left/AFALogotypeWhite.jpg" width="124" height="131" alt="Anthology Film Archives" />
      </Link>

      <Link href="https://thestudioprogram.com/?br" target="out-rail">
        <Image
          src="/images/banners-left/sharpe-walentas.jpg"
          width="124"
          height="91"
          alt="The Sharpe-Walentas Studio Program"
        />
      </Link>

      <Link href="https://www.glasserienyc.com/?br" target="out-rail">
        <Image src="/images/banners-left/glasserie-card.png" width="124" height="62" alt="Glasserie Restaurant" />
      </Link>

      <Link href="http://studioinaschool.org/" target="out-rail">
        <Image src="/images/banners-left/STUDIO_LOGO_COLOR.jpg" width="124" height="52" alt="Studio in a School" />
      </Link>

      <Link href="https://secondshiftstudiospace.org/" target="out-rail">
        <Image src="/images/banners-left/second_shift_ad.jpg" width="124" height="62" alt="Second Shift Studios" />
      </Link>
    </div>
  )
}

export default RailPartners
