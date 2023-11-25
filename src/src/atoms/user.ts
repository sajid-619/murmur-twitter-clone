import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const userState = atom({
    key:"mumuur-user",
    default:"",
    effects_UNSTABLE: [persistAtom],
})


export const loggedInState = atom({
    key:"loggedInstate",
    default:false,
    effects_UNSTABLE: [persistAtom],
})

export const userDetailState = atom({
    key:"userDetailState",
    default:{},
    effects_UNSTABLE: [persistAtom],
}); 