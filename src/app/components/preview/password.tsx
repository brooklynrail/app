import Link from "next/link"

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
    <div className="bg-white h-screen w-screen">
      <div className="grid grid-cols-4 tablet-lg:grid-cols-12 gap-3">
        <div className="col-span-4 tablet-lg:col-span-12">
          <form onSubmit={handlePasswordSubmit}>
            <div className="flex flex-col justify-center items-center h-screen space-y-3">
              <div className="text-2xl flex space-x-3">
                <input
                  className={`py-1 px-2 border border-slate-400 rounded-sm ${passwordError ? "usa-input--error" : ""}`}
                  id="input-type-text"
                  type="password"
                  value={password}
                  onChange={(event) => handlePasswordChange(event)}
                  placeholder="password..."
                />
                <button
                  className="bg-indigo-600 py-2 px-3 uppercase text-md rounded-sm text-white hover:underline underline-offset-2"
                  type="submit"
                >
                  Submit
                </button>
              </div>
              <p>{passwordError}</p>
              <div className="pt-3 text-center space-y-3">
                <p>“Oh, you should never, never, doubt what nobody is sure about.”</p>
                <p>
                  <span className="font-medium">This is the PREVIEW site for the Brooklyn Rail.</span>
                  <br /> Go to{" "}
                  <Link className="text-blue-600" href={`https://brooklynrail.org`}>
                    https://brooklynrail.org
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Password
