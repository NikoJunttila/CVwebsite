import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workouts } from '../workouts';
import { GymService } from '../gym.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fullworkout-useradded',
  templateUrl: './fullworkout-useradded.component.html',
  styleUrls: ['./fullworkout-useradded.component.css'],
})
export class FullworkoutUseraddedComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private gymService: GymService,
    private location: Location,
    private messageService: MessageService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router

  ) {
    this.user = null as any;
  }
  private subscription!: Subscription;
  private subscription2!: Subscription;
  workout: any | undefined;
  editMode: boolean = false;
  emailLower: string = '';
  user: Observable<any>;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.gymService
      .getWorkoutFromFirestore('workoutsPersonal', `${id}`)
      .subscribe((data) => {
        this.workout = data;
      });
    this.subscription2 = this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.emailLower = user.email?.toLowerCase() as string;
        this.user = this.firestore
          .collection('users')
          .doc(this.emailLower)
          .valueChanges();
      }
    });
  }
  deleteWorkout(){
    if (this.emailLower !== this.workout.madeBy){
      return
    }
    if (confirm("Are you sure you want to delete this workout?") == true){
      console.log("accepted")
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.gymService.deleteWorkout(id,this.emailLower)
    }else{
      console.log("cancelled")
    }
  }
  toggleEdit() {
    if (this.emailLower == this.workout!.madeBy) this.editMode = !this.editMode;
    else this.messageService.add('not made by you', 'error');
  }
  saveWorkout() {
    this.gymService.addWorkoutForNormies(this.workout, this.emailLower);
    this.messageService.add('updated workout', 'success');
    this.editMode = !this.editMode;
  }
  setWorkout(workoutNew: any, index: number) {
    localStorage.setItem('workout2', JSON.stringify(workoutNew));
    localStorage.setItem('initWorkout2', JSON.stringify(workoutNew));
    sessionStorage.removeItem('myDate2');
    localStorage.removeItem('updateThis');
    if (this.emailLower == this.workout!.madeBy) {
      const updateWorkout = {
        email: this.workout!.madeBy,
        id: this.workout!.id,
        index: index,
      };
      localStorage.setItem('updateThis', JSON.stringify(updateWorkout));
    }
  }
  goBack(): void {
    this.location.back();
  }
  copyWorkout() {
    const randomNum: number = Math.floor(
      Math.random() * (99999 - 11111) + 11111
    );
    this.workout.madeBy = this.emailLower;
    this.workout.id = randomNum;
    const custom = '(custom)';
    this.workout.name = this.workout.name.concat(' ', custom);
    this.gymService.addWorkoutForNormies(this.workout, this.emailLower);
    this.router.navigate([`/gym/personal/${randomNum}`]);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription2.unsubscribe();
    }
  }
}
