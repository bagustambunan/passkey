import { useState } from "react";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import useAuth from "../../hooks/useAuth";

export default function HomePage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { handleLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleLogin(form.username, form.password);
  };

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
        <Button onClick={handleSubmit}>Login</Button>
      </form>
    </div>
  );
}
