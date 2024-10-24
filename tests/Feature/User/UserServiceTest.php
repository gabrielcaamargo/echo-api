<?php

use App\Services\UserService;
use App\Repositories\User\UserRepositoryInterface;
use App\DTO\User\CreateUserDTO;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Mockery;
use Illuminate\Foundation\Testing\WithFaker;

uses(RefreshDatabase::class, WithFaker::class);

beforeEach(function () {
    /** @var UserRepositoryInterface $userRepository */
    $this->userRepository = Mockery::mock(UserRepositoryInterface::class);
    $this->userService = new UserService($this->userRepository);
});

test('it should create a new user', function () {
    $user = User::factory()->create();

    $createUserDTO = new CreateUserDTO(
        $user->name,
        $user->email,
        $user->username
    );

    $this->userRepository->shouldReceive('getUserByEmailOrUsername')->with($createUserDTO->email, $createUserDTO->username)->andReturn(null);

    $this->userRepository->shouldReceive('createUser')->with($createUserDTO)->andReturn($user);

    $response = $this->userService->createUser($createUserDTO)->getData(true);
    expect($response["success"])->toBe(true);
    expect($response["data"])->toBe($user->toArray());
    expect($response["message"])->toBe("User created");
});
