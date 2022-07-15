import type { LoaderArgs } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react'
import { AddButton, Checkbox } from '~/common/components'
import { db } from '~/db.server'
import { getUserSession } from '~/session.server'

export const loader = async ({request}: LoaderArgs) => {
  const session = await getUserSession(request)
  const userId = session.get('userId')
  const tasks = await db.task.findMany({
    where: {userId},
    include: {
      category: {
        select: {name: true}
      }
    }
  })
  return tasks
}

export default () => {
  const tasks = useLoaderData<typeof loader>()
  const dateString = new Date().toLocaleString('en', {month: 'long', day: 'numeric', year: 'numeric'})

  return (
    <>
      <div className='heading'>
        <h1>{dateString}</h1>
        <span className='sub-color small'></span>
      </div>
      <div className='tasks'>
        <div className='task-group'>
          <h2>Incomplete</h2>
          <ul className='task-list'>
            {tasks.map(task => (
              <li className='task'>
                <Form method='patch'>
                  <Checkbox />
                </Form>
                <div className='task__description'>
                  <Link to={`/todos/${task.id}`}>{task.title}</Link>
                  <span className='task__category'>{task.category.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='task-group'>
          <h2>Complete</h2>
          <ul className='task-list'>

          </ul>
        </div>
      </div>
      <AddButton />
    </>
  )
}
