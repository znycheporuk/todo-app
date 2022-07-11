import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader: LoaderFunction = () => {
  return 'Hello, let\'s do this app!'
}

export default () => {
  const str = useLoaderData()
  return (
    <div>This string was returned from the loader function: "{str}"</div>
  )
}
