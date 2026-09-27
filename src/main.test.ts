import { assertEqual, testRunner } from '../build/utils.test.ts';
import paging from './main.ts';
import { entry } from '@gershy/entry';
import '@gershy/clearing';

const codec = { type: 'rec', props: {
  reg:    { type: 'str', map: (str: string) => new RegExp(str) },
  effort: { type: 'enum', opts: [ 0, 1, 2, 3, 4, 5, 6 ] }
}} as const;
entry({ name: 'test', codec, inp: { reg: '^', effort: 0 }, fn: async (logger, { reg, effort, ...inp }) => {
  
  // Type testing
  (async () => {
    
    type Enforce<Provided, Expected extends Provided> = { provided: Provided, expected: Expected };
    
    type Tests = {
      1: Enforce<{ x: 'y' }, { x: 'y' }>,
    };
    if (0) ((v?: Tests) => void 0)();
    
  })();
  
  await testRunner({ logger, reg, effort, inp, cases: [
    
    { name: 'basic', fn: async logger => {
      
      const vals = await paging(async last => {
        
        return {
          page: last.slice(0, 2),
          next: last.slice(2)
        };
        
      }, [ 1, 2, 3, 4, 5 ])[cl.toArr](v => v);
      
      assertEqual(vals, [ 1, 2, 3, 4, 5 ]);
      
    }}
  
  ]});
  
}});