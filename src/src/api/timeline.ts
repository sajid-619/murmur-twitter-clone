import axios from "axios";

import { 
  mumurInputProps,
} from '../model'

export const mumurlist = async (props: mumurInputProps) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/${props.type}/?skip=${props.skip}`;
    const res = await axios.get(url, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${props.token}`
      }
    });
    return { error : false, data: res.data.data }
  } catch (error) {
    return { error: true, data: []  }
  }
}

export const likmurmurs = async (murmurId?: number, token?: string) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/like/${murmurId}`;
    const res = await axios.post(url, {data: ""}, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return { error : false, data: res.data.message }
  } catch (error) {
    return { error: true, data: ''  }
  }
}

export const murmurDetails = async (murmurId?: string, token?: string) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/details/${murmurId}`;
    const res = await axios.get(url, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    return { error : false, data: res.data.data }
  } catch (error) {
    return { error: true, data: null  }
  }
}

export const deleteMurmur = async (murmurId?: number, token?: string) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/${murmurId}`;
    const res = await axios.delete(url, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return { error : false, data: res.data.message }
  } catch (error) {
    return { error: true, message: 'Something went Wrong'  }
  }
}

export const createMurmurs = async (text?: string, token?: string) => {
  try {
    const url = `${process.env.REACT_APP_MURMURS_BASE_URL}/`;
    const data = {text}
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return { error : false }
  } catch (error) {
    return { error: true  }
  }
}
