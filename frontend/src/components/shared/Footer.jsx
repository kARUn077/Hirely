import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-[#6C4F2A] py-8 bg-[#F5E4C7]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
  <h2 className="text-xl font-bold text-[#4A2C20]">Hogwarts Hiring Hall</h2>
  <p className="text-sm text-[#6C4F2A]">© 2025 Hogwarts Hiring Hall. All enchantments reserved.</p>
  {/* <p className="text-xs italic text-[#8B6F47]">Crafted with spells, scrolls & a pinch of Felix Felicis ✨</p> */}

  
</div>


          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.facebook.com/karun.poddar.1/" className="hover:text-[#4A2C20]" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
            </a>
            <a href="https://www.instagram.com/me_kirtan_17/" className="hover:text-[#4A2C20]" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.343 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.343-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.343-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.77.13 4.596.396 3.515 1.477 2.435 2.557 2.169 3.73 2.111 5.013.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.058 1.283.324 2.456 1.404 3.537 1.081 1.08 2.254 1.346 3.537 1.404C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.283-.058 2.456-.324 3.537-1.404 1.08-1.081 1.346-2.254 1.404-3.537.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.058-1.283-.324-2.456-1.404-3.537C19.405.396 18.232.13 16.948.072 15.668.014 15.259 0 12 0zm0 5.838A6.162 6.162 0 105.838 12 6.17 6.17 0 0012 5.838zm0 10.162A4 4 0 1116 12a4 4 0 01-4 4zm6.406-11.845a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/karun-poddar-515b23264/" className="hover:text-[#4A2C20]" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
