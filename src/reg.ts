let user = "";
let pw = "";
let host = "";

function GetUrl(path: string) {
  if(host == "") {
    throw new Error("Need to login");
  }

  return `http://${user}:${pw}@${host}/${path}`;
}

export const LoginAsync = async (username: string, password: string, server: string) => {
  user = username;
  pw = password;
  host = server;

  var result = await fetch(GetUrl("v2"));
  if(!result.ok) {
    throw new Error("Faild to login");
  }
}

export const ListImagesAsync = async(): Promise<string[]> => {
  const result = await fetch(GetUrl("v2/_catalog"));

  if(!result.ok) {
    throw new Error("Faild to get image catalog");
  }

  const body = await result.json();
  return body["repositories"];
}

export const GetAllTagsAsync = async(name: string): Promise<string[]> => {
  const url = GetUrl(`v2/${name}/tags/list`);
  const result = await fetch(url);

  if(!result.ok) {
    throw new Error();
  }

  const body = await result.json();

  // Return empty array if tags is null
  return body["tags"] ? body["tags"] : [];
}

// export const GetTagDigest = async(name: string, tag: string) => {
//   const url = GetUrl(`v2/${name}/manifests/${tag}`);
//   console.log(url);
//   const result = await fetch(url, {
//     // method: "HEAD",
//     headers: {
//       "Acept": "application/vnd.docker.distribution.manifest.v2+json"
//     }
//   });

//   if(!result.ok) {
//     throw new Error();
//   }

//   console.log(result);
// }
