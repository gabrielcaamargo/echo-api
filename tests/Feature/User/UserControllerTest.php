<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

uses(RefreshDatabase::class, WithFaker::class);

test('it should create a user', function () {
    $response = $this->postJson('/api/users', [
        'email' => $this->faker->email,
        'username' => $this->faker->username,
        'name' => $this->faker->name,
    ]);

    $response->assertStatus(201)->assertJsonStructure([
        'data',
        'success',
        'message'
    ]);

    $this->assertDatabaseHas('users', [
        'email' => $response['data']['email'],
        'username' => $response['data']['username'],
        'name' => $response['data']['name'],
    ]);
});

test('should not create a user with a already used username or email', function () {
    // Create a user using userFactory
    $user = User::factory()->create();

    // Tries to create a new user with the user's generated from userFactory data
    $response = $this->postJson('/api/users', [
        'email' => $user->email,
        'username' => $user->username,
        'name' => $this->faker->name,
    ]);

    $response->assertStatus(409)->assertJsonStructure([
        'data',
        'success',
        'message'
    ]);
});
