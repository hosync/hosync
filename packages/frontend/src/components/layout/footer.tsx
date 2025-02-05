'use client'

import { Link } from '@/components/ui/link'

const currentYear = new Date().getFullYear()

const Footer: React.FC = () => {
  return (
    <footer
      data-component="Footer"
      className="m-auto bg-black text-gray-300 py-8 flex flex-col items-center pr-6 md:justify-between md:flex-row"
    >
      <ul className="flex-col space-y-4 space-x-0 justify-center items-center ml-8 mt-8 md:mt-0 flex md:flex-row md:space-y-0 md:space-x-4 lg:flex-row lg:space-y-0 lg:space-x-6">
        <li className="hover:text-gray-400 text-center">
          <a href="#" className="text-sm">
            About Us
          </a>
        </li>
        <li className="hover:text-gray-400 text-center">
          <a href="#" className="text-sm">
            Pricing
          </a>
        </li>
        <li className="hover:text-gray-400 text-center">
          <Link href="/about" className="text-sm">
            Careers
          </Link>
        </li>
        <li className="hover:text-gray-400 text-center">
          <a href="#" className="text-sm">
            Blog
          </a>
        </li>
        <li className="hover:text-gray-400 text-center">
          <a href="#" className="text-sm">
            Contact Us
          </a>
        </li>
      </ul>

      <div className="flex justify-center text-sm items-center w-full ml-8 md:mt-0 md:w-auto md:justify-end lg:justify-end mt-10">
        © {currentYear} - hosync.com
      </div>
    </footer>
  )
}

export default Footer
