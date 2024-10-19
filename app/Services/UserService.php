<?php

namespace App\Services;
use App\DTO\User\CreateUserDTO;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;

class UserService
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }
  public function createUser(CreateUserDTO $createUserDTO) {
    return $this->userRepository->createUser($createUserDTO);
  }
}
