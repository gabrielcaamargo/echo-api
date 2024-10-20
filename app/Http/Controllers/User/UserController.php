<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\CreateUserRequest;
use App\Services\UserService;
use App\Traits\BaseResponse;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{

    use BaseResponse;

    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function createUser(CreateUserRequest $request)
    {
        // TODO: Check if user already exists before creating it
        return $this->successResponse(["name" => "John Doe"], "User created successfully", Response::HTTP_CREATED);
    }
}
