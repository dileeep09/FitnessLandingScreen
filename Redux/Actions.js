import types from './Constants';
export const setIntroVisible = data => ({
  type: types.Intro_Visible,
  payload: data,
});
export const setIsLogin = data => ({
  type: types.IsLogin,
  payload: data,
});
export const setUserData = data => ({
  type: types.userData,
  payload: data,
});
export const setCompletedExer = data => ({
  type: types.Completed_exer,
  payload: data,
});
export const setDayWiseExerise = data => ({
  type: types.DayWiseExercise,
  payload: data,
});
export const setAdCount = data => ({
  type: types.AdCount,
  payload: data,
});
export const setExerciseCount = (data )=>({
  type: types.ExerciseCount,
  payload: data,
})
