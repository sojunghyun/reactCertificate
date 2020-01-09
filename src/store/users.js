// // 액션 타입 정의
// const ID = 'login/id';
// const EMAIL = 'login/email';

// // 액션 생성 함수 정의
// export const id = () => ({type: ID});
// export const email = () => ({type: EMAIL});

// // 초기 상태 정의
// const initalState = {
//     user: 0
// };

// // 리듀서 작성
// export default function Login(state=initalState, action) {
//     switch(action.type) {
//         case ID:
//             return {
//                 ...state,
//                 user: state.user + 1,
//             } ;
//         case PW:
//             return {
//                 ...state,
//                 user: state.user - 1,
//             } ;
//         default:
//             return state ;
//     }
// }