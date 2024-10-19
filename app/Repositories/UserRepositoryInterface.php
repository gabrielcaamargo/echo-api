<?php

namespace App\Repositories;

use App\Models\User;
use App\DTO\User\CreateUserDTO;

interface UserRepositoryInterface
{
    public function createUser(CreateUserDTO $createUserDTO): User;
}
