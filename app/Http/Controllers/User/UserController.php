<?php

namespace App\Http\Controllers\User;

use App\DTO\User\CreateUserDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Services\UserService;


class UserController extends Controller
{

    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function createUser(CreateUserRequest $request)
    {
        $createUserDTO = new CreateUserDTO(
            $request->name,
            $request->email,
            $request->username
        );
        return $this->userService->createUser($createUserDTO);
    }
}
