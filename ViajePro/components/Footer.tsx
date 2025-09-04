
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#1A4488] mt-8 py-4">
      <div className="container mx-auto px-4 md:px-8 text-center text-sm text-white">
        <p>&copy; {currentYear} Ineco. Todos los derechos reservados.</p>
        <p>Pº de La Habana, 138, 28036 Madrid, España</p>
      </div>
    </footer>
  );
};

export default Footer;
