const ScreenIndicator = () => {
  const isDevOrPreview =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === undefined

  if (!isDevOrPreview) {
    return null
  }

  return (
    <div className="fixed bottom-3 left-3 z-50">
      <p className="text-xs px-1.5 bg-slate-200 dark:bg-slate-800 dark:text-white rounded">
        <span className={`hidden widescreen:block`}>widescreen</span>
        <span className={`hidden desktop-lg:max-widescreen:block`}>desktop-lg</span>
        <span className={`hidden desktop:max-desktop-lg:block`}>desktop</span>
        <span className={`hidden tablet-lg:max-desktop:block`}>tablet-lg</span>
        <span className={`hidden tablet:max-tablet-lg:block`}>tablet</span>
        <span className={`hidden mobile-lg:max-tablet:block`}>mobile-lg</span>
        <span className={`hidden mobile:max-mobile-lg:block`}>mobile</span>
      </p>
    </div>
  )
}

export default ScreenIndicator
