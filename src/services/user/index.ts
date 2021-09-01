import axios from "axios";
import { RequireAtLeastOne } from "../../utils";

async function get() {
  const { data } = await axios.get("/profile");
  return data;
}

async function update(
  arg: RequireAtLeastOne<{
    email?: string;
    password?: string;
    name?: string;
  }>
) {
  const { data } = await axios.patch("/profile", arg);
  return data;
}

const User = {
  get,
  update,
};

export default User;
