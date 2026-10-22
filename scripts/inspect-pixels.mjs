import sharp from 'sharp';

async function check(name, path) {
  const { data, info } = await sharp(path).resize(100, 60, { fit: 'cover' }).raw().toBuffer({ resolveWithObject: true });
  const mid = (Math.floor(info.height / 2) * info.width + Math.floor(info.width / 2)) * 3;
  console.log(name, 'center pixel RGB:', data[mid], data[mid+1], data[mid+2]);
}

check('cwc', 'public/images/projects/cwc-office.jpg');
check('truwest', 'public/images/projects/truwest-office.jpg');
check('masud', 'public/images/projects/masud-lab.jpg');
check('daycare', 'public/images/sectors/daycare-showcase.jpg');
check('medical', 'public/images/sectors/medical-clinic-showcase.jpg');
