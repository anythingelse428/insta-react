import '../styles/global.css'
import Navigation from '../components/Navigation'
import ContentModal from '../components/ContentModal'
import Head from 'next/head'
import { useEffect } from 'react'
import { useAuth } from '../hooks/Auth'
import { SSRProvider } from 'react-bootstrap'
export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const Api = useAuth()
        Api.install(5, {
            routerPush: (routeName, routeReason) => {
                console.log(routeName, routeReason);
            },
            storeCommit: (what, payload) => {
                console.log(what, payload);
            }
        })
        Api.mounted()
    }, [])
    return (
        <>
            <SSRProvider>

                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <meta name="description" content="Web site created using create-react-app" />
                    <link rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                        crossOrigin="anonymous" />
                    <title>React App</title>
                </Head>
                <Navigation />
                <ContentModal />
                <Component {...pageProps} />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossOrigin="anonymous"></script>

            </SSRProvider>
        </>)
}