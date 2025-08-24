<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{

    /**
     * Task一覧
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */

    public function index()
    {
        return Task::where('user_id','=', Auth::id())->orderByDesc('id')->get();
    }

    /**
     * is_doneの更新
     * @param  TaskRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TaskRequest $request)
    {
        $request->merge([
          'user_id' => Auth::id()
        ]);

        $task = Task::create($request->all());

        return $task
        ? response()->json($task, 201)
        : response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TaskRequest $request, Task $task)
    {
        $task->title = $request->title;

        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Task $task)
    {
        return $task->delete()
            ? response()->json($task)
            : response()->json([], 500);
    }

    public function update_done(Task $task, Request $request)
    {
        $task->is_done = $request->is_done;

        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }
}