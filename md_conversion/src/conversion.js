const writeFile = (htmlCode) => {
  Deno.writeTextFileSync("./index.html", htmlCode);
  return;
};

const generateHtmlStructure = (documentName, bodyContent) => {
  const htmlCode = `<!DOCTYPE html>
<html>
  <head>
    <title>${documentName}</title>
  </head>
  <body>
  ${bodyContent}
  </body>
</html>
`;
  return writeFile(htmlCode);
};

const toHtmlElement = (tag, content, bodyElement) => {
  bodyElement.push(`<${tag}>${content}</${tag}>`);

  return bodyElement;
};

const extractTag = (symbol) => {
  const tags = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5",
    "######": "h6",
    "": "p",
  };

  return tags[symbol];
};

const isSymbolIncludes = (line) => {
  return line.startsWith("#");
};

const parseMarkdownLine = (rawData) => {
  const bodyElement = [];

  rawData.forEach((line) => {
    let [symbol, ...data] = line.split(" ");
    let content = data.join("");

    if (!isSymbolIncludes(line)) {
      symbol = "";
      content = line;
    }

    toHtmlElement(extractTag(symbol), content, bodyElement);
  });

  return generateHtmlStructure("README.md", bodyElement.join("\n"));
};

const readFile = (path) => {
  const content = Deno.readTextFileSync(path);

  return content;
};

const main = (filePath) => {
  const content = readFile(filePath).split("\n\n");
  content.push(content.pop().slice(0, -1));

  return parseMarkdownLine(content);
};

main("./README.md");
