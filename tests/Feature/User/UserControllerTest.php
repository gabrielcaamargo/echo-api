<?php

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
