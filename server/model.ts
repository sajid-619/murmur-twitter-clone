import { RowDataPacket } from "mysql2"

export interface IMurmursProps extends RowDataPacket {
  id?: number,
  text?: string,
  creator?: string,
  like_count?: number
};

export interface ILikeProps extends RowDataPacket {
  id?: number,
};

export interface IFullLikeProps extends ILikeProps {
  userId?: number,
  post_id?: number,
  name?: string,
};

export interface IUserProps extends RowDataPacket {
  id?: number,
  name?: string,
  email?: string,
  password?: string
};

export interface IFollowProps extends RowDataPacket {
  id?: number,
  followed_by?: string,
  followed_to?: string
};