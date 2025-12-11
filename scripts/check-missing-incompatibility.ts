import { animals } from '../lib/animals';

const missing = animals.filter(a => !a.incompatibility || a.incompatibility.length === 0);
console.log('Missing incompatibility (' + missing.length + '):');
missing.forEach(a => console.log('  -', a.id, '(' + a.name + ')'));
