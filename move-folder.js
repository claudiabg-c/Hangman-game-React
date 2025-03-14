const fs = require('fs-extra');

fs.move('build', 'docs', { overwrite: true })
  .then(() => console.log('Carpeta movida correctamente'))
  .catch(err => console.error('Error moviendo la carpeta:', err));
