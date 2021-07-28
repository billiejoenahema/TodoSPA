<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskTest extends TestCase
{
  use RefreshDatabase;

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

        $response = $this->postJson('api/tasks', $data);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($data);
    }
}
