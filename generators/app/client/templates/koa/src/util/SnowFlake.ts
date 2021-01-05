const FlakeId = require('flake-idgen')
const Intformat = require('biguint-format')
const flakeIdGen = new FlakeId({ datacenter: 0, worker: 0 });

export default {
  flakeIdGen: flakeIdGen,
  next(): string {
    return Intformat(flakeIdGen.next(), 'dec')
  }
}
