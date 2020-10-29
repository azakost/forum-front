import Post from "./routes/post.svelte";
import Posts from "./routes/posts.svelte";
import Login from "./routes/login.svelte";
import Profile from "./routes/profile.svelte";
import Register from "./routes/register.svelte";
import Knowlege from "./routes/knowlege.svelte";
import Edit from "./routes/edit.svelte";
export const routes = new Map();

routes.set("/", Posts);
routes.set("/login", Login);
routes.set("/profile", Profile);
routes.set("/register", Register);
routes.set("/posts/:id", Post);
routes.set("/edit/:id", Edit);
routes.set("/knowlege", Knowlege);
