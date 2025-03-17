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
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm">
          <User className="w-3.5 h-3.5" />
          <span className="max-w-[120px] truncate">{user.email}</span>
        </div>
        <form action={signOutAction}>
          <button 
            type="submit"
            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            退出
          </button>
        </form>
      </div>
    );
  }

  // 用户未登录，显示登录和注册按钮
  return (
    <div className="flex gap-2">
      <Link href="/sign-in" className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm">
        <LogIn className="w-3.5 h-3.5" />
        登录
      </Link>
      <Link href="/sign-up" className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 text-sm">
        <UserPlus className="w-3.5 h-3.5" />
        注册
      </Link>
    </div>
  );
} 