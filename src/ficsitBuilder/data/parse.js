import parseDocs from "satisfactory-docs-parser";
import fs from "fs";

const file = fs.readFileSync("./src/ficsitBuilder/data/Docs.json");
const data = parseDocs(file);

fs.writeFileSync("./src/ficsitBuilder/data/parsedData.json", JSON.stringify(data))