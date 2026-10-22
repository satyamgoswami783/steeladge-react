const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Footer.jsx', 'utf8');

c = c.replace(/<Link href="\/services\/restaurant-construction\/" className="(.*?)">([\s\S]*?)<\/Link>/g, 
  `<button onClick={() => setActiveService({ title: 'Restaurant & Hospitality', desc: 'Specialized build-outs including commercial kitchens, dining areas, and full ventilation systems.' })} className="$1 w-full text-left">$2</button>`);

c = c.replace(/<Link href="\/services\/franchise-construction\/" className="(.*?)">([\s\S]*?)<\/Link>/g, 
  `<button onClick={() => setActiveService({ title: 'Franchise Builds', desc: 'Turnkey construction strictly adhering to franchise brand guidelines and corporate standards.' })} className="$1 w-full text-left">$2</button>`);

c = c.replace(/<Link href="\/services\/tenant-improvements\/" className="(.*?)">([\s\S]*?)<\/Link>/g, 
  `<button onClick={() => setActiveService({ title: 'Tenant Improvements', desc: 'Custom interior fit-outs converting empty commercial shells into fully functional workspaces.' })} className="$1 w-full text-left">$2</button>`);

c = c.replace(/<Link href="\/services\/commercial-construction\/" className="(.*?)">([\s\S]*?)<\/Link>/g, 
  `<button onClick={() => setActiveService({ title: 'Turnkey Contracting', desc: 'End-to-end general contracting covering everything from design and permits to final handover.' })} className="$1 w-full text-left">$2</button>`);

fs.writeFileSync('src/components/layout/Footer.jsx', c);
console.log('done');
