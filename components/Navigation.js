import Link from "next/link";

function Navigation() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="justify-content-around container">

        <Link href={'/'}>
          <a className="navbar-brand" >
            Meta<i style={{ color: "skyblue" }}>!</i>
          </a>
        </Link>

        <div className="d-flex">
          <Link href="/auth/login">
            <button className="btn btn-primary btn-sm"> Войти </button>
          </Link>
          <Link href={'/auth/registration'}>
            <a className="nav-link"> Зарегистрироваться </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navigation;
