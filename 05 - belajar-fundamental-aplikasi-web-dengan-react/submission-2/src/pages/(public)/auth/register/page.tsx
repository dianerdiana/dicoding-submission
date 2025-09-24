import type { FormEventHandler } from "react";
import useInput from "../../../../hooks/useInput";
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
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <section className="bg-secondary rounded-2xl shadow w-full max-w-xl px-10 py-12 space-y-4">
        <h1 className="text-4xl font-bold text-primary text-center">
          Register
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap mb-4">
            <label htmlFor="name" className="w-full text-primary mb-2">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="outline-none px-2 py-2 text-primary border border-primary rounded-sm w-full focus:ring focus:ring-blue-300"
              value={name}
              onChange={onChangeName}
              required
            />
          </div>
          <div className="flex flex-wrap mb-4">
            <label htmlFor="email" className="w-full text-primary mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@mail.com"
              className="outline-none px-2 py-2 text-primary border border-primary rounded-sm w-full focus:ring focus:ring-blue-300"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div className="flex flex-wrap mb-4">
            <label htmlFor="password" className="w-full text-primary mb-2">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className="outline-none px-2 py-2 text-primary border border-primary rounded-sm w-full focus:ring focus:ring-blue-300"
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 outline-none bg-primary w-full text-white rounded-sm cursor-pointer mt-4 hover:bg-blue-900"
          >
            Register
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;
