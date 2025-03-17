import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">重置密码</h1>
          <p className="text-sm text-white/80 mb-6">
            已有账号？{" "}
            <Link className="text-white font-medium underline" href="/sign-in">
              立即登录
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email" className="text-white">邮箱</Label>
          <Input 
            name="email" 
            placeholder="你的邮箱地址" 
            required 
            className="bg-white/20 text-white placeholder-white/50 border-white/30 focus-visible:ring-white/30 mb-4"
          />
          <SubmitButton 
            formAction={forgotPasswordAction}
            className="bg-white/20 hover:bg-white/30 text-white"
            pendingText="提交中..."
          >
            重置密码
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
