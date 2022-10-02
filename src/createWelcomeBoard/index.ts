import BoardModel from '../models/BoardModel';
import createLists from './createLists';
import createCardsInList from './createCardsInList';
import type { Card } from '../models/CardModel';

async function createWelcomeBoard(): Promise<void> {
  try {
    const board = await BoardModel.insert('blue', null, 'Welcome Board');
    const lists = await createLists(board.id);
    const createCardsPromises: Promise<Card>[] = [];

    for (const list of lists) {
      const createCardsInListPromises = createCardsInList(
        board.id,
        list.id,
        list.name
      );
      createCardsPromises.push(...createCardsInListPromises);
    }

    await Promise.all(createCardsPromises);
  } catch (error) {
    console.error(error);
  }
}

export default createWelcomeBoard;
