<div class="side-menu">
    <div>
        <p class="aside-name">{{ $user->name }}</p>
        <p class="aside-tab">Dashboard</p>
    </div>
    <a class="aside-link" href="{{ route('dashboard') }}">Dashboard</a>
    <a class="aside-link" href="{{ route('accounts') }}">Accounts</a>
</div>
