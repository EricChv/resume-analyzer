import { Link } from 'react-router'
import navLogo from './navLogo.png'

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-neutral-950 py-4 shadow-lg">
      <div className="flex justify-between items-center  px-4 sm:px-8 lg:px-16">
        <Link to="/" className="flex items-baseline gap-1">
        {/* "relative top-[2.5px]" pushes it down a bit */}
          <p className="text-2xl font-bold text-white">Sheets</p>
        </Link>

        <Link to="/upload" className="primary-button">
          Upload Resume
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
