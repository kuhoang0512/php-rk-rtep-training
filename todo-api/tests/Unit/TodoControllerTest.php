<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Laravel\Passport\Passport;

class TodoControllerTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_index()
    {
        // case unauthorized
        $firstResponse = $this->call('GET', '/api/user/todos');
        $firstResponse->assertStatus(403)
            ->assertJson(['status'=>"Unauthorized access"]);

        // case authorized
        $user = User::where('email', 'test@test.com')->first();
        Passport::actingAs(
            $user
        );
    
        $secondResponse = $this->call('GET', '/api/user/todos');

        // check response OK
        $secondResponse->assertStatus(200)
            ->assertJson(['status'=>"success"]);
    }
}
