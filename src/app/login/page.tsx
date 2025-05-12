'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/Authcontext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserCredentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [user, setUserState] = useState<UserCredentials>({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok && data.Success) {
        console.log('[Login] 🎉', data);
        setUser({ username: data.data.username, email: data.data.email });
        router.push('/profile');
      } else {
        console.error('[Login] ❌', data.error);
        alert(data.error || 'Login failed.');
      }
    } catch (err) {
      console.error('[Login] ❌ Unexpected Error', err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            {loading ? 'Logging in...' : 'Login'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={(e) => setUserState({ ...user, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={user.password}
              onChange={(e) => setUserState({ ...user, password: e.target.value })}
              required
            />
          </div>

          <Button onClick={onLogin} disabled={buttonDisabled} className="w-full">
            Login
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline text-primary">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
