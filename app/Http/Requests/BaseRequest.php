<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;


class BaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();
        $sanitizedErrors = [];

        foreach ($errors as $key => $value) {
            $sanitizedErrors[$key] = [
                "messages" => $value
            ];
        }


        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Bad request',
            'data'      => $sanitizedErrors
        ], 400));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
