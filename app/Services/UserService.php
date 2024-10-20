<?php

namespace App\Services;

use App\DTO\User\CreateUserDTO;
use App\Repositories\User\UserRepositoryInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\BaseResponse;
use Exception;

class UserService
{
  use BaseResponse;

  private UserRepositoryInterface $userRepository;

  public function __construct(UserRepositoryInterface $userRepository)
  {
    $this->userRepository = $userRepository;
  }

  public function createUser(CreateUserDTO $createUserDTO)
  {
    try {
      $user =  $this->userRepository->createUser($createUserDTO);

      return $this->successResponse($user, 'User created', Response::HTTP_CREATED);
    } catch (Exception $e) {
      return $this->errorResponse($e->getMessage());
    }
  }
}
