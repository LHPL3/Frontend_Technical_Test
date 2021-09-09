import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import podNames from 'ember-component-css/pod-names';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

export default class AddMovieForm extends Component {
  styleNamespace = podNames['add-movie-form'];

  @tracked description;

  @tracked title;

  @tracked errorMessage;

  @action async addMovie(event) {
    event.preventDefault();

    this.errorMessage = undefined;

    try {
      const { description, title } = this;
      const db = getFirestore();

      await addDoc(collection(db, 'movies'), { description, title });

      this.description = undefined;
      this.title = undefined;

      this.args.loadMovies();
    } catch (error) {
      this.errorMessage = error?.message;
    }
  }
}
