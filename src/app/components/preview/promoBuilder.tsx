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
      <label htmlFor={props.label}>
        {props.label}
        {props.required && `*`}
      </label>
      <input
        type="text"
        id={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

const PromoBuilder = () => {
  const [type, setType] = useState<PromoType>(PromoType.ArtSeen)
  const [venue, setVenue] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
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
      {fieldTitle}
      {fieldAuthor}
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
    return `[promo type="free-text"]<em>${title}</em><br />${author}<br />${translator ?? translator}${translator ?? `<br/>`}${publisher}<br />${additional}[/promo]`
  }

  const codeDance = () => {
    return `[promo type="free-text"]<em>${artist}</em><br />${title}<br />${venue}<br />${dates}<br />${city}[/promo]`
  }

  const codeMusic = () => {
    return `[promo type="free-text"]<em>${artist}</em><br />${title}<br />${label && label}${label && `<br/>`}${venue}<br />${dates}<br />${city}[/promo]`
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
        return codeArtseen()
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
        return formArtseen
      case PromoType.Theater:
        return formTheater
      default:
        return ""
    }
  }

  return (
    <div className="block promo-builder">
      <h4>Promo Builder</h4>
      <div>
        <div className="field">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={handleSelectChange(setType)}>
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
      <div className="generated">
        <pre>
          <code>{generatePromoCode(type)}</code>
        </pre>
      </div>
    </div>
  )
}

export default PromoBuilder
