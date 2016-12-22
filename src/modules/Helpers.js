import moment from 'moment';

function compareImdb(a, b) {
  if (a.imdb_score < b.imdb_score) {
    return -1;
  }
  if (a.imdb_score > b.imdb_score) {
    return 1;
  }
  return 0;
}

function compareTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

function compareDate(a, b) {
  if (a.title_year < b.title_year) {
    return -1;
  }
  if (a.title_year > b.title_year) {
    return 1;
  }
  return 0;
}

function formatDate(d) {
  return (moment(d).format('MMMM Do YYYY'));
}

function formatRunTime(t) {
  const d = Number(t);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);
  return (
    (h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s
  );
}

export { compareImdb, compareTitle, compareDate, formatDate, formatRunTime };
