import React from 'react';

// A simple SVG logo placeholder, as actual logo is an image.
const TraeLogo = () => (
  <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="24" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#1F2937">Trae</text>
  </svg>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Trae</span>
                <TraeLogo />
              </a>
            </div>
            {/* Mobile menu button (hidden for now, can be added later) */}
            {/* <div className="-mr-2 -my-2 md:hidden">
              <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div> */}
            <nav className="hidden md:flex space-x-10">
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Soluciones
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Industrias
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Somos Trae
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Blog
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contacto
              </a>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                Solicita una demo
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              {/* This is a common pattern for diagonal cuts, not perfectly matching trae.ai but gives a similar modern feel */}
              <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-50 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">La IA que optimiza</span>{' '}
                    <span className="block text-blue-600 xl:inline">procesos en la</span> <br className="hidden sm:block"/>
                    <span className="block text-blue-600 xl:inline">industria pesada</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Menos costos, mayor productividad y eficiencia usando data que ya tienes. Descubre cómo Trae puede transformar tu operación.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                        Solicita una demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* The image part of the hero section would go here, for now, it's just a colored background */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
             {/* Placeholder for image - can be replaced with <img /> tag if an image URL is available */}
            <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gray-200" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
