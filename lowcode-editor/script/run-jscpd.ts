import { exec } from "child_process";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");
const threshold = 5; // 设置重复率阈值，例如 5%

const jscpdCommand = `npx jscpd ${projectRoot} --ignore "**/*.test.ts,**/*.spec.ts,**/node_modules/**" --threshold ${threshold}`;

exec(jscpdCommand, (error, stdout, stderr) => {
  console.log(stdout);

  if (error) {
    console.error(`执行错误: ${error}`);
    process.exit(1);
  }

  if (stderr) {
    console.error(`标准错误: ${stderr}`);
  }
});
