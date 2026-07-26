import { Link } from 'react-router'
import navLogo from './navLogo.png'

const Navbar = () => {
  return (
    <nav className="bg-[#FE5D4C] py-4 shadow-lg">
      <div className="flex justify-between items-center  px-4 sm:px-8 lg:px-16">
        <Link to="/" className="flex items-baseline gap-1">
        {/* "relative top-[2.5px]" pushes it down a bit */}
          <img src={navLogo} alt="Sheets logo" className="h-6 w-6 object-contain relative top-[2.5px]" />
          <p className="text-2xl font-bold">Sheets</p>
        </Link>

        <Link to="/upload" className="primary-button">
          Upload Resume
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
