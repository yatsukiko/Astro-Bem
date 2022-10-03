<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserManageController extends Controller {

    public function add(Request $request)
    {
        if ($request->missing('name') or $request->input('name') == '' ) {
            return back()->with('newUserStatus', 'Name is required, please input user\'s name.');
        }
        if ($request->missing('email') or $request->input('email') == '' ) {
            return back()->with('newUserStatus', 'Email not provided, please input users\'s email.');
        }
        if ($request->missing('password') or $request->input('password') == '' ) {
            return back()->with('newUserStatus', 'Password not provided, please input users\'s password.');
        }
        
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), 
        ]);
        
        //DB::table('users')->insert(['name' => ‘admin’, 'email' => 'admin@email.com', 'password' => Hash::make('Admin@123'),]);
        //DB::table('users')->insert(['name'=>'Test','email'=>'test@tes','password'=>Hash::make('123')]);
        return back()->with('newUserStatus', 'User created.');
    }
}
