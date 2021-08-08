import { useQuery, useMutation, useQueryClient } from 'react-query'
import * as api from '../api/TaskAPI'
import { toast } from 'react-toastify'

const useTasks = () => {
  return (
    useQuery('tasks', () => api.getTasks())
  )
}
const useUpdateDoneTask = () => {
  const queryClient = useQueryClient()
  return useMutation(api.updateDoneTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    },
    onError: () => {
      toast.error('更新に失敗しました')
    }
  }
  )
}

const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation(api.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
      toast.success('登録に成功しました')
    },
    onError: () => {
      toast.error('登録に失敗しました')
    }
  }
  )
}

export {
  useTasks,
  useUpdateDoneTask,
  useCreateTask
}
