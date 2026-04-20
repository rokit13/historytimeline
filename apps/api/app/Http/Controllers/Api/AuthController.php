<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }

        return $this->tokenResponse($token);
    }

    public function logout(): JsonResponse
    {
        Auth::guard('api')->logout();

        return response()->json(status: 204);
    }

    public function me(): UserResource
    {
        return new UserResource(Auth::guard('api')->user());
    }

    private function tokenResponse(string $token): JsonResponse
    {
        $guard = Auth::guard('api');

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $guard->factory()->getTTL() * 60,
            'user' => new UserResource($guard->user()),
        ]);
    }
}
