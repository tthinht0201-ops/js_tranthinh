import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

import { ROUTES } from "../../app/routes";
import { useAuth } from "../../auth/AuthContext";
import { getApiErrorMessage } from "../../lib/api";

const schema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().trim().min(9, "Số điện thoại không hợp lệ").max(20),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự").max(72),
});

type FormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
  const { register: registerPatient } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", phone: "", dateOfBirth: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError("");
    try {
      await registerPatient({
        ...values,
        ...(values.dateOfBirth ? { dateOfBirth: values.dateOfBirth } : {}),
      });
      navigate(ROUTES.home, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  });

  return (
    <section className="auth-layout">
      <div className="auth-card auth-card-wide">
        <span className="eyebrow">TÀI KHOẢN BỆNH NHÂN</span>
        <h1>Đăng ký</h1>
        <p className="muted">Tạo tài khoản để đặt lịch và theo dõi lịch khám.</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form className="form-grid" onSubmit={onSubmit}>
          <label className="field-span-2">
            <span>Họ và tên</span>
            <input className="input" {...register("fullName")} />
            {errors.fullName && <small className="field-error">{errors.fullName.message}</small>}
          </label>
          <label>
            <span>Số điện thoại</span>
            <input className="input" {...register("phone")} />
            {errors.phone && <small className="field-error">{errors.phone.message}</small>}
          </label>
          <label>
            <span>Ngày sinh</span>
            <input className="input" type="date" {...register("dateOfBirth")} />
          </label>
          <label className="field-span-2">
            <span>Email</span>
            <input className="input" type="email" {...register("email")} />
            {errors.email && <small className="field-error">{errors.email.message}</small>}
          </label>
          <label className="field-span-2">
            <span>Mật khẩu</span>
            <input className="input" type="password" {...register("password")} />
            {errors.password && <small className="field-error">{errors.password.message}</small>}
          </label>
          <button className="button button-primary field-span-2" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>
        </form>
        <p className="auth-switch">Đã có tài khoản? <Link to={ROUTES.login}>Đăng nhập</Link></p>
      </div>
    </section>
  );
};
