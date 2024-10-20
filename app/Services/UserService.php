<?php

namespace App\Services;
use App\DTO\User\CreateUserDTO;
use App\Repositories\User\UserRepositoryInterface;
use Symfony\Component\HttpFoundation\Response;

class UserService
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository) {
        $this->userRepository = $userRepository;
    }
  public function createUser(CreateUserDTO $createUserDTO) {
    $user =  $this->userRepository->createUser($createUserDTO);

    return response()->json([
        'status' => Response::HTTP_CREATED,
        'data' => $user
    ]);
  }
}
