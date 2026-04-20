<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_and_fetch_authenticated_profile(): void
    {
        $user = User::factory()->create([
            'password' => 'password',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $loginResponse
            ->assertOk()
            ->assertJsonStructure([
                'token',
                'token_type',
                'expires_in',
                'user' => ['id', 'name', 'email', 'created_at', 'updated_at'],
            ]);

        $token = $loginResponse->json('token');

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('data.email', $user->email);
    }

    public function test_user_can_logout(): void
    {
        $user = User::factory()->create([
            'password' => 'password',
        ]);

        $token = auth('api')->login($user);

        $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/auth/logout')
            ->assertNoContent();
    }
}
