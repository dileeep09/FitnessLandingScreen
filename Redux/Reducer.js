import { act } from 'react-test-renderer';
import types from './Constants'
const initialState={
    getIntroVisible:false,
    getIsLogin:false,
    getUserData:[],
    getCompletedExercise:[],
    getDayWiseExercise:[],
    getAdCount:0,
    getExerciseCount:0
}
const Reducer=(state=initialState,action)=>{
    switch(action.type){
        case types.Intro_Visible:
            return {...state,getIntroVisible:action.payload};
        case types.IsLogin:
            return {...state,getIsLogin:action.payload}    
        case types.userData:
            return {...state,getUserData:action.payload}    
        case types.Completed_exer:
                return {...state,getCompletedExercise:action.payload}    
        case types.DayWiseExercise:
            return{...state,getDayWiseExercise:action.payload}   
        case types.AdCount:
            return {...state,getAdCount:action.payload}      
        case types.ExerciseCount:
            return {...state,getExerciseCount:action.payload}      
        default:return state
    }  

}
export default Reducer;