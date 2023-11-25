
export type loggedUserProrps = {
  error: boolean, 
  data?: 
    { 
      token?: string, 
      userId?: string, 
      message?: string
    }
}


export type mumurInputProps = {
  type: string,
  token: string,
  skip?:number
}

export type murmursListProps = {
  id?: number,
  text?: string,
  creator?: string,
  like_count?: number,
  name?: string

}

export type murmursLikeProps = {
  id?: number,
  name?: string,
  post_id?: string,
  user_id?: string,
}

export type murmursDetaislProps = {
  murmurDetails?: murmursListProps,
  liked?: murmursLikeProps[]
};

export type murmursResProps = {
  error?: boolean,
  data?: murmursListProps,
}

export type userProps = {
  name?: string,
  follow_count?: number,
  followed_count?: number,
  id?: number
}

export type usersResProps = {
  error?: boolean,
  data?: userProps,
}


export type userDetailsPorps = {
  user?: userProps,
  murmurs?: murmursListProps[]
}