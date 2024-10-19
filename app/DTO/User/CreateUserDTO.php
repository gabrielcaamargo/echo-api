<?php

namespace App\DTO\User;

class CreateUserDTO
{
    public string $name;
    public string $email;
    public string $username;

    public function __construct(string $name, string $email, string $username)
    {
        $this->name = $name;
        $this->email = $email;
        $this->username = $username;
    }
}
