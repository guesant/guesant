import { generateReadme } from './generate-readme.ts';

const revisions = await generateReadme({
  lobbyDirectory: process.env['PROFILE_LOBBY_DIR'],
  resumeDirectory: process.env['PROFILE_RESUME_DIR'],
});

console.log('Profile sources:', revisions);
