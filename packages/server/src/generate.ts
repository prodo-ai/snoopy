import {searchCodebase} from "@prodo/snoopy-search";

const flat = <T>(arrayOfArrays: T[][]): T[] =>
  ([] as T[]).concat(...arrayOfArrays);

export const generateComponentsFileContents = async (
  clientDir: string,
): Promise<string> => {
  const imports = await searchCodebase(clientDir, process.cwd());

  const importLines = flat(
    imports.componentFiles
      .concat(imports.themeFiles)
      .map(({filepath, fileExports}) =>
        fileExports.map(({name, isDefaultExport}) => {
          const importName = isDefaultExport ? name : `{ ${name} }`;
          return `import ${importName} from "${filepath}";`;
        }),
      ),
  ).join("\n");

  const componentsArrayString = imports.componentFiles
    .map(({fileExports}) =>
      fileExports
        .map(({name}) => `{name: "${name}", component: ${name}}`)
        .join(","),
    )
    .join(",\n  ");

  const themesArrayString = imports.themeFiles
    .map(({fileExports}) =>
      fileExports
        .map(({name}) => `{name: "${name}", theme: ${name}}`)
        .join(","),
    )
    .join(",\n  ");

  return `
${importLines}

export const components = [
  ${componentsArrayString}
];

export const themes = [
  ${themesArrayString}
];
`.trimLeft();
};
