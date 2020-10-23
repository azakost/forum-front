import Posts from "./routes/posts.svelte";
import Login from "./routes/login.svelte";
import Profile from "./routes/profile.svelte";
import Register from "./routes/register.svelte";

export const routes = new Map();

routes.set("/", Posts);
routes.set("/login", Login);
routes.set("/profile", Profile);
routes.set("/register", Register);
