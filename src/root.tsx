import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData, } from '@remix-run/react'
import type { ReactNode } from 'react'
import { Header } from '~/common/components'
import { getCurrentUser } from '~/common/utils'
import { getUserSession } from '~/session.server'
import styles from '~/styles/build/index.css'
import type { TTheme } from '~/types'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inter'},
  {rel: 'stylesheet', href: styles}
]

export const loader: LoaderFunction = async ({request}) => {
  const session = await getUserSession(request)
  const {user, headers} = await getCurrentUser(session)

  return json({
    user,
    theme: session.get('theme') ?? '',
  }, {
    headers
  })
}

export default () => {
  const data = useLoaderData()
  console.log(data)
  return (
    <Document theme={data?.theme}>
      <Outlet />
    </Document>
  )
}

interface IDocumentProps {
  theme?: TTheme
  title?: string
  children: ReactNode
}

const Document = ({title, theme, children}: IDocumentProps) => (
  <html lang='en' className={theme}>
    <head>
      <Meta />
      <Links />
      {title ? <title>{title}</title> : null}
      <title>To Do App</title>
    </head>
    <body>
      <Header />
      <main>
        {children}
      </main>
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
)

export const ErrorBoundary = ({error}: {error: Error}) => {
  console.error(error)
  return (
    <Document title='Critical error'>
      <h1>Some critical error</h1>
      <hr />
      <p>{error.message}</p>
    </Document>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()
  if (![400, 401, 403, 404].includes(caught.status)) throw new Error(caught.data || caught.statusText)

  return (
    <Document title={caught.statusText}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      <hr />
      <p>
        {caught.data}
      </p>
    </Document>
  )
}
