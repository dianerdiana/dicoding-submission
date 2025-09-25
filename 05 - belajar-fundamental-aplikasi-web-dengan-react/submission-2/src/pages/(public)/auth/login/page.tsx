import type { FormEventHandler } from "react";
import useInput from "../../../../utils/hooks/useInput";
import { login, putAccessToken } from "../../../../services/note.service";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ email, password });

      if (response.error) {
        return toast.error("Login Failed!");
      }

      toast.success("Login Success!");
      putAccessToken(response.data.accessToken);
      navigate("/app");
    } catch (error) {
      console.error(error);
      toast.error("Error: Login failed!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <section className="w-full max-w-xl px-10 py-12 space-y-4 shadow bg-secondary rounded-2xl dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-center text-primary dark:text-gray-100">
          Login
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap mb-4">
            <label
              htmlFor="email"
              className="w-full mb-2 text-primary dark:text-gray-100"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              className="w-full px-2 py-2 border rounded-sm outline-none text-primary border-primary focus:ring focus:ring-blue-300 dark:text-gray-100 dark:border-secondary"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div className="flex flex-wrap mb-4">
            <label
              htmlFor="password"
              className="w-full mb-2 text-primary dark:text-gray-100"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="w-full px-2 py-2 border rounded-sm outline-none text-primary dark:text-gray-100 dark:border-secondary border-primary focus:ring focus:ring-blue-300"
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white rounded-sm outline-none cursor-pointer bg-primary hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-primary"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
