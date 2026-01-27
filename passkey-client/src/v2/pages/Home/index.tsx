import Button from "../../../shared/components/Button";

export default function HomePage() {
  return (
    <div className="container">
      <span>Hi, </span>
      <Button>Register Passkey</Button>
      <Button>
        Logout
      </Button>
    </div>
  );
}
