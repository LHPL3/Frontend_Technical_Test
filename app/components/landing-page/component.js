import { action } from '@ember/object';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import podNames from 'ember-component-css/pod-names';

export default class LandingPage extends Component {
  styleNamespace = podNames['landing-page'];

  /**
   * Once there are added movies this tracked property will contain an array of
   * objects with a `data` method and `ref` property.
   *
   * The ref can be used with the firestore method `updateDoc` to update the record:
   *
   *   await updateDoc(movie.ref, { title: 'Updated Title' });
   *
   * The ref can also be used with the firestore method `deleteDoc` to delete the record:
   *
   *   await deleteDoc(movie.ref);
   *
   */
  @tracked movies;

  @action async loadMovies(event) {
    const db = getFirestore();
    const moviesRef = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesRef);
    const movies = [];

    moviesSnapshot.forEach((doc) => movies.push(doc));

    this.movies = movies;
  }

  @action async sortMovies(event) {
    const db = getFirestore();
    const moviesRef = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesRef);
    const movies = [];
    moviesSnapshot.forEach((doc) => movies.push(doc));

    this.movies = movies;

    if (event.srcElement.innerText === 'Descending') {
      this.movies.sort((a, b) => b.data().rating - a.data().rating);
    } else {
      this.movies.sort((a, b) => a.data().rating - b.data().rating);
    }
  }

  constructor(owner, args) {
    super(owner, args);

    this.loadMovies();
  }
}
