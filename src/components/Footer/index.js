import React from 'react';
import { FaGithubAlt, FaLinkedin } from 'react-icons/fa';

import { Footer } from './styled';

export default function Footerr() {
  return (
    <Footer>
      <div>
        <p>Gabriel Rabelo</p>
        <a
          className="icon"
          rel="nofollow noreferrer"
          target="_blank"
          href="https://github.com/Gabriel-Rabeloo"
        >
          <FaGithubAlt size={24} />
        </a>
        <a
          className="icon"
          rel="nofollow noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/gabriel-rabelo-bb14401b8/"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </Footer>
  );
}
