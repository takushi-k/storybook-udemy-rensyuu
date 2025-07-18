import { Provider } from 'react-redux'
import InboxScreen from './InboxScreen'
import store from '../lib/store'
import { http, HttpResponse } from 'msw'
import { MockedState } from './TaskList.stories'

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
}

export const Default = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return HttpResponse.json(MockedState.tasks)
        }),
      ],
    },
  },
}

export const Error = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
          return HttpResponse.json(null, { status: 403 })
        }),
      ],
    },
  },
}
