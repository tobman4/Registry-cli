import { read } from "npm:read";

import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

import { LoginAsync } from "./reg.ts";
import { ListCommand } from "./commands.ts";

function GetPW() {
  return read({
    prompt: "Password: ",
    silent: true
  });
}

const root = new Command()
  .name("Hello")
  .globalOption("-s, --server <host>", "Server and port for registry server. Eg 127.0.0.1:5000")
  .globalOption("-u, --user <username>", "")
  .globalAction(async(args: any) => {
    const pw = await GetPW();
    await LoginAsync(args.user,pw,args.server)
  })
  .command("ls", ListCommand);

await root.parse(Deno.args);
