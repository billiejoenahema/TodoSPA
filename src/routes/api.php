<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'LoginController@login');
Route::post('logout', 'LoginController@logout');

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::apiResource('tasks', 'TaskController')->middleware('can:checkUser, App\Models\User');
    Route::patch('tasks/update-done/{task}', 'TaskController@update_done');
    Route::get('user', function (Request $request) {
        return $request->user();
    });
});