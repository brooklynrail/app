interface PasswordProps {
  password: string
  passwordError: string | undefined
  setPassword: (password: string) => void
  handlePasswordSubmit: (event: React.FormEvent) => void
}

const Password = (props: PasswordProps) => {
  const { password, passwordError, setPassword, handlePasswordSubmit } = props

  // A handler for the password input field that checks on keyup
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <div className="preview-pass">
      <div className="grid-container">
        <div className="grid-row grid-gap-3">
          <div className="grid-col-12">
            <form onSubmit={handlePasswordSubmit}>
              <div className="passWrap">
                <div className="field">
                  <input
                    className={`usa-input ${passwordError ? "usa-input--error" : ""}`}
                    id="input-type-text"
                    type="text"
                    value={password}
                    onChange={(event) => handlePasswordChange(event)}
                    placeholder="password..."
                  />
                  <button type="submit">Submit</button>
                </div>
                <p>{passwordError}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Password
