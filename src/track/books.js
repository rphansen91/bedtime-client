import { event } from './ga';

const BOOK = 'BOOK';
const SELECT = 'SELECT';
const FREE = 'FREE';
const AMAZON = 'AMAZON';
const READ = 'READ';

export const selectFreeBook = () => {
    event(BOOK,SELECT,FREE);
}

export const selectAmazonBook = () => {
    event(BOOK,SELECT,AMAZON);
}

export const readBook = (percent) => {
    event(BOOK,READ,percent);
}