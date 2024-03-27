interface PasswordProps {
  password: string
  setPassword: (password: string) => void
  handlePasswordSubmit: (event: React.FormEvent) => void
}

const Password = (props: PasswordProps) => {
  const { password, setPassword, handlePasswordSubmit } = props
  return (
    <div className="preview-pass">
      <div className="grid-container">
        <div className="grid-row grid-gap-3">
          <div className="grid-col-12">
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="knock knock..."
              />
              <button type="submit">👁️</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Password
