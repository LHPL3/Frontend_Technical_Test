import { action } from '@ember/object';
import {
  collection,
  getFirestore,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import podNames from 'ember-component-css/pod-names';

export default class MovieListItem extends Component {
  styleNamespace = podNames['movie-list/movie-list-item'];

  @tracked movies;

  @action
  async deleteMovie(event) {
    try {
      const db = getFirestore();
      const moviesRef = collection(db, 'movies');
      const moviesSnapshot = await getDocs(moviesRef);
      const movies = [];

      moviesSnapshot.forEach((doc) => movies.push(doc));

      this.movies = movies;

      movies.forEach(async (movie) => {
        if (
          movie._document.data.value.mapValue.fields.title.stringValue ===
          this.movie.title
        ) {
          await deleteDoc(movie.ref);
          window.location.reload(true);
        }
      });
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  get movie() {
    return this.args.movie.data();
  }
}
