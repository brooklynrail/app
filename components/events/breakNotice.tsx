"use client"

const BreakNotice = () => {
  return (
    <div className="py-12 hidden">
      <div className="max-w-screen-tablet mx-auto space-y-3">
        <div className="text-center text-lg">
          <p>❄️</p>
          <h2>The New Social Environment is on break</h2>
        </div>
        <p className="text-center">
          We look forward to seeing you <strong>Monday, January 13, 2025</strong> for more live dialogues with artists,
          filmmakers, writers, and poets. In the meantime, dive into our archive.
        </p>
        <p className="text-center">
          <a href="https://brooklynrail.org/newsletter" title="Sign up for the newsletter">
            <button
              className="bg-zinc-800 dark:bg-slate-100 text-slate-100 dark:text-zinc-800 px-3 py-1 rounded-md"
              type="button"
              name="register"
            >
              <span>Get notified</span>
            </button>
          </a>
        </p>
      </div>
    </div>
  )
}

export default BreakNotice
