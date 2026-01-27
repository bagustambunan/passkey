import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Tabs from "../../../shared/components/Tabs";

export default function LoginPage() {
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
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <Button>
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
                  />
                  <Button>
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
