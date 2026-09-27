import '@gershy/clearing';

export type PagingInp<Next, V> = (last: null | any) => Promise<{ next: null | any, page: Loopable<V> }>;
export default async function*<Next, V>(inp: PagingInp<Next, V>, last: null | Next = null): AsyncGenerator<V> {
  
  // Simple paging helper
  
  while (true) {
    
    const { next, page } = await inp(last);
    
    let didYield = false;
    for await (const v of await page) { didYield = true; yield v; }
    
    if (!didYield)    break;
    if (next == null) break; // Note loose comparison intentionally interprets `undefined` as end-of-paging
    
    last = next;
    
  }
  
};
