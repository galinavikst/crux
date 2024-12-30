import fs from "node:fs/promises";

const validPasswordsCount = async () => {
  try {
    const file = await fs.readFile("passwords.txt", { encoding: "utf8" });

    const lines = file
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const validPasswordsCount = lines.reduce((acc, el) => {
      const [rules, password] = el.split(": ");
      const [symbol, minMax] = rules.split(" ");
      const [min, max] = minMax.split("-");
      const passArr = password.split("");
      const symbolCount = passArr.filter((s) => s === symbol).length;

      return acc + (min <= symbolCount && max >= symbolCount ? 1 : 0);
    }, 0);

    console.log(lines, validPasswordsCount);
    return validPasswordsCount;
  } catch (error) {
    console.log("error reading file / incorrect line structure", error);
  }
};

validPasswordsCount();
