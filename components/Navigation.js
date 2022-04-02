import { Button, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIsAuth, useUser, Api } from "../hooks/Auth";

function Navigation() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState(false)
  const [yourProfileData, setYourProfileData] = useState({})

  useEffect(() => {
    useIsAuth((is) => {
      setIsAuth(is)
    })
    useUser(user => setYourProfileData(user))

  })
  const logout = () => {
    Api.logout()
    router.push('/')
  }
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

        <div className="nav-item d-flex justify-content-center align-items-center">
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
            <div className="nav-item">
              <span className="mx-2">{yourProfileData.name} </span><Button  onClick={logout}>Выйти</Button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
