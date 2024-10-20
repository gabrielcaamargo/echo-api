<?php

namespace App\Repositories\User;

use App\DTO\User\CreateUserDTO;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function createUser(CreateUserDTO $createUserDTO): User
    {
        $user = new User();
        $user->name = $createUserDTO->name;
        $user->email = $createUserDTO->email;
        $user->username = $createUserDTO->username;
        $user->save();

        return $user;
    }
}
