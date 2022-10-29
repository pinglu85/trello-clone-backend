import type { Orderable } from '../types';

function findOrderableIndex(
  sortedOrderables: Orderable[],
  targetRank: string
): number {
  let left = 0;
  let right = sortedOrderables.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midItemRank = sortedOrderables[mid].rank;

    if (midItemRank === targetRank) return mid;

    if (midItemRank > targetRank) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

export default findOrderableIndex;
