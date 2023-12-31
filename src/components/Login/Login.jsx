import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("user@test.com");
  const [password, SetPassword] = useState("123456");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };
  //   console.log(user);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center px-4 mb-40 mt-10">
      <div className="flex flex-col justify-between border border-slate-200 shadow-md p-8 rounded-md w-1/3">
        <h1 className="mb-4 font-bold">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="Email">Email</label>
          <input
            className="p-1 border border-blue-400 rounded-md mb-4"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            className="p-1 border border-blue-400 rounded-md mb-4"
            type="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
        <button className="bg-blue-600 text-white rounded-md py-1">
          Login
        </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
