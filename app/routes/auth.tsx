import { useEffect } from 'react';
import { usePuterStore } from '~/lib/puter'
import { useLocation, useNavigate } from 'react-router'
export const meta = () => ([
  { title: "Sheets | Auth"},
  {name: "description", content: "Log into your account"},
])

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate()


  // redirection if user is already logged in
  useEffect( () => {
    //redirect to next if logged in
    if(auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]) 

  return (
    <div>
      <main className="bg-gradient text-white min-h-screen flex items-center justify-center">
        <div className='border border-white/10 shadow-lg rounded-2xl'>
          <section className='flex flex-col gap-8 bg-neutral-950 rounded-2xl p-10'>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h1>Welcome</h1>
              <h2>Log In</h2>
            </div>
            <div>
              {isLoading ? (
                <button className="auth-button animate-pulse">
                  <p>Signing In...</p>
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
