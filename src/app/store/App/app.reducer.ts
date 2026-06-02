import { createReducer, on } from "@ngrx/store"
import * as appActions from './app.actions'

export interface AppState {
  toggleAddUserForm:boolean
  toggleAddTaskForm:boolean
  toggleEditTaskForm:boolean
}

const initState= {
  toggleAddUserForm:false,
  toggleAddTaskForm:false,
  toggleEditTaskForm:false,
}

export const appReducer = createReducer(initState,
  on(appActions.toggleAddUserForm,(state:AppState)=>{
    return{
      ...state,
      toggleAddUserForm:!state.toggleAddUserForm
    }
  }),
  on(appActions.toggleAddTaskForm,(state:AppState)=>{
    return{
      ...state,
      toggleAddTaskForm:!state.toggleAddTaskForm
    }
  }),
  on(appActions.toggleEditTaskForm,(state:AppState)=>{
    return{
      ...state,
      toggleEditTaskForm:!state.toggleEditTaskForm
    }
  }),

)
