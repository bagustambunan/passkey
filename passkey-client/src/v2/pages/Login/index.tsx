import { useEffect, useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import { useAsync } from "../../../shared/hooks/useAsync";
import { login } from "../../../shared/utils/service";
import useAuth from "../../hooks/useAuth";
import Tabs from "../../../shared/components/Tabs";

export default function LoginPage() {
  const { triggerGetUser } = useAuth();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const loginAsync = useAsync(login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (username: string, password: string) => {
    loginAsync.execute(username, password);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleLogin(form.username, form.password);
  };

  useEffect(() => {
    if (loginAsync.value?.message === "Login successful") {
      triggerGetUser();
    }
  }, [loginAsync.value]);

  return (
    <div className="container">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: 300,
        }}
      >
        <Tabs
          key="login"
          tabItems={[
            {
              key: "with-password",
              label: "With Password",
              content: (
                <>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <Button onClick={handleSubmit} loading={loginAsync.isPending}>
                    Login
                  </Button>
                </>
              ),
            },
            {
              key: "with-passkey",
              label: "With Passkey",
              content: (
                <>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                  />
                  <Button onClick={handleSubmit} loading={loginAsync.isPending}>
                    Login with Passkey
                  </Button>
                </>
              ),
            },
          ]}
        />
      </form>
    </div>
  );
}
