import fs from 'fs';
import path from 'path';

const extractClassesFromJSON = (dir) => {
  let classes = [];
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      classes = classes.concat(extractClassesFromJSON(filePath));
    } else if (file.endsWith('.json')) {
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const jsonClasses = JSON.stringify(jsonData).match(/"class":\s*"([^"]+)"/g);
      if (jsonClasses) {
        jsonClasses.forEach(match => {
          const classList = match.match(/"([^"]+)"$/)[1].split(' ');
          classes = classes.concat(classList);
        });
      }
    }
  });

  // Remove duplicates
  classes = [...new Set(classes)];

  return classes;
};

const classes = extractClassesFromJSON('./public/ODAS');
fs.writeFileSync('./uno-safelist.json', JSON.stringify(classes, null, 2));
console.log('Classes extracted:', classes);