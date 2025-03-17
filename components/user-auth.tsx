'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LogIn, UserPlus, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { signOutAction } from '@/app/actions';

export default function UserAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      // 设置监听器以处理认证状态变化
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    getUser();
  }, [supabase]);

  if (loading) {
    return <div className="flex gap-3"></div>; // 加载时不显示任何内容
  }

  if (user) {
    // 用户已登录，显示用户信息和退出按钮
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-xl">
          <User className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
        <form action={signOutAction}>
          <button 
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
        </form>
      </div>
    );
  }

  // 用户未登录，显示登录和注册按钮
  return (
    <div className="flex gap-3">
      <Link href="/sign-in" className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200">
        <LogIn className="w-4 h-4" />
        登录
      </Link>
      <Link href="/sign-up" className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200">
        <UserPlus className="w-4 h-4" />
        注册
      </Link>
    </div>
  );
} 