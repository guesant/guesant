import { generateReadme } from './generate-readme.ts';

await generateReadme(process.env['PROFILE_YAML_FILE']);
