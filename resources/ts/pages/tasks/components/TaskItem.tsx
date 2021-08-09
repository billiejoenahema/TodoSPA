import React, { RefCallback, useState } from 'react'
import { Task } from '../../../types/Task'
import { useUpdateDoneTask, useUpdateTask, useDeleteTask } from '../../../queries/TaskQuery'
import { toast } from 'react-toastify'

type Props = {
  task: Task
}

const TaskItem: React.VFC<Props> = React.memo(({ task }) => {
  const updateDoneTask = useUpdateDoneTask()
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()

  const [editTitle, setEditTitle] = useState<string | undefined>(undefined)

  const handleToggleEdit = () => {
    setEditTitle(task.title)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }

  const handleOnKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Escape', 'Tab'].includes(e.key)) {
      setEditTitle(undefined)
    }
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    // titleに何も入力されていないときは処理を終了する
    if (editTitle === undefined) {
      toast.error('タイトルを入力してください')
      return
    }

    const newTask = { ...task }
    newTask.title = editTitle
    updateTask.mutate({
      id: task.id,
      task: newTask
    })

    setEditTitle(undefined)
  }

  const itemInput = () => {
    return (
      <>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            className="input"
            defaultValue={editTitle}
            onChange={handleInputChange}
            onKeyDown={handleOnKey}
          />
        </form>
        <button className="btn" onClick={(e) => handleUpdate(e)}>更新</button>
      </>
    )
  }

  const itemText = () => {
    return (
      <>
        <div onClick={handleToggleEdit}>
          <span>{task.title}</span>
        </div>
        <button
          className="btn is-delete"
          onClick={() => deleteTask.mutate(task.id)}>
          削除
        </button>
      </>
    )
  }

  return (
    <li className={task.is_done ? 'done' : ''}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox-input"
          onClick={() => updateDoneTask.mutate(task)}
        />
      </label>
      {editTitle === undefined ? itemText() : itemInput()}
    </li>
  )
})

export default TaskItem
