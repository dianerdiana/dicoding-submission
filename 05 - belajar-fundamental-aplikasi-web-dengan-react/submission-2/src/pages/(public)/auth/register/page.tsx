import type { FormEventHandler } from "react";
import useInput from "../../../../utils/hooks/useInput";
import { register } from "../../../../services/note.service";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    try {
      const response = await register({ name, email, password });

      if (response.error) {
        return toast.error("Registration Failed!");
      }

      toast.success("Success! please login with registered account");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error: Registration failed!");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <section className="w-full max-w-xl px-10 py-12 space-y-4 shadow bg-secondary rounded-2xl dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-center text-primary dark:text-gray-100">
          Register
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap mb-4">
            <label
              htmlFor="name"
              className="w-full mb-2 text-primary dark:text-gray-100"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full px-2 py-2 border rounded-sm outline-none text-primary dark:text-gray-100 border-primary dark:border-gray-100 focus:ring focus:ring-blue-300"
              value={name}
              onChange={onChangeName}
              required
            />
          </div>
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
              className="w-full px-2 py-2 border rounded-sm outline-none text-primary dark:text-gray-100 border-primary dark:border-gray-100 focus:ring focus:ring-blue-300"
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
              className="w-full px-2 py-2 border rounded-sm outline-none text-primary dark:text-gray-100 border-primary dark:border-gray-100 focus:ring focus:ring-blue-300"
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white rounded-sm outline-none cursor-pointer bg-primary hover:bg-blue-900 dark:bg-blue-800 dark:hover:bg-primary"
          >
            Register
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
