import { projectsData } from '../src/data/projects.js';
import fs from 'fs';

const targets = ['cwc-office', 'truwest-office', 'masud-dental-lab', 'daycare-early-learning-surrey', 'ascent-medical-dental-centre'];
for (const p of projectsData) {
  if (targets.includes(p.slug)) {
    console.log(p.slug, ':', p.image, 'exists:', fs.existsSync('public' + p.image));
  }
}
