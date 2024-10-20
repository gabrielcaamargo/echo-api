<?php

namespace App\Repositories\User;

use App\DTO\User\CreateUserDTO;
use App\Models\User;

interface UserRepositoryInterface
{
    public function createUser(CreateUserDTO $createUserDTO): User;
}
