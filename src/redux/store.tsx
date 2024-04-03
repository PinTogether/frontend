import { configureStore } from "@reduxjs/toolkit";
import counter from "./counterSlice";
import location from "./locationSlice";
import pinEdit from "./pinEditSlice";
import globalAlert from "./globalAlertSlice";
import myProfile from "./profileSlice";
import pinSelectPageState from "./pinSelectPageSlice";
import draftCollectionEdit from "./draftCollectionEditSlice";

const store = configureStore({
  reducer: {
    counter,
    location,
    myProfile,
    pinEdit,
    globalAlert,
    pinSelectPageState,
    draftCollectionEdit,
  }, // 리듀서를 등록
  // middleware: [ReduxThunk, logger], // 사용할 미들웨어들을 나열
  devTools: true, // 기본은 true로 설정되어있다. 개발자 도구의 사용 여부를 정한다.

  // preloadedState : {
  //   loading: {
  // 	loadingState: true,
  // 	loadingTest: "123 Loading!",
  //   }
  // }, // 리덕스 스토어가 생성될 때, 초기값을 정의한다.
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
