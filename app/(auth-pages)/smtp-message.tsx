import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  return (
    <div className="bg-white/10 backdrop-blur-sm px-5 py-3 border border-white/20 rounded-xl flex gap-4 mt-4">
      <InfoIcon size={16} className="mt-0.5 text-white/80" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-white/80">
          <strong className="text-white">注意：</strong> 邮件发送有频率限制。启用自定义SMTP可提高发送限制。
        </small>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-white/60 hover:text-white flex items-center text-sm gap-1"
          >
            了解更多 <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
