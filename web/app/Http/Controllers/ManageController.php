<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ManageController extends Controller {

    public function addUser(Request $request)
    {
        /*
        if ($request->missing('email') or $request->missing('password')) {
            return response()->json([
                    'error_message' => 'Invalid authenticate request',
                    'code' => 400
            ]);
        }
        */
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
            //return redirect()->route('home');
        }

        //return back()->withErrors([
        //    'email' => 'The provided credentials do not match our records.',
        //])->onlyInput('email');
        return back()->with('status', 'User created.');
    }
}
