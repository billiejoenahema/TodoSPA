<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;
use App\Models\User;

class TaskTest extends TestCase
{
  use RefreshDatabase;

    public function setUp() :void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /**
     * @test
     */
    public function get_tasks()
    {
        $tasks = Task::factory()->count(10)->create();
        $response = $this->getJson('api/tasks');

        $response
            ->assertStatus(200)
            ->assertJsonCount($tasks->count());
    }

    /**
     * @test
     */
    public function create_task()
    {
        $data = ['title' => 'テスト投稿'];

        $response = $this->postJson("api/tasks", $data);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($data);
    }

    /**
     * @test
     */
    public function update_task()
    {
        $task = Task::factory()->create();
        $task->title = '書き換え';

        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());
        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }

    /**
     * @test
     */
    public function delete_task()
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();
        $response = $this->getJson("api/tasks");
        $response->assertJsonCount($tasks->count() -1);
    }

    /**
     * @test
     */
    public function prevent_null_title()
    {
        $data = ['title' => ''];

        $response = $this->postJson("api/tasks", $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
              'title' => 'タイトルは、必ず指定してください。'
            ]);
    }

    /**
     * @test
     */
    public function prevent_over_character_limit()
    {
        $data = ['title' => str_repeat('あ', 256)];

        $response = $this->postJson("api/tasks", $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
              'title' => 'タイトルは、255文字以下にしてください。'
            ]);
    }
}
