import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { z } from "zod";

import { roleHomePath, ROUTES } from "../../app/routes";
import { useAuth } from "../../auth/AuthContext";
import { getApiErrorMessage } from "../../lib/api";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError("");
    try {
      const user = await login(values);
      const requested = (location.state as { from?: string } | null)?.from;
      if (requested) {
        navigate(requested, { replace: true });
      } else {
        navigate(roleHomePath(user.role), { replace: true });
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  });

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <span className="eyebrow">CHÀO MỪNG TRỞ LẠI</span>
        <h1>Đăng nhập</h1>
        <p className="muted">Đăng nhập để quản lý lịch khám và hồ sơ của bạn.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form className="form-stack" onSubmit={onSubmit}>
          <label>
            <span>Email</span>
            <input className="input" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <small className="field-error">{errors.email.message}</small>}
          </label>
          <label>
            <span>Mật khẩu</span>
            <input className="input" type="password" autoComplete="current-password" {...register("password")} />
            {errors.password && <small className="field-error">{errors.password.message}</small>}
          </label>
          <button className="button button-primary button-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <p className="auth-switch">Chưa có tài khoản? <Link to={ROUTES.register}>Đăng ký bệnh nhân</Link></p>
      </div>
    </section>
  );
};
