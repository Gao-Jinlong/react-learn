import { exec } from "child_process";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

const madgeCommand = `madge --image graph.png --ts-config ${projectRoot}/tsconfig.json --extensions tsx,ts,jsx,js ${projectRoot}/src`;

exec(madgeCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行 madge 命令时发生错误: ${error.message}`);
    return;
  }

  console.log(stderr);

  console.log(stdout);
});
