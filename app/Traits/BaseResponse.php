<?php

namespace App\Traits;

use Symfony\Component\HttpFoundation\Response;

trait BaseResponse
{

    /**
     * Standardize success response object
     *
     * @param  mixed $data
     * @param  mixed $message
     * @param  mixed $code
     * @return void
     */
    protected function successResponse($data, $message = 'Success', $code = Response::HTTP_OK)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    /**
     * Standardize error response object
     *
     * @param  mixed $message
     * @param  mixed $code
     * @return void
     */
    protected function errorResponse($message = 'Bad request', $code = Response::HTTP_BAD_REQUEST)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null
        ], $code);
    }
}
