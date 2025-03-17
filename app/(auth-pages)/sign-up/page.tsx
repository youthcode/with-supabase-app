import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64">
        <h1 className="text-2xl font-bold text-white mb-2">注册</h1>
        <p className="text-sm text-white/80 mb-6">
          已有账号？{" "}
          <Link className="text-white font-medium underline" href="/sign-in">
            立即登录
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
          <Label htmlFor="password" className="text-white">密码</Label>
          <Input
            type="password"
            name="password"
            placeholder="设置密码（至少6位）"
            minLength={6}
            required
            className="bg-white/20 text-white placeholder-white/50 border-white/30 focus-visible:ring-white/30 mb-4"
          />
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="注册中..."
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            注册
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
