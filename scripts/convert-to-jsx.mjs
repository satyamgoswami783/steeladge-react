import fs from "fs/promises";
import path from "path";
import ts from "typescript";

const srcDir = path.resolve("src");

async function* getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function convert() {
  console.log("Starting conversion to .jsx and .js...");

  // 1. Move globals.css if exists
  try {
    const oldCss = path.join(srcDir, "app", "globals.css");
    const newCss = path.join(srcDir, "index.css");
    const cssContent = await fs.readFile(oldCss, "utf8");
    await fs.writeFile(newCss, cssContent, "utf8");
    console.log("Copied globals.css to src/index.css");
  } catch (err) {
    console.log("globals.css note:", err.message);
  }

  // 2. Process all files in src
  const allFiles = [];
  for await (const file of getFiles(srcDir)) {
    // Skip src/app since it's Next.js legacy
    if (file.includes(path.sep + "src" + path.sep + "app" + path.sep)) continue;
    allFiles.push(file);
  }

  for (const file of allFiles) {
    if (file.endsWith(".tsx")) {
      const code = await fs.readFile(file, "utf8");
      const transpiled = ts.transpileModule(code, {
        compilerOptions: {
          jsx: ts.JsxEmit.Preserve,
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
        },
      }).outputText;

      const newPath = file.replace(/\.tsx$/, ".jsx");
      await fs.writeFile(newPath, transpiled, "utf8");
      await fs.unlink(file);
      console.log(`Converted .tsx -> .jsx: ${path.relative(srcDir, newPath)}`);
    } else if (file.endsWith(".ts") && !file.endsWith(".d.ts")) {
      const code = await fs.readFile(file, "utf8");
      const transpiled = ts.transpileModule(code, {
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
        },
      }).outputText;

      const newPath = file.replace(/\.ts$/, ".js");
      await fs.writeFile(newPath, transpiled, "utf8");
      await fs.unlink(file);
      console.log(`Converted .ts -> .js: ${path.relative(srcDir, newPath)}`);
    }
  }

  console.log("Conversion completed successfully!");
}

convert().catch(console.error);
