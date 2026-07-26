import { usePuterStore } from '~/lib/puter'

export const meta = () => ([
  { title: "Sheets | Auth"},
  {name: "description", content: "Log into your account"},
])

const auth = () => {
  const { isLoading, auth } = usePuterStore();

  return (
    <div>
      <main className="bg-gradient text-black min-h-screen flex items-center justify-center">
        <div className='border border-gray-300 shadow-lg rounded-2xl'>
          <section className='flex flex-col gap-8 bg-white rounded-2xl p-10'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h1>Welcome</h1>
              <h2>Log In</h2>
            </div>
            <div>
              {isLoading ? (
                <button className="auth-button animate-pulse">
                  <p>Logging In...</p>
                </button>
              // If not loading
              ): (
                <>
                  {auth.isAuthenticated ? (
                    <button className="auth-button" onClick={auth.signOut}>
                      Log Out
                    </button>
                  // If not authenticated
                  ) : (
                    <button className="auth-button" onClick={auth.signIn}>
                      <p>Log In</p>
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default auth
