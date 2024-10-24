<?php

namespace App\Repositories\User;

use App\DTO\User\CreateUserDTO;
use App\Models\User;

interface UserRepositoryInterface
{
    public function createUser(CreateUserDTO $createUserDTO): User;
    public function getUserByEmailOrUsername(string $email, string $username): ?User;
}
