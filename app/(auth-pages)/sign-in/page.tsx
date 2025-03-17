import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-bold text-white mb-2">登录</h1>
      <p className="text-sm text-white/80 mb-6">
        还没有账号？{" "}
        <Link className="text-white font-medium underline" href="/sign-up">
          立即注册
        </Link>
      </p>
      <div className="flex flex-col gap-3">
        <Label htmlFor="email" className="text-white">邮箱</Label>
        <Input 
          name="email" 
          placeholder="你的邮箱地址" 
          required 
          className="bg-white/20 text-white placeholder-white/50 border-white/30 focus-visible:ring-white/30"
        />
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-white">密码</Label>
          <Link
            className="text-xs text-white/80 underline"
            href="/forgot-password"
          >
            忘记密码？
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="你的密码"
          required
          className="bg-white/20 text-white placeholder-white/50 border-white/30 focus-visible:ring-white/30 mb-4"
        />
        <SubmitButton 
          pendingText="登录中..." 
          formAction={signInAction}
          className="bg-white/20 hover:bg-white/30 text-white"
        >
          登录
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
