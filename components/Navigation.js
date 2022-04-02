import Link from "next/link";
import { useEffect, useState } from "react";
import { useIsAuth } from "../hooks/Auth";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false)
  useEffect(() => {
    useIsAuth((is) => {
      setIsAuth(is)
      console.log(isAuth);
    })
  })

  const [yourProfileData, setYourProfileData] = useState({})
  if (typeof window !== 'undefined') {
     }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="justify-content-around container">

        <Link href={'/'}>
          <a className="navbar-brand" >
            Meta<i style={{ color: "skyblue" }}>!</i>
          </a>
        </Link>

        <div className="d-flex">
          {!isAuth &&
            <>
              <Link href="/auth/login">
                <button className="btn btn-primary btn-sm"> Войти </button>
              </Link>
              <Link href={'/auth/registration'}>
                <a className="nav-link"> Зарегистрироваться </a>
              </Link>
            </>
          }
          {isAuth &&
            <>
              Welcome, {yourProfileData.name}
            </>
          }
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
