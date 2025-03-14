import { useState } from "react"

enum PromoType {
  ArtSeen = "artseen",
  ArtBooks = "artbooks",
  Books = "books",
  Dance = "dance",
  Film = "film",
  Music = "music",
  Theater = "theater",
}

const Field = (props: {
  label: string
  value: string
  placeholder?: string
  required?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="field">
      <label className="text-xs mr-1" htmlFor={props.label}>
        {props.label}
        {props.required && `*`}
      </label>
      <input
        type="text"
        id={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="m-0 p-0.5 rounded-sm border border-base-light font-sans text-2xs text-light text-black bg-white w-full"
      />
    </div>
  )
}

const PromoBuilder = () => {
  const [type, setType] = useState<PromoType>(PromoType.ArtSeen)
  const [venue, setVenue] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [directedBy, setDirectedBy] = useState("")
  const [language, setLanguage] = useState("")
  const [company, setCompany] = useState("")
  const [runTime, setRunTime] = useState("")
  const [translator, setTranslator] = useState("")
  const [publisher, setPublisher] = useState("")
  const [additional, setAdditional] = useState("")
  const [dates, setDates] = useState("")
  const [city, setCity] = useState("")
  const [artist, setArtist] = useState("")
  const [label, setLabel] = useState("")

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value)
    }
  const handleSelectChange =
    (setter: React.Dispatch<React.SetStateAction<PromoType>>) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      setter(event.target.value as PromoType)
    }

  const fieldLanguage = (
    <Field label="Language" placeholder="" value={language} onChange={handleInputChange(setLanguage)} />
  )
  const fieldCompany = <Field label="Company" placeholder="" value={company} onChange={handleInputChange(setCompany)} />
  const fieldRunTime = (
    <Field label="Run Time" placeholder="" value={runTime} onChange={handleInputChange(setRunTime)} />
  )
  const fieldDirectedBy = (
    <Field label="Directed By" placeholder="" value={directedBy} onChange={handleInputChange(setDirectedBy)} />
  )
  const fieldVenue = <Field label="Venue" placeholder="" value={venue} onChange={handleInputChange(setVenue)} />
  const fieldTitle = (
    <Field required label="Title" placeholder="title" value={title} onChange={handleInputChange(setTitle)} />
  )
  const fieldLabel = <Field label="Label" placeholder="" value={label} onChange={handleInputChange(setLabel)} />
  const fieldAuthor = (
    <Field label="Author" placeholder="author" value={author} onChange={handleInputChange(setAuthor)} />
  )
  const fieldTranslator = (
    <Field label="Translator" placeholder="translator" value={translator} onChange={handleInputChange(setTranslator)} />
  )

  const fieldPublisher = (
    <Field label="Publisher" placeholder="publisher" value={publisher} onChange={handleInputChange(setPublisher)} />
  )
  const fieldAdditional = (
    <Field label="Additional" placeholder="additional" value={additional} onChange={handleInputChange(setAdditional)} />
  )

  const fieldDates = <Field label="Dates" placeholder="dates" value={dates} onChange={handleInputChange(setDates)} />

  const fieldCity = <Field label="City" placeholder="city" value={city} onChange={handleInputChange(setCity)} />

  const fieldArtist = (
    <Field label="Artist" placeholder="artist" value={artist} onChange={handleInputChange(setArtist)} />
  )

  const formArtbooks = (
    <div>
      {fieldTitle}
      {fieldAuthor}
      {fieldPublisher}
      {fieldAdditional}
    </div>
  )
  const formBooks = (
    <div>
      {fieldAuthor}
      {fieldTitle}
      {fieldTranslator}
      {fieldPublisher}
      {fieldAdditional}
    </div>
  )
  const formArtseen = (
    <div>
      {fieldTitle}
      {fieldVenue}
      {fieldDates}
      {fieldCity}
    </div>
  )
  const formFilm = (
    <div>
      {fieldTitle}
      {fieldDirectedBy}
      {fieldCompany}
      {fieldLanguage}
      {fieldRunTime}
    </div>
  )
  const formDance = (
    <div>
      {fieldArtist}
      {fieldTitle}
      {fieldVenue}
      {fieldDates}
      {fieldCity}
    </div>
  )
  const formMusic = (
    <div>
      {fieldArtist}
      {fieldTitle}
      {fieldLabel}
      {fieldVenue}
      {fieldDates}
      {fieldCity}
    </div>
  )
  const formTheater = (
    <div>
      {fieldTitle}
      {fieldArtist}
      {fieldVenue}
      {fieldDates}
      {fieldCity}
    </div>
  )

  const codeArtseen = () => {
    return `[promo type="free-text"]<em>${title}</em><br />${venue}<br />${dates}<br />${city}[/promo]`
  }

  const codeArtbooks = () => {
    return `[promo type="free-text"]<em>${title}</em><br />${author}<br />${publisher}<br />${additional}[/promo]`
  }

  const codeBooks = () => {
    return `[promo type="free-text"]${author}<br /><em>${title}</em><br />${translator}<br />${publisher}<br />${additional}[/promo]`
  }

  const codeDance = () => {
    return `[promo type="free-text"]${artist}<br /><em>${title}</em><br />${venue}<br />${dates}<br />${city}[/promo]`
  }

  const codeMusic = () => {
    return `[promo type="free-text"]${artist}<br /><em>${title}</em><br />${label && label}${label && `<br/>`}${venue}<br />${dates}<br />${city}[/promo]`
  }

  const codeFilm = () => {
    return `[promo type="free-text"]<em>${title}</em><br />${directedBy}<br />${company}<br />${language}<br />${runTime}[/promo]`
  }

  const codeTheater = () => {
    return `[promo type="free-text"]<em>${title}</em><br />${artist}<br />${venue}<br />${dates}<br />${city}[/promo]`
  }

  // [promo type="free-text"]<h6>New York</h6><a href="URL" title="Venue"><strong>Venue</strong></a><br/><em>ShowTitle</em><br/>Jun 1, 2024 &ndash; Aug 30, 2024[/promo]
  const generatePromoCode = (type: PromoType) => {
    switch (type) {
      case PromoType.ArtSeen:
        return codeArtseen()
      case PromoType.ArtBooks:
        return codeArtbooks()
      case PromoType.Books:
        return codeBooks()
      case PromoType.Dance:
        return codeDance()
      case PromoType.Film:
        return codeFilm()
      case PromoType.Music:
        return codeMusic()
      case PromoType.Theater:
        return codeTheater()
      default:
        return ""
    }
  }

  const promoForm = (type: PromoType) => {
    switch (type) {
      case PromoType.ArtSeen:
        return formArtseen
      case PromoType.ArtBooks:
        return formArtbooks
      case PromoType.Books:
        return formBooks
      case PromoType.Dance:
        return formDance
      case PromoType.Music:
        return formMusic
      case PromoType.Film:
        return formFilm
      case PromoType.Theater:
        return formTheater
      default:
        return ""
    }
  }

  return (
    <div className="">
      <h4 className="text-xs uppercase">Promo Builder</h4>
      <div>
        <div className="flex flex-col">
          <label className="text-xs mr-1 text-slate-500" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            className="border-[1px] border-slate-500"
            value={type}
            onChange={handleSelectChange(setType)}
          >
            <option value={PromoType.ArtSeen}>Artseen</option>
            <option value={PromoType.ArtBooks}>Art Books</option>
            <option value={PromoType.Books}>Books</option>
            <option value={PromoType.Dance}>Dance</option>
            <option value={PromoType.Film}>Film</option>
            <option value={PromoType.Music}>Music</option>
            <option value={PromoType.Theater}>Theater</option>
          </select>
        </div>
        {promoForm(type)}
      </div>
      <div className="">
        <pre className="bg-white p-4 mt-2 mb-2 font-sans text-xs text-red-600 rounded-sm shadow-lg">
          <code className="whitespace-pre-wrap">{generatePromoCode(type)}</code>
        </pre>
      </div>
    </div>
  )
}

export default PromoBuilder
