"use client";

import { useEffect, useState } from "react";
import { AdminLoginForm } from "./AdminLoginForm";
import { FirstTimeSetupForm } from "./FirstTimeSetupForm";

export function AdminAuthWrapper() {
  const [hasUsers, setHasUsers] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/bootstrap-status")
      .then((r) => r.json())
      .then((data) => setHasUsers(data.hasUsers))
      .catch(() => setHasUsers(true));
  }, []);

  if (hasUsers === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="text-center text-slate-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      {hasUsers ? <AdminLoginForm /> : <FirstTimeSetupForm />}
    </div>
  );
}
