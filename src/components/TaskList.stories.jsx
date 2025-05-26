import { Provider } from 'react-redux'
import * as TaskStories from './Task.stories'
import TaskList from './TaskList'
import { configureStore } from '@reduxjs/toolkit'
import { TasksSlice } from '../lib/store'

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
}

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task6' },
  ],
  status: 'idle',
  error: null,
}

const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: TasksSlice.reducer,
      },
      preloadedState: {
        taskbox: taskboxState,
      },
    })}
  >
    {children}
  </Provider>
)

export const Default = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
  ],
}

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...MockedState.tasks.slice(0, 5),
        { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
      ]
      return (
        <Mockstore taskboxState={{ ...MockedState, tasks: pinnedTasks }}>
          {story()}
        </Mockstore>
      )
    },
  ],
}

export const Loading = {
  decorators: [
    (story) => {
      return (
        <Mockstore taskboxState={{ ...MockedState, status: 'loading' }}>
          {story()}
        </Mockstore>
      )
    },
  ],
}
export const Empty = {
  decorators: [
    (story) => {
      return (
        <Mockstore taskboxState={{ ...MockedState, tasks: [] }}>
          {story()}
        </Mockstore>
      )
    },
  ],
}
