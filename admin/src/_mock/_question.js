import _mock from './_mock';
import { randomInArray } from './funcs';

export const _questionList = [...Array(24)].map((_, index) => ({
    id: _mock.id(index),
    question: _mock.question(index),
    name: _mock.name.fullName(index), 
    solution: _mock.solution(index),
    status: randomInArray(['visible', 'hidden']),
}));

export const _solutionList = [...Array(24)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.name.fullName(index),
    upvote:_mock.upvote(index),
    downvote:_mock.downvote(index),
    comment:_mock.comment(index),
    status: randomInArray(['visible', 'hidden']),
}));

