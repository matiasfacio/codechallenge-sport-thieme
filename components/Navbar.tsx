import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <Link href="/" passHref>
            <li>
              <a>Home</a>
            </li>
          </Link>
          <Link href="/coachesadministration" passHref>
            <li>
              <a>Coaches Administration</a>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
