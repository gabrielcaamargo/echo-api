<?php

use App\Models\User;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\DTO\User\CreateUserDTO;
use App\Repositories\User\UserRepository;
use Illuminate\Foundation\Testing\WithFaker;

uses(RefreshDatabase::class, WithFaker::class);

beforeEach(function () {
    $this->userRepository = new UserRepository();
});

describe('UserRepository', function () {
    describe('createUser', function () {
        it('should create a user', function () {
            $createUserDTO = new CreateUserDTO(
                $this->faker->name,
                $this->faker->email,
                $this->faker->userName
            );

            $user = $this->userRepository->createUser($createUserDTO);

            expect($user)->toBeInstanceOf(User::class);
            expect($user->name)->toBe($createUserDTO->name);
            expect($user->email)->toBe($createUserDTO->email);
            expect($user->username)->toBe($createUserDTO->username);

            $this->assertDatabaseHas('users', [
                'email' => $createUserDTO->email,
                'username' => $createUserDTO->username,
                'name' => $createUserDTO->name,
            ]);
        });
    });

    describe('getUserByEmailOrUsername', function () {
        it('should find a user', function () {
            $user = User::factory()->create();

            $foundUser = $this->userRepository->getUserByEmailOrUsername($user->email, $user->username);

            expect($foundUser)->toBeInstanceOf(User::class);
            expect($foundUser->name)->toBe($user->name);
            expect($foundUser->email)->toBe($user->email);
            expect($foundUser->username)->toBe($user->username);
        });

        it('should return null if any user has been found', function () {
            $foundUser = $this->userRepository->getUserByEmailOrUsername($this->faker->email, $this->faker->userName);
            expect($foundUser)->toBeNull();
        });
    });
});
