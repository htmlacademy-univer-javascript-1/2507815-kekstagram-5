import { getData } from './api.js';
import { renderPhotos } from './picture.js';
import './form-validation.js';
import './photo.js';
import { debounce } from './util.js';
import { setFilterClick, renderSortedPhotos } from './functions.js';

const RERENDER_DELAY = 500;
getData((loadedPictures) => {
  renderPhotos(loadedPictures);
  setFilterClick(debounce(() => renderSortedPhotos(loadedPictures), RERENDER_DELAY));
});