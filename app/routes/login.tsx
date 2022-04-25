import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { createUserSession, getUserId } from "~/session.server";
import { verifyLogin } from "~/models/user.server";
import { validateEmail } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");
  const action = formData.get("action");

  switch (action) {
    case "demo": {
      console.log(formData);
      const user = await verifyLogin("demo@demo.com", "password123");
      if (!user) throw new Error("demo login failed");
      return createUserSession({
        request,
        userId: user.id,
        remember: remember === "on" ? true : false,
        redirectTo: typeof redirectTo === "string" ? redirectTo : "/media/all",
      });
    }
    case "login":
      if (!validateEmail(email)) {
        return json<ActionData>(
          { errors: { email: "Email is invalid" } },
          { status: 400 }
        );
      }

      if (typeof password !== "string") {
        return json<ActionData>(
          { errors: { password: "Password is required" } },
          { status: 400 }
        );
      }

      if (password.length < 8) {
        return json<ActionData>(
          { errors: { password: "Password is too short" } },
          { status: 400 }
        );
      }

      const user = await verifyLogin(email, password);

      if (!user) {
        return json<ActionData>(
          { errors: { email: "Invalid email or password" } },
          { status: 400 }
        );
      }

      return createUserSession({
        request,
        userId: user.id,
        remember: remember === "on" ? true : false,
        redirectTo: typeof redirectTo === "string" ? redirectTo : "/media/all",
      });

    default:
      break;
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/media/all";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [isEmailFocus, setIsEmailFocus] = React.useState<boolean>(false);
  const [isPasswordFocus, setIsPasswordFocus] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-blue-dark px-4">
      <img src="../assets/logo.svg" alt="logo" className="mb-12 h-12 w-12" />

      <div className="mx-auto w-full max-w-md rounded-2xl bg-blue-semi p-10 text-white">
        <h1 className="py-4 text-4xl">Login</h1>
        <Form method="post" className="space-y-6 text-white">
          <div>
            <div
              className={`mt-1 flex border-b-[1px] border-blue-grayish ${
                isEmailFocus ? "border-white" : ""
              } `}
            >
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                onFocus={() => setIsEmailFocus(true)}
                onBlur={() => setIsEmailFocus(false)}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full border-b-gray-500 bg-blue-semi px-2 py-[10px] text-lg outline-none focus:placeholder-blue-semi"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <div
              className={`mt-1 flex border-b-[1px] border-blue-grayish ${
                isPasswordFocus ? "border-white" : ""
              } `}
            >
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                placeholder="Password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full border-b-gray-500 bg-blue-semi px-2 py-[10px] text-lg outline-none focus:placeholder-blue-semi"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            name="action"
            value="login"
            className="w-full rounded bg-red  py-2 px-4 text-white hover:bg-white hover:text-black focus:bg-white focus:text-black"
          >
            Log in to your account
          </button>

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="border-gray-30 h-4 w-4 rounded default:ring-2 focus:ring-red"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-white">
              Don't have an account?{" "}
              <Link
                className="text-red underline"
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
        <Form className="mt-4" method="post">
          {" "}
          <button
            type="submit"
            name="action"
            value="demo"
            className="w-full rounded bg-blue-grayish  py-2 px-4 text-white hover:bg-white hover:text-black focus:bg-white focus:text-black"
          >
            Demo Login{" "}
          </button>
        </Form>
      </div>
    </div>
  );
}
